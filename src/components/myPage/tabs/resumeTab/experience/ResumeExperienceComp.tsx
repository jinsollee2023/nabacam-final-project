import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../../store/useUserStore";
import useResumeExperienceQueries from "../../../../../hooks/useResumeExperienceQueries";
import Modal from "../../../../modal/Modal";
import type { ResumeExperience } from "../../../../../Types";
import { useResumeExperienceStore } from "../../../../../store/useResumeExperienceStore";
import ResumeExperienceCard from "./ResumeExperienceCard";
import { BsPlusCircleDotted } from "react-icons/bs";
import { S } from "../Resume.styles";
import AddResumeExperienceModal from "./AddResumeExperienceModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useValidation from "src/hooks/useValidation";

export interface Errors {
  pastWorkPlace: null | string;
  pastWorkPosition: null | string;
  pastWorkDuration: null | string;
  pastWorkField: null | string;
  pastEmploymentType: null | string;
}

const ResumeExperienceComp = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const { addExperienceMutation, resumeExperienceArray } =
    useResumeExperienceQueries({ userId });
  const { newExperience } = useResumeExperienceStore();

  const [resumeExperienceArr, setResumeExperienceArr] = useState<
    ResumeExperience[]
  >([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const initialErrors: Errors = {
    pastWorkPlace: null,
    pastWorkPosition: null,
    pastWorkDuration: null,
    pastWorkField: null,
    pastEmploymentType: null,
  };
  const [errors, setErrors] = useState(initialErrors);
  const { validateWorkDuration, validateInput, validateSelect } =
    useValidation();
  const [
    addExperienceSubmitButtonClicked,
    setAddExperienceSubmitButtonClicked,
  ] = useState(false);

  useEffect(() => {
    if (
      addExperienceSubmitButtonClicked &&
      errors.pastWorkPlace === "" &&
      errors.pastWorkPosition === "" &&
      errors.pastWorkDuration === "" &&
      errors.pastWorkField === "" &&
      errors.pastEmploymentType === ""
    ) {
      addExperience();
      setAddExperienceSubmitButtonClicked(false);
    } else setAddExperienceSubmitButtonClicked(false);
  }, [errors, addExperienceSubmitButtonClicked]);

  const validateAddExperience = () => {
    const pastWorkPlaceError = validateInput(
      "근무지",
      newExperience.pastWorkPlace
    );
    const pastWorkPositionError = validateInput(
      "직책",
      newExperience.pastWorkPosition
    );

    const pastWorkDurationError = validateWorkDuration(
      newExperience.pastWorkDuration.pastWorkStartDate,
      newExperience.pastWorkDuration.pastWorkEndDate
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
  const addModalOpenButtonHandler = () => {
    setIsAddModalOpen(true);
    setErrors({
      pastWorkPlace: null,
      pastWorkPosition: null,
      pastWorkDuration: null,
      pastWorkField: null,
      pastEmploymentType: null,
    });
  };

  const addExperienceHandler = () => {
    setAddExperienceSubmitButtonClicked(true);
    validateAddExperience();
  };

  const addExperience = () => {
    try {
      addExperienceMutation.mutate({
        newExperience,
        userId,
      });
      toast.success("경력사항이 등록되었습니다.");
    } catch (error) {
      toast.error("오류가 발생했습니다.");
    }

    setIsAddModalOpen(false);
  };

  useEffect(() => {
    if (resumeExperienceArray) setResumeExperienceArr(resumeExperienceArray);
  }, [resumeExperienceArray]);

  const availableClose =
    newExperience.pastWorkPlace === "" &&
    newExperience.pastWorkPosition === "" &&
    newExperience.pastWorkDuration.pastWorkEndDate === "" &&
    newExperience.pastWorkDuration.pastWorkStartDate === "" &&
    newExperience.pastWorkField === "전체" &&
    newExperience.pastEmploymentType === "전체";

  return (
    <>
      <S.WorkExperienceContainer>
        <S.WorkExperienceTitle>경력사항</S.WorkExperienceTitle>
        <S.WorkExperienceListWrapper>
          {resumeExperienceArr?.map((item: ResumeExperience) => (
            <ResumeExperienceCard
              key={item.experienceId}
              experience={item}
              errors={errors}
              setErrors={setErrors}
            />
          ))}
        </S.WorkExperienceListWrapper>
      </S.WorkExperienceContainer>
      <S.WorkExperienceAddButton onClick={addModalOpenButtonHandler}>
        <BsPlusCircleDotted size="15" style={{ marginRight: "5px" }} />
        경력 추가하기
      </S.WorkExperienceAddButton>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <S.Btn width="100%" onClick={addExperienceHandler}>
                등록하기
              </S.Btn>
            </>
          }
          availableClose={availableClose}
        >
          <AddResumeExperienceModal errors={errors} setErrors={setErrors} />
        </Modal>
      )}
    </>
  );
};

export default ResumeExperienceComp;
