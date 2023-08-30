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
  const { changeNewExperience } = useResumeExperienceStore();

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
        <S.Label>
          근무분야
          <br />
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
        </S.Label>
        <br />
        <br />
        <S.Label>
          근무형태
          <br />
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
        </S.Label>

        <br />
        <br />
        <S.Label>
          근무지
          <br />
          <S.Input
            type="text"
            value={pastWorkPlace}
            onChange={(e) => onChangePastWorkPlaceHandler(e.target.value)}
            placeholder="입력해주세요."
          />
        </S.Label>
        <br />
        <S.Label>
          직책
          <br />
          <S.Input
            type="text"
            value={pastWorkPosition}
            onChange={(e) => onChangePastWorkPositionHandler(e.target.value)}
            placeholder="입력해주세요."
          />
        </S.Label>
        <br />
        <S.Label>
          근무 일자
          <p style={{ fontSize: "15px", marginTop: "10px" }}>
            입사일을 선택해주세요.
          </p>
          <DatePicker
            selected={pastWorkStartDate}
            onChange={onChangePastWorkStartDateHandler}
            dateFormat="yyyy-MM-dd"
          />
          <br />
          <p style={{ fontSize: "15px" }}>퇴사일을 선택해주세요.</p>
          <DatePicker
            selected={pastWorkEndDate}
            onChange={onChangePastWorkEndDateHandler}
            dateFormat="yyyy-MM-dd"
          />
        </S.Label>
      </form>
    </>
  );
};

export default AddResumeExperienceModal;

const S = {
  Input: styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 28px;
  `,
  Label: styled.label`
    font-size: 32px;
  `,
};
