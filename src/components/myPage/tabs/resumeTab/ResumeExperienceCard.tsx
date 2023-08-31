import React, { useState } from "react";
import Modal from "../../../../components/modal/Modal";
import useResumeExperienceQueries from "../../../../hooks/useResumeExperienceQueries";
import { useUserStore } from "../../../../zustand/useUserStore";
import type { ResumeExperience } from "../../../../Types";
import { styled } from "styled-components";
import { useResumeExperienceStore } from "../../../../zustand/useResumeExperienceStore";
import EditResumeExperienceModal from "./EditResumeExperienceModal";

interface ExperienceProps {
  experience: ResumeExperience;
}
const ResumeExperienceCard = ({ experience }: ExperienceProps) => {
  const { user } = useUserStore();
  const userId = user.userId;
  const experienceId = experience.experienceId;
  const { newExperience } = useResumeExperienceStore();
  const { deleteExperienceMutation, updateExperienceMutation } =
    useResumeExperienceQueries({
      userId,
      experienceId,
    });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // 삭제버튼
  const deleteExperienceHandler = () => {
    deleteExperienceMutation.mutate({ userId, experienceId });
  };

  // 수정버튼
  const updateExperienceHandler = () => {
    updateExperienceMutation.mutate({
      userId,
      experienceId,
      newExperience,
    });
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      {isUpdateModalOpen && (
        <Modal
          setIsModalOpen={setIsUpdateModalOpen}
          buttons={
            <>
              <S.Btn onClick={updateExperienceHandler}>등록</S.Btn>
            </>
          }
        >
          <EditResumeExperienceModal experience={experience} />
        </Modal>
      )}

      {/* 실제로 보여지는 부분 */}

      <S.WorkExperienceList>
        <S.TextArea>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <S.PastWorkField>{experience.pastWorkField}</S.PastWorkField>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <S.PastWorkDetail>
              {experience.pastWorkPlace}/{experience.pastEmploymentType}/
              {experience.pastWorkPosition}
            </S.PastWorkDetail>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <S.PastWorkDuration>
              {
                new Date(experience.pastWorkDuration.pastWorkStartDate)
                  .toISOString()
                  .split("T")[0]
              }
              ~
              {
                new Date(experience.pastWorkDuration.pastWorkEndDate)
                  .toISOString()
                  .split("T")[0]
              }
            </S.PastWorkDuration>
          </div>
        </S.TextArea>
        <S.BtnBox>
          <S.Btn onClick={() => setIsUpdateModalOpen(true)}>수정</S.Btn>
          <S.Btn marginleft="10px" onClick={deleteExperienceHandler}>
            삭제
          </S.Btn>
        </S.BtnBox>
      </S.WorkExperienceList>
    </>
  );
};

export default ResumeExperienceCard;

interface BtnProps {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  marginleft?: string;
}
const S = {
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 50px;
  `,
  WorkExperienceList: styled.li`
    padding-top: 20px;
    padding-bottom: 5px;
    list-style: none;
    border-radius: 8px;
    border: 1.5px solid var(--main-blue);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  TextArea: styled.div``,
  PastWorkField: styled.p`
    font-size: 18px;
    font-weight: bolder;
  `,
  PastWorkDetail: styled.p`
    font-size: 16px;
    margin-top: 5px;
  `,
  PastWorkDuration: styled.p`
    font-size: 16px;
    margin-top: 5px;
  `,
  BtnBox: styled.div`
    display: flex;
    margin-top: 25px;
    margin-left: auto;
    padding-right: 3%;
  `,
  Btn: styled.button<BtnProps>`
    background-color: var(--main-blue);
    color: white;
    border: none;

    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding || "10px"};
    margin-left: ${(props) => props.marginleft};
  `,
};
