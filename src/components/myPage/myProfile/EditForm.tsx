import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { User } from "../../../Types";
import PreviewImage from "../../common/PreviewImage";
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
  const [photoFile, setPhotoFile] = useState<File | null | string>();
  const { changeNewProfileInfo } = useProfileInfoStore();
  const { validateName, validateSelect, validateInput, validatePhone } =
    useValidation();
  const JoinDefaultImage =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800";

  const newProfileInfo = {
    name: values.name,
    workField: values.workField as string,
    workSmallField: values.workSmallField,
    phone: values.phone,
    photo: photoFile ? photoFile : user.photoURL,
  };

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  useEffect(() => {
    changeNewProfileInfo(newProfileInfo);
  }, [values, photoFile]);

  return (
    <>
      <S.EditForm>
        <PreviewImage
          handlePhotoURLOnChange={setPhotoFile}
          defaultImage={JoinDefaultImage}
          previewImage={user.photoURL}
        />
        <S.WriteBox>
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
          <S.ErrorMessage hasError={!!errors.name}>
            {errors.name && <p>{errors.name}</p>}
          </S.ErrorMessage>
        </S.WriteBox>
        {user.role === "freelancer" && (
          <>
            <S.WriteBox>
              <S.Label>직무 분야</S.Label>
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
              <S.ErrorMessage hasError={!!errors.workField}>
                {errors.workField && <p>{errors.workField}</p>}
              </S.ErrorMessage>
            </S.WriteBox>
            <S.WriteBox>
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
              <S.ErrorMessage hasError={!!errors.workSmallField}>
                {errors.workSmallField && <p>{errors.workSmallField}</p>}
              </S.ErrorMessage>
            </S.WriteBox>
          </>
        )}

        <S.WriteBox>
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
          <S.ErrorMessage hasError={!!errors.phone}>
            {errors.phone && <p>{errors.phone}</p>}
          </S.ErrorMessage>
        </S.WriteBox>
      </S.EditForm>
    </>
  );
};

export default EditForm;
