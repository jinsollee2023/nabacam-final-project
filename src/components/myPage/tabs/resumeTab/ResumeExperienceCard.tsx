import React, { useState } from "react";
import Modal from "../../../../components/modal/Modal";
import useResumeExperienceQueries from "../../../../hooks/useResumeExperienceQueries";
import { useUserStore } from "../../../../zustand/useUserStore";
import type { ResumeExperience } from "../../../../Types";
import { useResumeExperienceStore } from "../../../../zustand/useResumeExperienceStore";
import EditResumeExperienceModal from "./EditResumeExperienceModal";
import { S } from "./Resume.styles";
import { CommonS } from "src/components/common/button/commonButton";

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
      <S.WorkExperienceList>
        <S.TextArea>
          <CommonS.CenterizeBox>
            <S.PastWorkField>{experience.pastWorkField}</S.PastWorkField>
          </CommonS.CenterizeBox>

          <CommonS.CenterizeBox marginTop="2px">
            <S.PastWorkDetail>
              <CommonS.CenterizeBox marginBottom="5px">
                {experience.pastWorkPlace}
              </CommonS.CenterizeBox>
              <CommonS.CenterizeBox>
                {experience.pastEmploymentType}/{experience.pastWorkPosition}
              </CommonS.CenterizeBox>
            </S.PastWorkDetail>
          </CommonS.CenterizeBox>

          <CommonS.CenterizeBox>
            <S.PastWorkDuration>
              {experience.pastWorkDuration.pastWorkStartDate &&
                new Date(experience.pastWorkDuration.pastWorkStartDate)
                  .toISOString()
                  .split("T")[0]}
              ~
              {experience.pastWorkDuration.pastWorkEndDate &&
                new Date(experience.pastWorkDuration.pastWorkEndDate)
                  .toISOString()
                  .split("T")[0]}
            </S.PastWorkDuration>
          </CommonS.CenterizeBox>
        </S.TextArea>
        <CommonS.FlexBox marginTop="15px">
          <S.Btn onClick={() => setIsUpdateModalOpen(true)}>수정</S.Btn>
          <S.Btn marginLeft="5px" onClick={deleteExperienceHandler}>
            삭제
          </S.Btn>
        </CommonS.FlexBox>
      </S.WorkExperienceList>
      {/* --------------------------------------------------------------- */}
      {isUpdateModalOpen && (
        <Modal
          setIsModalOpen={setIsUpdateModalOpen}
          buttons={
            <>
              <CommonS.RightEndBtnBox>
                <S.Btn onClick={updateExperienceHandler}>수정하기</S.Btn>
                <S.Btn marginLeft="10px" onClick={deleteExperienceHandler}>
                  삭제하기
                </S.Btn>
              </CommonS.RightEndBtnBox>
            </>
          }
        >
          <EditResumeExperienceModal experience={experience} />
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceCard;
