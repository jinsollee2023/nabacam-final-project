import React, { useState } from "react";
import Modal from "src/components/modal/Modal";
import AddResumeExperienceModal from "./AddResumeExperienceModal";
import useResumeExperienceQueries from "src/hooks/useResumeExperienceQueries";
import { useUserStore } from "src/zustand/useUserStore";
import type { ResumeExperience } from "src/Types";
import { styled } from "styled-components";
import { useResumeExperienceStore } from "src/zustand/useResumeExperienceStore";

interface ExperienceCardProps {
  experience: ResumeExperience;
}
const ResumeExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
}: ExperienceCardProps) => {
  const { userId } = useUserStore();
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
          <AddResumeExperienceModal />
        </Modal>
      )}

      {/* 실제로 보여지는 부분 */}

      <S.WorkExperienceList>
        <h1>{experience.experienceId}</h1>
        <h1>{experience.pastWorkField}</h1>
        <div>
          {experience.pastWorkPlace}/{experience.pastEmploymentType}/
          {experience.pastWorkPosition}
        </div>
        <div>
          <span>
            {
              new Date(experience.pastWorkDuration.pastWorkStartDate)
                .toISOString()
                .split("T")[0]
            }
          </span>
          ~
          <span>
            {
              new Date(experience.pastWorkDuration.pastWorkEndDate)
                .toISOString()
                .split("T")[0]
            }
          </span>
        </div>
        <div className="buttonBox">
          <S.Btn onClick={() => setIsUpdateModalOpen(true)}>수정 x</S.Btn>
          <S.Btn onClick={deleteExperienceHandler}>삭제 x</S.Btn>
        </div>
      </S.WorkExperienceList>
    </>
  );
};

export default ResumeExperienceCard;

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
