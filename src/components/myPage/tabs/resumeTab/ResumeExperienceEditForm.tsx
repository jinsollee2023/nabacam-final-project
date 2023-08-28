import { Modal, Select, SelectProps, Space } from "antd";
import React, { MouseEvent, useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { Experience } from "./ResumeExperience";

interface EditModalProps {
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  experienceId: string;
  writtenPastWorkPlace: string;
  writtenPastWorkPosition: string;
  writtenPastWorkStartDate: string;
  writtenPastWorkEndDate: string;
  writtenPastWorkField: string;
  writtenPastEmploymentType: string;
}
const ResumeExperienceEditForm: React.FC<EditModalProps> = ({
  editOpen,
  setEditOpen,
  experienceId,
  writtenPastWorkPlace,
  writtenPastWorkPosition,
  writtenPastWorkStartDate,
  writtenPastWorkEndDate,
  writtenPastWorkField,
  writtenPastEmploymentType,
}) => {
  const [editedPastWorkPlaceInput, setEditedPastWorkPlaceInput] = useState("");
  const [editedPastWorkPositionInput, setEditedPastWorkPositionInput] =
    useState("");
  // const [editedPastWorkStartDate, setEditedPastWorkStartDate] = useState("");
  // const [editedPastWorkEndDate, setEditedPastWorkEndDate] = useState("");
  const [editedPastWorkStartDate, setEditedPastWorkStartDate] = useState(
    new Date()
  );
  const [editedPastWorkEndDate, setEditedPastWorkEndDate] = useState(
    new Date()
  );
  const [editedPastWorkField, setEditedPastWorkField] = useState("");
  const [editedPastEmploymentType, setEditedPastEmploymentType] = useState("");

  // 이전내용 띄워주기
  useEffect(() => {
    setEditedPastWorkPlaceInput(writtenPastWorkPlace);
    setEditedPastWorkPositionInput(writtenPastWorkPosition);
    // setEditedPastWorkStartDate(writtenPastWorkStartDate);
    // setEditedPastWorkEndDate(writtenPastWorkEndDate);
    setEditedPastWorkField(writtenPastWorkField);
    setEditedPastEmploymentType(writtenPastEmploymentType);
  }, [
    writtenPastWorkPlace,
    writtenPastWorkPosition,
    // writtenPastWorkStartDate,
    // writtenPastWorkEndDate,
    writtenPastWorkField,
    writtenPastEmploymentType,
  ]);

  const { userId } = useUserStore();
  const { updateExperienceMutation } = useResumeExperienceQueries(userId);

  const onChangeEditedStartDateHandler = (value: any) => {
    setEditedPastWorkStartDate(value);
  };
  const onChangeEditedEndDateHandler = (value: any) => {
    setEditedPastWorkEndDate(value);
  };

  const updateExperienceHandler = async ({
    userId,
    experienceId,
  }: {
    userId: string;
    experienceId: string;
  }) => {
    // 대상
    const updatedData = {
      pastWorkField: editedPastWorkField,
      pastEmploymentType: editedPastEmploymentType,
      pastWorkDuration: {
        pastWorkEndDate: editedPastWorkEndDate,
        pastWorkStartDate: editedPastWorkStartDate,
      },
      pastWorkPlace: editedPastWorkPlaceInput,
      pastWorkPosition: editedPastWorkPositionInput,
    };

    // 업데이트
    updateExperienceMutation.mutate({ userId, experienceId, updatedData });

    setEditedPastWorkPlaceInput("");
    setEditedPastWorkPositionInput("");
    // setEditedPastWorkStartDate("");
    // setEditedPastWorkEndDate("");
    setEditedPastWorkField("");
    setEditedPastEmploymentType("");

    setEditOpen(false);
  };

  return (
    <>
      {editOpen && (
        <S.CustomModal>
          <S.ModalContent>
            <form>
              <label>
                근무분야
                <Space wrap>
                  <Select
                    defaultValue={editedPastWorkField}
                    style={{ width: 120 }}
                    onChange={(value) => setEditedPastWorkField(value)}
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
                    defaultValue={editedPastEmploymentType}
                    style={{ width: 120 }}
                    onChange={(value) => setEditedPastEmploymentType(value)}
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
                <input
                  type="text"
                  value={editedPastWorkPlaceInput}
                  onChange={(e) => setEditedPastWorkPlaceInput(e.target.value)}
                />
              </label>
              <br />
              <label>
                직책:
                <input
                  type="text"
                  value={editedPastWorkPositionInput}
                  onChange={(e) =>
                    setEditedPastWorkPositionInput(e.target.value)
                  }
                />
              </label>
              <br />
              <label>
                근무기간
                <br />
                입사일:
                <DatePicker
                  selected={editedPastWorkStartDate}
                  onChange={onChangeEditedStartDateHandler}
                  dateFormat="yyyy-MM-dd"
                  // inline
                />
                퇴사일:
                <DatePicker
                  selected={editedPastWorkEndDate}
                  onChange={onChangeEditedEndDateHandler}
                  dateFormat="yyyy-MM-dd"
                  // inline
                />
              </label>
            </form>
            <button onClick={() => setEditOpen(false)}>닫기</button>
            <button
              onClick={() => updateExperienceHandler({ userId, experienceId })}
            >
              수정
            </button>
          </S.ModalContent>
        </S.CustomModal>
      )}
    </>
  );
};

export default ResumeExperienceEditForm;

const S = {
  CustomModal: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ModalContent: styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

    form {
      display: flex;
      flex-direction: column;
    }
    input {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      margin-top: 10px;
      padding: 10px;
      background-color: #1fc17d;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #168c68;
      }
    }
  `,
};
