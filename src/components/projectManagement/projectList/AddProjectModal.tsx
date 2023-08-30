import type { DatePickerProps } from "antd";
import { Checkbox, DatePicker, Select, Slider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { Project } from "src/Types";
import dayjs from "dayjs";
import { useUserStore } from "src/zustand/useUserStore";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useNavigate } from "react-router-dom";

interface AddProjectModal {
  project?: Project;
}

const AddProjectModal = ({ project }: AddProjectModal) => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const [title, setTitle] = useState(project ? project.title : "");
  const [category, setCategory] = useState(project ? project.category : "");
  const [desc, setDesc] = useState(project ? project.desc : "");
  const [manager, setManager] = useState(
    project
      ? project.manager
      : { name: "", team: "", contact: { email: "", phone: "" } }
  );
  const [paySlideOff, setPaySlideOff] = useState(false);
  const [minPay, setMinPay] = useState(project ? project.pay.min : 0);
  const [maxPay, setMaxPay] = useState(project ? project.pay.max : 0);
  const [deadLine, setDeadLine] = useState(project ? project.date.endDate : "");
  const [qualification, setQualification] = useState(
    project ? project.qualification : 0
  );

  const navigate = useNavigate();
  const categoryOnChange = (value: string) => {
    setCategory(value);
  };

  const dateOnChange: DatePickerProps["onChange"] = (dateString) => {
    setDeadLine(dateString?.toISOString().split("T")[0] as string);
  };

  const CheckBoxOnChange = (e: CheckboxChangeEvent) => {
    setPaySlideOff(e.target.checked);
  };

  const minPayOnChange = (value: number) => {
    setMinPay(value);
  };

  const maxPayOnChange = (value: number) => {
    setMaxPay(value);
  };

  const managerOnChange = (value: string) => {
    if (value === client!.name) {
      setManager({
        name: client!.name,
        team: "",
        contact: { email: client!.contact.email, phone: client!.contact.phone },
      });
    } else if (value === "goToAddMember") {
      const isConfirmed = window.confirm(
        "페이지를 이동하시면 이전에 작성된 정보는 저장되지 않습니다. \n멤버 등록 페이지로 이동하시겠습니까?"
      );

      isConfirmed && navigate("/my-page");
    } else {
      const selectedMember = client?.members?.find(
        (member) => member.name === value
      );
      setManager(selectedMember!);
    }
  };

  const { changeNewProject } = useProjectStore();
  const newProject: Project = {
    title,
    desc,
    clientId: userId,
    manager,
    date: { startDate: "", endDate: deadLine },
    pay: {
      min: paySlideOff ? "상의 후 결정" : minPay,
      max: paySlideOff ? "상의 후 결정" : maxPay,
    },
    status: "진행 전",
    category,
    qualification,
  };

  console.log(newProject);

  useEffect(() => {
    changeNewProject(newProject);
  }, [
    title,
    desc,
    deadLine,
    minPay,
    maxPay,
    category,
    manager,
    qualification,
    paySlideOff,
  ]);

  return (
    <div>
      <S.ModalTitle>어떤 프로젝트를 게시하시나요?</S.ModalTitle>
      <S.ModalMainInfoBox>
        <S.ModalContentsLabel htmlFor="projectTitle">
          프로젝트 이름
        </S.ModalContentsLabel>
        <S.ModalTitleInput
          id="projectTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.ModalContentsLabel htmlFor="projectDesc">
          프로젝트 설명
        </S.ModalContentsLabel>
        <S.ModalDescTextarea
          id="projectDesc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <S.ModalContentsLabel htmlFor="projectQualification">
          모집조건
        </S.ModalContentsLabel>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ width: "50%" }}>
            분야
            <br />
            <Select
              placeholder="Select a person"
              value={category}
              onChange={categoryOnChange}
              options={[
                { value: "개발", label: "개발" },
                { value: "디자인", label: "디자인" },
                { value: "마케팅", label: "마케팅" },
                { value: "운영", label: "운영" },
                { value: "기획", label: "기획" },
                { value: "기타", label: "기타" },
              ]}
              style={{
                width: "97%",
                marginRight: "3%",
                border: `1.5px solid var(--main-blue)`,
                borderRadius: "8px",
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            경력
            <br />
            <S.ModalTitleInput
              id="projectQualification"
              value={qualification}
              onChange={(e) => setQualification(Number(e.target.value))}
              style={{
                width: "97%",
                marginLeft: "3%",
                border: `1.5px solid var(--main-blue)`,
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      </S.ModalMainInfoBox>
      <S.ModalSubInfoBox>
        <div style={{ width: "50%" }}>
          <S.ModalContentsLabel htmlFor="projectDeadLine">
            목표 기간
          </S.ModalContentsLabel>
          <br />
          <DatePicker
            id="projectDeadLine"
            onChange={dateOnChange}
            style={{
              marginBottom: "20px",
              width: "97%",
              marginRight: "3%",
              border: `1.5px solid var(--main-blue)`,
              borderRadius: "4px",
            }}
            defaultValue={deadLine ? dayjs(deadLine) : undefined}
          />
        </div>
        <div style={{ width: "50%" }}>
          <S.ModalContentsLabel htmlFor="projectManager">
            담당자
          </S.ModalContentsLabel>
          <br />
          <Select
            id="projectManager"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={managerOnChange}
            value={manager.name}
            filterOption={(input, option) =>
              (String(option?.label) ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={
              client?.members?.length! > 0
                ? client?.members?.map((member) => ({
                    value: member.name,
                    label: `${member.name} | ${member.team}`,
                  }))
                : [
                    {
                      value: "disabled",
                      label: "등록된 멤버가 없습니다.",
                      disabled: true,
                    },
                    {
                      value: "goToAddMember",
                      label: "멤버 등록하기",
                    },
                    {
                      value: client?.name,
                      label: "기업 계정으로 설정하기",
                    },
                  ]
            }
            style={{
              marginBottom: "20px",
              width: "97%",
              marginLeft: "3%",
              border: `1.5px solid var(--main-blue)`,
              borderRadius: "8px",
            }}
          />
        </div>
      </S.ModalSubInfoBox>

      <S.ModalContentsLabel htmlFor="payBox">급여</S.ModalContentsLabel>
      <S.ModalPayInfoBox id="payBox">
        <S.ModalPayBox>
          <S.ModalContentsLabel>
            최소 {paySlideOff ? null : `${minPay}만원`}
          </S.ModalContentsLabel>
          <Slider
            min={100}
            max={1000}
            defaultValue={Number(minPay)}
            disabled={paySlideOff}
            onChange={minPayOnChange}
            tooltip={{ formatter: null }}
          />
        </S.ModalPayBox>
        <S.ModalPayBox>
          <S.ModalContentsLabel>
            최대 {paySlideOff ? null : `${maxPay}만원`}
          </S.ModalContentsLabel>
          <Slider
            min={100}
            max={1000}
            defaultValue={Number(maxPay)}
            disabled={paySlideOff}
            onChange={maxPayOnChange}
            tooltip={{ formatter: null }}
          />
        </S.ModalPayBox>
        <Checkbox
          onChange={CheckBoxOnChange}
          style={{
            width: "25%",
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          상의 후 결정
        </Checkbox>
      </S.ModalPayInfoBox>
    </div>
  );
};

export default AddProjectModal;
