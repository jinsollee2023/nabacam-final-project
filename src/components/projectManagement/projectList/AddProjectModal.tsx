import type { DatePickerProps } from "antd";
import { Checkbox, DatePicker, Slider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useProjectStore } from "src/zustand/useProjectStore";

import { styled } from "styled-components";

const AddProjectModal = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [paySlideOff, setPaySlideOff] = useState(false);
  const [minPay, setMinPay] = useState(0);
  const [maxPay, setMaxPay] = useState(0);
  const [deadLine, setDeadLine] = useState<Date>();

  const dateOnChange: DatePickerProps["onChange"] = (date) => {
    setDeadLine(date?.toDate());
  };

  console.log(deadLine);
  const CheckBoxOnChange = (e: CheckboxChangeEvent) => {
    setPaySlideOff(e.target.checked);
  };

  const minPayOnChange = (value: number) => {
    setMinPay(value);
  };

  const maxPayOnChange = (value: number) => {
    setMaxPay(value);
  };

  const { changeNewProject } = useProjectStore();
  const newProject = {
    title,
    desc,
    clientId: "bb962329-4740-4519-ae52-d5ad68fc720c",
    deadLine: deadLine!,
    pay: {
      min: minPay,
      max: maxPay,
    },
    status: "before progress",
    volunteer: [],
  };

  useEffect(() => {
    changeNewProject(newProject);
  }, [title, desc, deadLine, minPay, maxPay]);

  return (
    <div>
      <p>어떤 프로젝트를 게시하시나요?</p>
      <S.ProjectMainInfoBox>
        <label htmlFor="projectTitle">프로젝트 이름</label>
        <input
          id="projectTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="projectDesc">프로젝트 설명</label>
        <input
          id="projectDesc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </S.ProjectMainInfoBox>
      <S.ProjectSubInfoBox>
        <label htmlFor="projectManager">담당자</label>
        <select id="projectManager"></select>
        <label htmlFor="projectDeadLine">목표 기간</label>
        <DatePicker id="projectDeadLine" onChange={dateOnChange} />
        <label htmlFor="payBox">급여</label>
        <div id="payBox">
          <label>최소 {paySlideOff ? null : `${minPay}만원`}</label>
          <Slider
            min={100}
            max={1000}
            defaultValue={minPay}
            disabled={paySlideOff}
            onChange={minPayOnChange}
            tooltip={{ formatter: null }}
          />
          <label>최대 {paySlideOff ? null : `${maxPay}만원`}</label>
          <Slider
            min={100}
            max={1000}
            defaultValue={maxPay}
            disabled={paySlideOff}
            onChange={maxPayOnChange}
            tooltip={{ formatter: null }}
          />
          <Checkbox onChange={CheckBoxOnChange}>상의 후 결정</Checkbox>
        </div>
      </S.ProjectSubInfoBox>
    </div>
  );
};

export default AddProjectModal;

const S = {
  ProjectMainInfoBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProjectSubInfoBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
