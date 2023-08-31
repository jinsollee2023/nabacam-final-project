import React, { useState } from "react";
import Modal from "../../../../components/modal/Modal";
import useResumeExperienceQueries from "../../../../hooks/useResumeExperienceQueries";
import { useUserStore } from "../../../../zustand/useUserStore";
import type { ResumeExperience } from "../../../../Types";
import { styled } from "styled-components";
import { useResumeExperienceStore } from "../../../../zustand/useResumeExperienceStore";
import EditResumeExperienceModal from "./EditResumeExperienceModal";
import { S } from "./ResumeStyles";

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

  const deleteExperienceHandler = () => {
    deleteExperienceMutation.mutate({ userId, experienceId });
  };

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
        <S.RightEndBtnBox>
          <S.Btn onClick={() => setIsUpdateModalOpen(true)}>수정</S.Btn>
          <S.Btn marginLeft="10px" onClick={deleteExperienceHandler}>
            삭제
          </S.Btn>
        </S.RightEndBtnBox>
      </S.WorkExperienceList>
    </>
  );
};

export default ResumeExperienceCard;
