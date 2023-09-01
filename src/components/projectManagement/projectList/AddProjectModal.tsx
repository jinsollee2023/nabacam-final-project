import { Checkbox, DatePicker, Select, Slider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useProjectStore } from "../../../zustand/useProjectStore";
import S from "./ProjectListStyles";
import { Project } from "../../../Types";
import dayjs from "dayjs";
import { useUserStore } from "../../../zustand/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useProjectValuesStore } from "src/zustand/useProjectValuesStore";

interface AddProjectModal {
  isTitleValid?: boolean | null;
  isDescValid?: boolean | null;
  isCategoryValid?: boolean | null;
  isQualificationValid?: boolean | null;
  isDeadLineValid?: boolean | null;
  isManagerValid?: boolean | null;
  isMaxPayValid?: boolean | null;
}

const AddProjectModal = ({
  isTitleValid,
  isDescValid,
  isCategoryValid,
  isQualificationValid,
  isDeadLineValid,
  isManagerValid,
  isMaxPayValid,
}: AddProjectModal) => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });

  const { values, changeValues } = useProjectValuesStore();
  const [paySlideOff, setPaySlideOff] = useState(false);
  const navigate = useNavigate();
  const handleChange = (key: string, value: string | number) => {
    changeValues({ ...values, [key]: value });
  };
  // console.log(
  //   "모달",
  //   values,
  //   isTitleValid,
  //   isDescValid,
  //   isCategoryValid,
  //   isQualificationValid,
  //   isDeadLineValid,
  //   isManagerValid,
  //   isMaxPayValid
  // );
  const CheckBoxOnChange = (e: CheckboxChangeEvent) => {
    setPaySlideOff(e.target.checked);
  };
  const managerOnChange = (value: string) => {
    if (value === client!.name) {
      changeValues({
        ...values,
        ["manager"]: {
          name: client!.name,
          team: "",
          contact: {
            email: client!.contact.email,
            phone: client!.contact.phone,
          },
        },
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
      changeValues({
        ...values,
        manager: {
          name: selectedMember?.name as string,
          team: selectedMember?.team as string,
          contact: {
            email: selectedMember?.contact.email as string,
            phone: selectedMember?.contact.phone as string,
          },
        },
      });
    }
  };

  const { changeNewProject } = useProjectStore();
  const newProject: Project = {
    title: values.title,
    desc: values.desc,
    clientId: userId,
    manager: values.manager,
    expectedStartDate: values.expectedStartDate,
    pay: {
      min: paySlideOff ? "상의 후 결정" : values.minPay,
      max: paySlideOff ? "상의 후 결정" : values.maxPay,
    },
    status: "진행 전",
    category: values.category,
    qualification: values.qualification as number,
  };

  useEffect(() => {
    changeNewProject(newProject);
  }, [values, paySlideOff]);

  console.log();
  return (
    <div>
      <S.ModalTitle>어떤 프로젝트를 게시하시나요?</S.ModalTitle>
      <S.ModalMainInfoBox>
        <S.ModalContentsLabel htmlFor="title">
          프로젝트 이름
        </S.ModalContentsLabel>
        <S.ModalTitleInput
          id="title"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          border={`1.5px solid ${
            isTitleValid === true || isTitleValid === null
              ? "var(--main-blue)"
              : "red"
          }`}
        />
        <S.ModalContentsLabel htmlFor="desc">
          프로젝트 설명
        </S.ModalContentsLabel>
        <S.ModalDescTextarea
          id="desc"
          value={values.desc}
          onChange={(e) => handleChange("desc", e.target.value)}
          border={`1.5px solid ${
            isDescValid === true || isDescValid === null
              ? "var(--main-blue)"
              : "red"
          }`}
        />
        <S.ModalContentsLabel htmlFor="qualification">
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
              id="category"
              value={values.category}
              onChange={(selectedValue) =>
                handleChange("category", selectedValue)
              }
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
                border: `1.5px solid ${
                  isCategoryValid === true || isCategoryValid === null
                    ? "var(--main-blue)"
                    : "red"
                }`,
                borderRadius: "8px",
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            경력
            <br />
            <S.ModalTitleInput
              id="qualification"
              type="number"
              value={values.qualification as number}
              onChange={(e) => handleChange("qualification", e.target.value)}
              border={`1.5px solid ${
                isQualificationValid === true || isQualificationValid === null
                  ? "var(--main-blue)"
                  : "red"
              }`}
              style={{
                width: "97%",
                marginLeft: "3%",
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
            onChange={(date) =>
              handleChange(
                "deadLine",
                date?.toISOString().split("T")[0] as string
              )
            }
            style={{
              marginBottom: "20px",
              width: "97%",
              marginRight: "3%",
              border: `1.5px solid ${
                isDeadLineValid === true || isDeadLineValid === null
                  ? "var(--main-blue)"
                  : "red"
              }`,
              borderRadius: "4px",
            }}
            defaultValue={
              values.expectedStartDate
                ? dayjs(values.expectedStartDate)
                : undefined
            }
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
            value={values.manager.name}
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
              border: `1.5px solid ${
                isManagerValid === true || isManagerValid === null
                  ? "var(--main-blue)"
                  : "red"
              }`,
              borderRadius: "8px",
            }}
          />
        </div>
      </S.ModalSubInfoBox>

      <S.ModalContentsLabel htmlFor="payBox">급여</S.ModalContentsLabel>
      <S.ModalPayInfoBox id="payBox">
        <S.ModalPayBox>
          <S.ModalContentsLabel>
            최소 {paySlideOff ? null : `${values.minPay}만원`}
          </S.ModalContentsLabel>
          <Slider
            id="minPay"
            min={100}
            max={1000}
            defaultValue={Number(values.minPay)}
            disabled={paySlideOff}
            onChange={(value) => handleChange("minPay", value)}
            tooltip={{ formatter: null }}
          />
        </S.ModalPayBox>
        <S.ModalPayBox>
          <S.ModalContentsLabel>
            최대 {paySlideOff ? null : `${values.maxPay}만원`}
          </S.ModalContentsLabel>
          <Slider
            id="maxPay"
            min={100}
            max={1000}
            railStyle={{
              backgroundColor: "black", // 레일 부분의 색상 설정
            }}
            handleStyle={{
              borderColor: "red",
              height: 14, // 높이 조정
              width: 14, // 너비 조정
            }}
            defaultValue={Number(values.maxPay)}
            disabled={paySlideOff}
            onChange={(value) => handleChange("maxPay", value)}
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
