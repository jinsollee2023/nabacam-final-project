import type { DatePickerProps } from "antd";
import { Checkbox, DatePicker, Select, Slider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { Project } from "src/Types";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useUserStore } from "src/zustand/useUserStore";
import useClientsQueries from "src/hooks/useClientsQueries";

interface AddProjectModal {
  project?: Project;
}

const AddProjectModal = ({ project }: AddProjectModal) => {
  // 이후 유효성 검사 추가할 때 사용 예정
  // const {
  //   register,
  //   formState,
  //   handleSubmit,
  //   setError,
  //   getValues,
  //   getFieldState,
  //   trigger,
  // } = useForm({
  //   mode: "onBlur",
  //   defaultValues: {},
  //   resolver: undefined,
  //   context: undefined,
  //   criteriaMode: "firstError",
  //   shouldFocusError: true,
  //   shouldUseNativeValidation: false,
  // });
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
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
  const [deadLine, setDeadLine] = useState(project ? project.deadLine : null);
  const [qualification, setQualification] = useState(
    project ? project.qualification : 0
  );

  const categoryOnChange = (value: string) => {
    setCategory(value);
  };

  const dateOnChange: DatePickerProps["onChange"] = (date) => {
    setDeadLine(date!.toDate());
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
    const selectedMember = client?.members?.find(
      (member) => member.name === value
    );
    setManager(selectedMember!);
  };

  const { changeNewProject } = useProjectStore();
  const newProject: Project = {
    title,
    desc,
    clientId: userId,
    manager,
    deadLine: deadLine!,
    pay: {
      min: paySlideOff ? "상의 후 결정" : minPay,
      max: paySlideOff ? "상의 후 결정" : maxPay,
    },
    status: "진행 전",
    category,
    qualification,
  };

  useEffect(() => {
    changeNewProject(newProject);
  }, [title, desc, deadLine, minPay, maxPay, category, manager, qualification]);

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
        <Select
          placeholder="Select a person"
          style={{ width: 120 }}
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
        />
        <S.ModalContentsLabel htmlFor="projectDesc">
          프로젝트 설명
        </S.ModalContentsLabel>
        <S.ModalDescTextarea
          id="projectDesc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </S.ModalMainInfoBox>
      <S.ModalSubInfoBox>
        <S.ModalContentsLabel htmlFor="projectManager">
          담당자
        </S.ModalContentsLabel>
        <Select
          id="projectManager"
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={managerOnChange}
          value={manager.name}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          // 이후 기업 마이페이지 구현 후 수정 예정
          options={client?.members?.map((member) => ({
            value: member.name,
            label: `${member.name} | ${member.team}`,
          }))}
          style={{ marginBottom: "10px" }}
        />
        <S.ModalContentsLabel htmlFor="projectDeadLine">
          목표 기간
        </S.ModalContentsLabel>
        <DatePicker
          id="projectDeadLine"
          onChange={dateOnChange}
          style={{ marginBottom: "20px" }}
          defaultValue={deadLine ? dayjs(deadLine) : undefined}
        />
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
