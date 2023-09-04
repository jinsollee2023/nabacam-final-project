import { Checkbox, DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { useProjectStore } from "../../../zustand/useProjectStore";
import S from "./ProjectListStyles";
import dayjs from "dayjs";
import { useUserStore } from "../../../zustand/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useProjectValuesStore } from "src/zustand/useProjectValuesStore";
import useProjectValid from "src/hooks/useProjectValid";

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
  const [payInputOff, setPayInputOff] = useState(
    values.maxPay === "상의 후 결정" ? true : false
  );
  const navigate = useNavigate();

  const handleChange = (key: string, value: string | number) => {
    changeValues({ ...values, [key]: value });
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

  useEffect(() => {
    changeNewProject({
      title: values.title,
      desc: values.desc,
      clientId: userId,
      manager: values.manager,
      expectedStartDate: values.expectedStartDate,
      pay: {
        min: values.minPay,
        max: values.maxPay,
      },
      status: "진행 전",
      category: values.category,
      qualification: values.qualification as number,
    });
  }, [values, payInputOff]);

  useEffect(() => {
    payInputOff
      ? changeValues({
          ...values,
          ["minPay"]: "상의 후 결정",
          ["maxPay"]: "상의 후 결정",
        })
      : changeValues({
          ...values,
          ["minPay"]: "",
          ["maxPay"]: "",
        });
  }, [payInputOff]);

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
          className={isTitleValid === false ? "shake" : ""}
          borderColor={isTitleValid === false ? "red" : "var(--main-blue)"}
        />
        <S.ModalContentsLabel htmlFor="desc">
          프로젝트 설명
        </S.ModalContentsLabel>
        <S.ModalDescTextarea
          id="desc"
          value={values.desc}
          onChange={(e) => handleChange("desc", e.target.value)}
          borderColor={isDescValid === false ? "red" : "var(--main-blue)"}
        />
        <S.ModalContentsLabel htmlFor="qualification">
          모집조건
        </S.ModalContentsLabel>
        <S.ModalMainInfoInnerBoxWrapper>
          <S.ModalMainInfoInnerBox>
            <S.ModalSubTitle>분야</S.ModalSubTitle>
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
                border: `1px solid ${
                  isCategoryValid === true || isCategoryValid === null
                    ? "var(--main-blue)"
                    : "red"
                }`,
                borderRadius: "8px",
              }}
            />
          </S.ModalMainInfoInnerBox>
          <S.ModalMainInfoInnerBox>
            <S.ModalSubTitle>경력</S.ModalSubTitle>
            <S.ModalTitleInput
              id="qualification"
              type="number"
              value={values.qualification as number}
              onChange={(e) => handleChange("qualification", e.target.value)}
              borderColor={
                isQualificationValid === false ? "red" : "var(--main-blue)"
              }
              className={isQualificationValid === false ? "shake" : ""}
              style={{
                width: "97%",
                height: "35px",
                marginLeft: "3%",
                borderRadius: "4px",
              }}
            />
          </S.ModalMainInfoInnerBox>
        </S.ModalMainInfoInnerBoxWrapper>
      </S.ModalMainInfoBox>
      <S.ModalSubInfoBox>
        <S.ModalSubInfoInnerBox>
          <S.ModalContentsLabel htmlFor="expectedStartDate">
            시작예정일
          </S.ModalContentsLabel>
          <DatePicker
            id="expectedStartDate"
            onChange={(date) =>
              handleChange(
                "expectedStartDate",
                date?.toISOString().split("T")[0] as string
              )
            }
            style={{
              marginBottom: "20px",
              marginTop: "5px",
              width: "97%",
              marginRight: "3%",
              border: `1px solid ${
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
        </S.ModalSubInfoInnerBox>
        <S.ModalSubInfoInnerBox>
          <S.ModalContentsLabel htmlFor="projectManager">
            담당자
          </S.ModalContentsLabel>
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
              marginTop: "5px",
              width: "97%",
              marginLeft: "3%",
              border: `1px solid ${
                isManagerValid === true || isManagerValid === null
                  ? "var(--main-blue)"
                  : "red"
              }`,
              borderRadius: "8px",
            }}
          />
        </S.ModalSubInfoInnerBox>
      </S.ModalSubInfoBox>

      <S.ModalContentsLabel htmlFor="payBox">급여</S.ModalContentsLabel>
      <Checkbox
        defaultChecked={values.maxPay === "상의 후 결정" ? true : false}
        checked={payInputOff}
        onChange={(e) => setPayInputOff(e.target.checked)}
        style={{
          width: "25%",
          display: "flex",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        상의 후 결정
      </Checkbox>
      <S.ModalPayInfoBox id="payBox">
        <S.ModalPayBox>
          <S.ModalMinMaxPayBox>
            <S.ModalContentsLabel htmlFor="minPay">최소</S.ModalContentsLabel>
            <S.ModalTitleInput
              id="minPay"
              type="number"
              value={values.minPay}
              disabled={payInputOff ? true : false}
              onChange={(e) =>
                handleChange(
                  "minPay",
                  payInputOff ? "상의 후 결정" : e.target.value
                )
              }
              borderColor={isMaxPayValid === false ? "red" : "var(--main-blue)"}
              className={isMaxPayValid === false ? "shake" : ""}
            />
            <p>만원</p>
          </S.ModalMinMaxPayBox>
          <S.ModalMinMaxPayBox>
            <S.ModalContentsLabel htmlFor="maxPay">최대</S.ModalContentsLabel>
            <S.ModalTitleInput
              id="maxPay"
              type="number"
              value={values.maxPay}
              disabled={payInputOff ? true : false}
              onChange={(e) =>
                handleChange(
                  "maxPay",
                  payInputOff ? "상의 후 결정" : e.target.value
                )
              }
              borderColor={isMaxPayValid === false ? "red" : "var(--main-blue)"}
              className={isMaxPayValid === false ? "shake" : ""}
            />
            <p>만원</p>
          </S.ModalMinMaxPayBox>
        </S.ModalPayBox>
      </S.ModalPayInfoBox>
      <p>
        {isMaxPayValid === false
          ? "최대 급여는 최소 급여보다 높아야합니다."
          : null}
      </p>
    </div>
  );
};

export default AddProjectModal;
