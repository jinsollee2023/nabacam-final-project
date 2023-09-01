import {
  DatePicker,
  DatePickerProps,
  Modal,
  Select,
  SelectProps,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import type { ResumeExperience } from "../../../../Types";
import { useResumeExperienceStore } from "../../../../zustand/useResumeExperienceStore";
import dayjs from "dayjs";
import { S } from "./Resume.styles";

const AddResumeExperienceModal = () => {
  const [pastWorkPlace, setPastWorkPlace] = useState("");
  const [pastWorkPosition, setPastWorkPosition] = useState("");
  const [pastWorkStartDate, setPastWorkStartDate] = useState("");
  const [pastWorkEndDate, setPastWorkEndDate] = useState("");
  const [selectedPastWorkField, setSelectedPastWorkField] = useState("전체");
  const [selectedPastEmploymentType, setSelectedPastEmploymentType] =
    useState("전체");
  const { changeNewExperience } = useResumeExperienceStore();

  const onChangePastWorkStartDateHandler: DatePickerProps["onChange"] = (
    dateString
  ) => {
    setPastWorkStartDate(dateString?.toISOString().split("T")[0] as string);
  };
  const onChangePastWorkEndDateHandler: DatePickerProps["onChange"] = (
    datestring
  ) => {
    setPastWorkEndDate(datestring?.toISOString().split("T")[0] as string);
  };
  const onChangePastWorkPlaceHandler = (value: string) => {
    setPastWorkPlace(value);
  };
  const onChangePastWorkPositionHandler = (value: string) => {
    setPastWorkPosition(value);
  };

  const experienceId = uuidv4();
  const newExperience: ResumeExperience = {
    experienceId,
    pastWorkField: selectedPastWorkField,
    pastEmploymentType: selectedPastEmploymentType,
    pastWorkDuration: {
      pastWorkEndDate: pastWorkEndDate,
      pastWorkStartDate: pastWorkStartDate,
    },
    pastWorkPlace: pastWorkPlace,
    pastWorkPosition: pastWorkPosition,
  };
  // console.log(newExperience);

  useEffect(() => {
    changeNewExperience(newExperience);
  }, [
    selectedPastWorkField,
    selectedPastEmploymentType,
    pastWorkEndDate,
    pastWorkStartDate,
    pastWorkPlace,
    pastWorkPosition,
  ]);

  return (
    <>
      <form>
        <S.Label>근무분야</S.Label>
        <Space wrap style={{ marginTop: "15px" }}>
          <Select
            defaultValue={selectedPastWorkField}
            style={{ width: 460 }}
            onChange={(value) => setSelectedPastWorkField(value)}
            options={[
              { value: "전체", label: "전체" },
              { value: "개발", label: "개발" },
              { value: "디자인", label: "디자인" },
              { value: "마케팅", label: "마케팅" },
              { value: "운영", label: "운영" },
              { value: "기획", label: "기획" },
              { value: "기타", label: "기타" },
            ]}
          />
        </Space>
        <br />
        <br />
        <S.Label>근무형태 </S.Label>
        <Space wrap style={{ marginTop: "15px" }}>
          <Select
            defaultValue={selectedPastEmploymentType}
            style={{ width: 460 }}
            onChange={(value) => setSelectedPastEmploymentType(value)}
            options={[
              { value: "전체", label: "전체" },
              { value: "정규직", label: "정규직" },
              { value: "계약직", label: "계약직" },
              { value: "프리랜서", label: "프리랜서" },
            ]}
          />
        </Space>
        <br />
        <br />
        <S.Label>근무지</S.Label>
        <S.Input
          type="text"
          value={pastWorkPlace}
          onChange={(e) => onChangePastWorkPlaceHandler(e.target.value)}
          placeholder="입력해주세요."
        />
        <br />
        <br />
        <S.Label>직책 </S.Label>
        <S.Input
          type="text"
          value={pastWorkPosition}
          onChange={(e) => onChangePastWorkPositionHandler(e.target.value)}
          placeholder="입력해주세요."
        />
        <br />
        <br />
        <S.Label>근무 일자</S.Label>
        <S.subText>입사일을 선택해주세요.</S.subText>
        <DatePicker
          onChange={onChangePastWorkStartDateHandler}
          defaultValue={
            pastWorkStartDate ? dayjs(pastWorkStartDate) : undefined
          }
          style={{ width: 460 }}
        />
        <br />
        <S.subText>퇴사일을 선택해주세요.</S.subText>
        <DatePicker
          onChange={onChangePastWorkEndDateHandler}
          defaultValue={pastWorkEndDate ? dayjs(pastWorkEndDate) : undefined}
          style={{ width: 460 }}
        />
      </form>
    </>
  );
};

export default AddResumeExperienceModal;
