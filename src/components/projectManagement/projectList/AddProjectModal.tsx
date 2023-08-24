import type { DatePickerProps } from "antd";
import { Checkbox, DatePicker, Select, Slider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { Project } from "src/Types";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

interface AddProjectModal {
  project?: Project;
}

const AddProjectModal = ({ project }: AddProjectModal) => {
  const {
    register,
    formState,
    handleSubmit,
    setError,
    getValues,
    getFieldState,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });
  const [title, setTitle] = useState(project ? project.title : "");
  const [desc, setDesc] = useState(project ? project.desc : "");
  const [paySlideOff, setPaySlideOff] = useState(false);
  const [minPay, setMinPay] = useState(project ? project.pay.min : 0);
  const [maxPay, setMaxPay] = useState(project ? project.pay.max : 0);
  const [deadLine, setDeadLine] = useState(project ? project.deadLine : null);

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

  const selectOnChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const selectOnSearch = (value: string) => {
    console.log("search:", value);
  };

  const { changeNewProject } = useProjectStore();
  const newProject: Project = {
    title,
    desc,
    clientId: "bb962329-4740-4519-ae52-d5ad68fc720c",
    deadLine: deadLine!,
    pay: {
      min: paySlideOff ? "상의 후 결정" : minPay,
      max: paySlideOff ? "상의 후 결정" : maxPay,
    },
    status: "before progress",
  };

  useEffect(() => {
    changeNewProject(newProject);
  }, [title, desc, deadLine, minPay, maxPay]);

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
          onChange={selectOnChange}
          onSearch={selectOnSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
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
