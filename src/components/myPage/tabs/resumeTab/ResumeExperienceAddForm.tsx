import { Modal, Select, SelectProps, Space } from "antd";
import React, { useState } from "react";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeExperienceAddForm: React.FC<ModalProps> = ({ open, setOpen }) => {
  const pastWorkPlaceInput = useInput("");
  const pastWorkPositionInput = useInput("");
  const pastWorkStartDate = useInput("");
  const pastWorkEndDate = useInput("");
  const [selectedWorkField, setSelectedWorkField] = useState("전체");
  const [selectedWorkType, setSelectedWorkType] = useState("전체");

  const { userId } = useUserStore();
  const { addExperienceMutation } = useResumeExperienceQueries(userId);
  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  const experienceId = uuidv4();
  const addExperienceHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const newData = {
      experienceId: experienceId,
      pastWorkField: selectedWorkField,
      pastEmploymentType: selectedWorkType,
      pastWorkDuration: {
        pastWorkEndDate: pastWorkEndDate.value,
        pastWorkStartDate: pastWorkStartDate.value,
      },
      pastWorkPlace: pastWorkPlaceInput.value,
      pastWorkPosition: pastWorkPositionInput.value,
    };

    addExperienceMutation.mutate({
      newData,
      userId,
    });

    pastWorkPlaceInput.reset();
    pastWorkPositionInput.reset();
    pastWorkStartDate.reset();
    pastWorkEndDate.reset();
    setOpen(false);
  };
  return (
    <>
      {open && (
        <Modal
          title="경력 추가하기"
          open={open}
          onOk={addExperienceHandler}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <form>
            <label>
              근무분야
              <Space wrap>
                <Select
                  defaultValue={selectedWorkField}
                  style={{ width: 120 }}
                  onChange={(value) => setSelectedWorkField(value)}
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
                  defaultValue={selectedWorkType}
                  style={{ width: 120 }}
                  onChange={(value) => setSelectedWorkType(value)}
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
                value={pastWorkPlaceInput.value}
                onChange={pastWorkPlaceInput.onChange}
              />
            </label>
            <br />
            <label>
              직책:
              <S.Input
                type="text"
                value={pastWorkPositionInput.value}
                onChange={pastWorkPositionInput.onChange}
              />
            </label>
            <br />
            <label>
              근무기간
              <br />
              입사일:
              <S.Input
                type="text"
                value={pastWorkStartDate.value}
                onChange={pastWorkStartDate.onChange}
              />
              퇴사일:
              <S.Input
                type="text"
                value={pastWorkEndDate.value}
                onChange={pastWorkEndDate.onChange}
              />
            </label>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceAddForm;

const S = {
  Input: styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `,
};
