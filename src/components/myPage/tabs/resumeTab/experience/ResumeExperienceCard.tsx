import React, { useState } from "react";
import Modal from "../../../../../components/modal/Modal";
import useResumeExperienceQueries from "../../../../../hooks/useResumeExperienceQueries";
import { useUserStore } from "../../../../../store/useUserStore";
import type { ResumeExperience } from "../../../../../Types";
import { useResumeExperienceStore } from "../../../../../store/useResumeExperienceStore";
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
    try {
      deleteExperienceMutation.mutate({ userId, experienceId });
      toast.success("삭제되었습니다.");
    } catch (error) {
      toast.error("오류가 발생했습니다.");
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

  const handleDeleteConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.
    deleteExperienceHandler();
    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleDeleteCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showDeleteConfirmation = () => {
    toast.info(
      <div>
        <p>삭제하시겠습니까?</p>
        <button onClick={handleDeleteConfirm}>확인</button>
        <button onClick={handleDeleteCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleUpdateConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.
    updateExperienceHandler();
    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleUpdateCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showUpdateConfirmation = () => {
    toast.info(
      <div>
        <p>수정하시겠습니까?</p>
        <button onClick={handleUpdateConfirm}>확인</button>
        <button onClick={handleUpdateCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
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
          <S.Btn marginLeft="5px" onClick={showDeleteConfirmation}>
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
                <S.Btn onClick={showUpdateConfirmation}>수정하기</S.Btn>
                <S.Btn marginLeft="10px" onClick={showDeleteConfirmation}>
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
