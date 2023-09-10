import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { User } from "../../../Types";
import PreviewImage from "../../../components/auth/join/PreviewImage";
import { useProfileInfoStore } from "../../../store/useProfileInfoStore";
import { S } from "./myProfile.styles";
import { formatPhoneNumber } from "src/components/common/commonFunc";
import { Errors } from "./Account";
import useValidation from "src/hooks/useValidation";

interface EditFormProps {
  user: User;
  errors: Errors;
  setErrors: (errors: Errors) => void;
}
const EditForm = ({ user, errors, setErrors }: EditFormProps) => {
  const initialValues = {
    name: user.name,
    workField: user.workField?.workField,
    workSmallField: user.workField?.workSmallField as string,
    phone: user.contact.phone,
    photo: user.photoURL,
  };

  const [values, setValues] = useState(initialValues);
  const [photoFile, setPhotoFile] = useState<File | null>();
  const { changeNewProfileInfo } = useProfileInfoStore();
  const { validateName, validateSelect, validateInput, validatePhone } =
    useValidation();
  const newProfileInfo = {
    name: values.name,
    workField: values.workField as string,
    workSmallField: values.workSmallField,
    phone: values.phone,
    photo: photoFile ? (photoFile as File) : user.photoURL,
  };

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  useEffect(() => {
    changeNewProfileInfo(newProfileInfo);
  }, [values, photoFile]);

  return (
    <>
      <form>
        <PreviewImage
          handlePhotoURLOnChange={setPhotoFile}
          defaultImage={user.photoURL}
        />
        <S.Label>이름 </S.Label>
        <S.Input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => {
            const nameError = validateName(e.target.value);
            setErrors({ ...errors, name: nameError });
          }}
        />
        <p>{errors.name}</p>

        {user.role === "freelancer" && (
          <>
            <S.Label>직무 분야</S.Label>
            <br />
            <Select
              id="workField"
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={(selectedValue) =>
                handleChange("workField", selectedValue)
              }
              onBlur={() => {
                const workFieldError = validateSelect(
                  "직무 분야",
                  values.workField as string
                );
                setErrors({ ...errors, workField: workFieldError });
              }}
              value={values.workField}
              options={[
                {
                  value: "개발",
                  label: "개발",
                },
                {
                  value: "디자인",
                  label: "디자인",
                },
                {
                  value: "운영",
                  label: "운영",
                },
                {
                  value: "마케팅",
                  label: "마케팅",
                },
                {
                  value: "기획",
                  label: "기획",
                },
                {
                  value: "기타",
                  label: "기타",
                },
              ]}
              style={{ marginTop: "15px", width: "100%" }}
            />
            <p>{errors.workField}</p>

            <br />
            <br />
            <S.Label>세부 분야</S.Label>
            <S.Input
              id="workSmallField"
              type="text"
              value={values.workSmallField}
              onChange={(e) => handleChange("workSmallField", e.target.value)}
              onBlur={(e) => {
                const workSmallFieldError = validateInput(
                  "세부 분야",
                  e.target.value
                );
                setErrors({ ...errors, workSmallField: workSmallFieldError });
              }}
            />
            <p>{errors.workSmallField}</p>
          </>
        )}

        <S.Label>전화번호</S.Label>
        <S.Input
          id="phone"
          type="text"
          value={values.phone}
          onChange={(e) =>
            handleChange("phone", formatPhoneNumber(e.target.value))
          }
          onBlur={(e) => {
            const phoneError = validatePhone(e.target.value);
            setErrors({ ...errors, phone: phoneError });
          }}
        />
        <p>{errors.phone}</p>
      </form>
    </>
  );
};

export default EditForm;
