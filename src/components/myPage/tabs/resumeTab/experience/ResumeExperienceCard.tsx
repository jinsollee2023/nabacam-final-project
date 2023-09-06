import React, { useState } from "react";
import Modal from "../../../../../components/modal/Modal";
import useResumeExperienceQueries from "../../../../../hooks/useResumeExperienceQueries";
import { useUserStore } from "../../../../../zustand/useUserStore";
import type { ResumeExperience } from "../../../../../Types";
import { useResumeExperienceStore } from "../../../../../zustand/useResumeExperienceStore";
import AddResumeExperienceModal from "./AddResumeExperienceModal";
import { S } from "../Resume.styles";
import { CommonS } from "src/components/common/button/commonButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        deleteExperienceMutation.mutate({ userId, experienceId });
        toast.success("삭제되었습니다.");
      } catch (error) {
        toast.error("오류가 발생했습니다.");
      }
    }
  };

  const updateExperienceHandler = () => {
    if (!newExperience) {
      toast.error("경력사항을 입력해주세요.");
      return;
    }

    try {
      updateExperienceMutation.mutate({
        userId,
        experienceId,
        newExperience,
      });
      toast.success("수정되었습니다.");
    } catch (error) {
      toast.error("오류가 발생했습니다.");
    }

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
          <AddResumeExperienceModal experience={experience} />
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceCard;
