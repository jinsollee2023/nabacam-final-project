import React, { useEffect, useState } from "react";
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
import { Errors } from "./ResumeExperienceComp";
import useValidation from "src/hooks/useValidation";

interface ExperienceProps {
  experience: ResumeExperience;
  errors: Errors;
  setErrors: (errors: Errors) => void;
}
const ResumeExperienceCard = ({
  experience,
  errors,
  setErrors,
}: ExperienceProps) => {
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
  const [
    updateExperienceSubmitButtonClicked,
    setUpdateExperienceSubmitButtonClicked,
  ] = useState(false);
  const { validateWorkDuration, validateInput, validateSelect } =
    useValidation();

  const deleteExperienceHandler = () => {
    try {
      deleteExperienceMutation.mutate({ userId, experienceId });
      toast.success("삭제되었습니다.");
    } catch (error) {
      toast.error("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (
      updateExperienceSubmitButtonClicked &&
      errors.pastWorkPlace === "" &&
      errors.pastWorkPosition === "" &&
      errors.pastWorkDuration === "" &&
      errors.pastWorkField === "" &&
      errors.pastEmploymentType === ""
    ) {
      updateExperience();
      setUpdateExperienceSubmitButtonClicked(false);
    } else setUpdateExperienceSubmitButtonClicked(false);
  }, [errors, updateExperienceSubmitButtonClicked]);

  const validateUpdateExperience = () => {
    const pastWorkPlaceError = validateInput(
      "근무지",
      newExperience.pastWorkPlace
    );
    const pastWorkPositionError = validateInput(
      "직책",
      newExperience.pastWorkPosition
    );
    const pastWorkDurationError = validateWorkDuration(
      newExperience.pastWorkDuration.pastWorkEndDate,
      newExperience.pastWorkDuration.pastWorkStartDate
    );
    const pastWorkFieldError = validateSelect(
      "근무 분야",
      newExperience.pastWorkField
    );
    const pastEmploymentTypeError = validateSelect(
      "근무 형태",
      newExperience.pastEmploymentType
    );
    setErrors({
      pastWorkPlace: pastWorkPlaceError,
      pastWorkPosition: pastWorkPositionError,
      pastWorkDuration: pastWorkDurationError,
      pastWorkField: pastWorkFieldError,
      pastEmploymentType: pastEmploymentTypeError,
    });
  };

  const updateModalOpenButtonHandler = () => {
    setIsUpdateModalOpen(true);
    setErrors({
      pastWorkPlace: null,
      pastWorkPosition: null,
      pastWorkDuration: null,
      pastWorkField: null,
      pastEmploymentType: null,
    });
  };

  const updateExperienceHandler = () => {
    setUpdateExperienceSubmitButtonClicked(true);
    validateUpdateExperience();
  };

  const updateExperience = () => {
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
    deleteExperienceHandler();
    toast.dismiss();
  };

  const handleDeleteCancel = () => {
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
        <CommonS.FlexBox marginTop="15px" style={{ width: "90%" }}>
          <S.ResumButton onClick={showDeleteConfirmation} width="50%">
            삭제
          </S.ResumButton>
          <S.ResumButton
            marginLeft="5px"
            onClick={updateModalOpenButtonHandler}
            width="50%"
          >
            수정
          </S.ResumButton>
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
                <S.Btn marginLeft="10px" onClick={showDeleteConfirmation}>
                  삭제하기
                </S.Btn>
              </CommonS.RightEndBtnBox>
            </>
          }
        >
          <AddResumeExperienceModal
            experience={experience}
            errors={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceCard;
