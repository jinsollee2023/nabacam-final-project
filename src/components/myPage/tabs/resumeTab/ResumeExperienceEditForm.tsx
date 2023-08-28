import { Modal, Select, SelectProps, Space } from "antd";
import React, { MouseEvent, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import { v4 as uuidv4 } from "uuid";

interface EditModalProps {
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  experienceId: string;
}

const ResumeExperienceEditForm: React.FC<EditModalProps> = ({
  editOpen,
  setEditOpen,
  experienceId,
}) => {
  const [editedPastWorkPlaceInput, setEditedPastWorkPlaceInput] = useState("");
  const [editedPastWorkPositionInput, setEditedPastWorkPositionInput] =
    useState("");
  const [editedPastWorkStartDate, setEditedPastWorkStartDate] = useState("");
  const [editedPastWorkEndDate, setEditedPastWorkEndDate] = useState("");

  const { userId } = useUserStore();
  const { updateExperienceMutation, experienceData } =
    useResumeExperienceQueries(userId);
  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  const clickHandler = async ({
    userId,
    experienceId,
  }: {
    userId: string;
    experienceId: string;
  }) => {
    // 대상
    const updatedData = {
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
    setEditedPastWorkStartDate("");
    setEditedPastWorkEndDate("");

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
                    defaultValue="전체"
                    style={{ width: 120 }}
                    onChange={handleChange}
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
                    defaultValue="전체"
                    style={{ width: 120 }}
                    onChange={handleChange}
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
                <input
                  type="text"
                  value={editedPastWorkStartDate}
                  onChange={(e) => setEditedPastWorkStartDate(e.target.value)}
                />
                퇴사일:
                <input
                  type="text"
                  value={editedPastWorkEndDate}
                  onChange={(e) => setEditedPastWorkEndDate(e.target.value)}
                />
              </label>
            </form>
            <button onClick={() => setEditOpen(false)}>닫기</button>
            <button onClick={() => clickHandler({ userId, experienceId })}>
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
