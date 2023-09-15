import { Select, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import type { ResumeExperience } from "../../../../Types";
import { useResumeStore } from "../../../../store/useResumeStore";
import dayjs from "dayjs";
import { S } from "./resume.styles";
import { Errors } from "./ResumeExperienceComp";
import useValidation from "src/hooks/useValidation";

interface ExperienceProps {
  experience?: ResumeExperience;
  errors: Errors;
  setErrors: (errors: Errors) => void;
}
const AddResumeExperienceModal = ({
  experience,
  errors,
  setErrors,
}: ExperienceProps) => {
  const { changeNewExperience } = useResumeStore();
  const { validateWorkDuration, validateInput, validateSelect } =
    useValidation();

  const initialValues = {
    pastWorkPlace: experience ? experience.pastWorkPlace : "",
    pastWorkPosition: experience ? experience.pastWorkPosition : "",
    pastWorkStartDate: experience
      ? experience.pastWorkDuration.pastWorkStartDate
      : "",
    pastWorkEndDate: experience
      ? experience.pastWorkDuration.pastWorkEndDate
      : "",
    pastWorkField: experience ? experience.pastWorkField : "전체",
    pastEmploymentType: experience ? experience.pastEmploymentType : "전체",
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const experienceId = uuidv4();
  const newExperience: ResumeExperience = {
    experienceId,
    pastWorkField: values.pastWorkField,
    pastEmploymentType: values.pastEmploymentType,
    pastWorkDuration: {
      pastWorkEndDate: values.pastWorkEndDate,
      pastWorkStartDate: values.pastWorkStartDate,
    },
    pastWorkPlace: values.pastWorkPlace,
    pastWorkPosition: values.pastWorkPosition,
  };

  useEffect(() => {
    changeNewExperience(newExperience);
  }, [
    values.pastWorkField,
    values.pastEmploymentType,
    values.pastWorkEndDate,
    values.pastWorkStartDate,
    values.pastWorkPlace,
    values.pastWorkPosition,
  ]);
  return (
    <>
      <S.ResumeExpreienceModalForm>
        <S.WriteBox>
          <S.Label>근무 분야</S.Label>
          <Select
            className="pastWorkField"
            defaultValue={values.pastWorkField}
            style={{ width: 460 }}
            onChange={(value) => handleChange("pastWorkField", value)}
            onBlur={() => {
              const pastWorkFieldError = validateSelect(
                "근무 분야",
                values.pastWorkField
              );
              setErrors({ ...errors, pastWorkField: pastWorkFieldError });
            }}
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
          <S.ErrorMessage hasError={!!errors.pastWorkField}>
            {errors.pastWorkField && <p>{errors.pastWorkField}</p>}
          </S.ErrorMessage>
        </S.WriteBox>
        <S.WriteBox>
          <S.Label>근무 형태 </S.Label>
          <Select
            className="pastEmploymentType"
            defaultValue={values.pastEmploymentType}
            style={{ width: 460 }}
            onChange={(value) => handleChange("pastEmploymentType", value)}
            onBlur={() => {
              const pastEmploymentTypeError = validateSelect(
                "근무 형태",
                values.pastEmploymentType
              );
              setErrors({
                ...errors,
                pastEmploymentType: pastEmploymentTypeError,
              });
            }}
            options={[
              { value: "전체", label: "전체" },
              { value: "정규직", label: "정규직" },
              { value: "계약직", label: "계약직" },
              { value: "프리랜서", label: "프리랜서" },
            ]}
          />
          <S.ErrorMessage hasError={!!errors.pastEmploymentType}>
            {errors.pastEmploymentType && <p>{errors.pastEmploymentType}</p>}
          </S.ErrorMessage>
        </S.WriteBox>
        <S.WriteBox>
          <S.Label>근무지</S.Label>
          <S.Input
            name="pastWorkPlace"
            type="text"
            value={values.pastWorkPlace}
            onChange={(e) => handleChange("pastWorkPlace", e.target.value)}
            onBlur={(e) => {
              const pastWorkPlaceError = validateInput(
                "근무지",
                e.target.value
              );
              setErrors({ ...errors, pastWorkPlace: pastWorkPlaceError });
            }}
            placeholder="입력해주세요."
          />
          <S.ErrorMessage hasError={!!errors.pastWorkPlace}>
            {errors.pastWorkPlace && <p>{errors.pastWorkPlace}</p>}
          </S.ErrorMessage>
        </S.WriteBox>
        <S.WriteBox>
          <S.Label>직책 </S.Label>
          <S.Input
            name="pastWorkPosition"
            type="text"
            value={values.pastWorkPosition}
            onChange={(e) => handleChange("pastWorkPosition", e.target.value)}
            onBlur={(e) => {
              const pastWorkPositionError = validateInput(
                "직책",
                e.target.value
              );
              setErrors({ ...errors, pastWorkPosition: pastWorkPositionError });
            }}
            placeholder="입력해주세요."
          />
          <S.ErrorMessage hasError={!!errors.pastWorkPosition}>
            {errors.pastWorkPosition && <p>{errors.pastWorkPosition}</p>}
          </S.ErrorMessage>
        </S.WriteBox>

        <S.WriteBox>
          <S.Label>근무 일자</S.Label>
          <S.subText>입사일</S.subText>
          <DatePicker
            name="pastWorkStartDate"
            onChange={(dateString) =>
              handleChange(
                "pastWorkStartDate",
                dateString?.toISOString().split("T")[0] as string
              )
            }
            onBlur={() => {
              const pastWorkDurationError = validateWorkDuration(
                values.pastWorkStartDate,
                values.pastWorkEndDate
              );
              setErrors({
                ...errors,
                pastWorkDuration: pastWorkDurationError,
              });
            }}
            defaultValue={
              values.pastWorkStartDate
                ? dayjs(values.pastWorkStartDate)
                : undefined
            }
            style={{ width: 460 }}
          />

          <S.subText>퇴사일</S.subText>
          <DatePicker
            onChange={(datestring) =>
              handleChange(
                "pastWorkEndDate",
                datestring?.toISOString().split("T")[0] as string
              )
            }
            onBlur={() => {
              const pastWorkDurationError = validateWorkDuration(
                values.pastWorkStartDate,
                values.pastWorkEndDate
              );
              setErrors({
                ...errors,
                pastWorkDuration: pastWorkDurationError,
              });
            }}
            defaultValue={
              values.pastWorkEndDate ? dayjs(values.pastWorkEndDate) : undefined
            }
            style={{ width: 460 }}
          />

          <S.ErrorMessage hasError={!!errors.pastWorkDuration}>
            {errors.pastWorkDuration && <p>{errors.pastWorkDuration}</p>}
          </S.ErrorMessage>
        </S.WriteBox>
      </S.ResumeExpreienceModalForm>
    </>
  );
};

export default AddResumeExperienceModal;
