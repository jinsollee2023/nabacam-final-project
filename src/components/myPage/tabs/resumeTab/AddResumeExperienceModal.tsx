import { Modal, Select, SelectProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import type { ResumeExperience } from "src/Types";
import { useResumeExperienceStore } from "src/zustand/useResumeExperienceStore";

const AddResumeExperienceModal = () => {
  const [pastWorkPlace, setPastWorkPlace] = useState("");
  const [pastWorkPosition, setPastWorkPosition] = useState("");
  const [pastWorkStartDate, setPastWorkStartDate] = useState(new Date());
  const [pastWorkEndDate, setPastWorkEndDate] = useState(new Date());
  const [selectedPastWorkField, setSelectedPastWorkField] = useState("전체");
  const [selectedPastEmploymentType, setSelectedPastEmploymentType] =
    useState("전체");

  const onChangePastWorkStartDateHandler = (value: any) => {
    setPastWorkStartDate(value);
  };
  const onChangePastWorkEndDateHandler = (value: any) => {
    setPastWorkEndDate(value);
  };
  const onChangePastWorkPlaceHandler = (value: string) => {
    setPastWorkPlace(value);
  };
  const onChangePastWorkPositionHandler = (value: string) => {
    setPastWorkPosition(value);
  };

  const { changeNewExperience } = useResumeExperienceStore();
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
            selected={pastWorkStartDate}
            onChange={onChangePastWorkStartDateHandler}
            dateFormat="yyyy-MM-dd"
          />
          퇴사일:
          <DatePicker
            selected={pastWorkEndDate}
            onChange={onChangePastWorkEndDateHandler}
            dateFormat="yyyy-MM-dd"
          />
        </label>
      </form>
    </>
  );
};

export default AddResumeExperienceModal;

const S = {
  Input: styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `,
};
