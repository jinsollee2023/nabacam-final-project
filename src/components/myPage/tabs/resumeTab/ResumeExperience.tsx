import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Select, SelectProps, Space } from "antd";
import React, { useState } from "react";
import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";

interface Experience {
  pastWorkPlace: string;
  pastWorkPosition: string;
  pastWorkDuration: {
    pastWorkStartDate: string;
    pastWorkEndDate: string;
  };
}

const ResumeExperience = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pastWorkPlaceInput = useInput("");
  const pastWorkPositionInput = useInput("");
  const pastWorkStartDate = useInput("");
  const pastWorkEndDate = useInput("");

  const { userId, freelancerRole, name, photoURL } = useUserStore();
  const { deleteExperienceMutation, addExperienceMutation, experienceData } =
    useResumeExperienceQueries(userId);

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  const addExperienceHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const newData = {
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
  const deleteExperienceHandler = async (userId: string) => {
    deleteExperienceMutation.mutate(userId);
  };

  return (
    <>
      <S.WorkExperienceContainer>
        <p>경력사항</p>
        <S.WorkExperienceListWrapper>
          {experienceData &&
            experienceData[0]?.resumeExperience?.map(
              (item: Experience, index: number) => (
                <S.WorkExperienceList key={index}>
                  <div>{item.pastWorkPlace}</div>
                  <div>{item.pastWorkPosition}</div>
                  <div>
                    {item.pastWorkDuration.pastWorkStartDate}~
                    {item.pastWorkDuration.pastWorkEndDate}
                  </div>
                  <button onClick={() => deleteExperienceHandler(userId)}>
                    삭제 x
                  </button>
                </S.WorkExperienceList>
              )
            )}
        </S.WorkExperienceListWrapper>
        <S.Btn
          onClick={() => {
            setOpen(true);
          }}
        >
          + 경력 추가하기
        </S.Btn>
      </S.WorkExperienceContainer>
      {/* ------------------------------------------------------------ */}
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
                value={pastWorkPlaceInput.value}
                onChange={pastWorkPlaceInput.onChange}
              />
            </label>
            <br />
            <label>
              직책:
              <input
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
              <input
                type="text"
                value={pastWorkStartDate.value}
                onChange={pastWorkStartDate.onChange}
              />
              퇴사일:
              <input
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

export default ResumeExperience;

const S = {
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  WorkExperienceList: styled.li`
    background-color: #8080803d;
    padding: 20px;
    list-style: none;
    border-radius: 10px;
  `,

  Btn: styled.button`
    background-color: #1fc17d;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #168c68;
    }
    width: 100%;
  `,
};
