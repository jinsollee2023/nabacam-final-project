import {
  DatePickerProps,
  Modal,
  Select,
  SelectProps,
  Space,
  DatePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import type { ResumeExperience } from "../../../../Types";
import { useResumeExperienceStore } from "../../../../zustand/useResumeExperienceStore";
import dayjs from "dayjs";

interface ExperienceProps {
  experience: ResumeExperience;
}
const EditResumeExperienceModal = ({ experience }: ExperienceProps) => {
  const { changeNewExperience } = useResumeExperienceStore();

  const [pastWorkPlace, setPastWorkPlace] = useState(
    experience ? experience.pastWorkPlace : ""
  );
  const [pastWorkPosition, setPastWorkPosition] = useState(
    experience ? experience.pastWorkPosition : ""
  );
  const [pastWorkStartDate, setPastWorkStartDate] = useState(
    experience ? experience.pastWorkDuration.pastWorkStartDate : ""
  );
  const [pastWorkEndDate, setPastWorkEndDate] = useState(
    experience ? experience.pastWorkDuration.pastWorkEndDate : ""
  );
  const [selectedPastWorkField, setSelectedPastWorkField] = useState(
    experience ? experience.pastWorkField : "전체"
  );
  const [selectedPastEmploymentType, setSelectedPastEmploymentType] = useState(
    experience ? experience.pastEmploymentType : "전체"
  );

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
        <label>
          근무분야
          <Space wrap>
            <Select
              defaultValue={selectedPastWorkField}
              style={{ width: 120 }}
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
        </label>
        <label>
          근무형태
          <Space wrap>
            <Select
              defaultValue={selectedPastEmploymentType}
              style={{ width: 120 }}
              onChange={(value) => setSelectedPastEmploymentType(value)}
              options={[
                { value: "전체", label: "전체" },
                { value: "정규직", label: "정규직" },
                { value: "계약직", label: "계약직" },
                { value: "프리랜서", label: "프리랜서" },
              ]}
            />
          </Space>
        </label>

        <br />
        <br />
        <label>
          근무지:
          <S.Input
            type="text"
            value={pastWorkPlace}
            onChange={(e) => onChangePastWorkPlaceHandler(e.target.value)}
          />
        </label>
        <br />
        <label>
          직책:
          <S.Input
            type="text"
            value={pastWorkPosition}
            onChange={(e) => onChangePastWorkPositionHandler(e.target.value)}
          />
        </label>
        <br />
        <label>
          근무기간
          <br />
          입사일:
          <DatePicker
            onChange={onChangePastWorkStartDateHandler}
            defaultValue={
              pastWorkStartDate ? dayjs(pastWorkStartDate) : undefined
            }
          />
          퇴사일:
          <DatePicker
            onChange={onChangePastWorkEndDateHandler}
            defaultValue={pastWorkEndDate ? dayjs(pastWorkEndDate) : undefined}
          />
        </label>
      </form>
    </>
  );
};

export default EditResumeExperienceModal;

const S = {
  Input: styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `,
};
