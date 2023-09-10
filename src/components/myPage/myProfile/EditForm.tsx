import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { User } from "../../../Types";
import PreviewImage from "../../../components/auth/join/PreviewImage";
import { useProfileInfoStore } from "../../../store/useProfileInfoStore";
import { S } from "./myProfile.styles";
import { formatPhoneNumber } from "src/components/common/commonFunc";

interface EditFormProps {
  user: User;
}
const EditForm = ({ user }: EditFormProps) => {
  const initialValues = {
    name: user.name,
    workSmallField: user.workField?.workSmallField as string,
    phone: user.contact.phone,
    photo: user.photoURL,
  };

  const [values, setValues] = useState(initialValues);
  const [workField, setWorkField] = useState(user.workField?.workField);
  const [photoFile, setPhotoFile] = useState<File | null | string>();
  const { changeNewProfileInfo } = useProfileInfoStore();

  const JoinDefaultImage =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800";

  const newProfileInfo = {
    name: values.name,
    workField: workField as string,
    workSmallField: values.workSmallField,
    phone: values.phone,
    photo: photoFile ? photoFile : user.photoURL,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };

  const selectOnChange = (value: string) => {
    setWorkField(value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, phone: formatPhoneNumber(e.target.value) });
  };

  useEffect(() => {
    changeNewProfileInfo(newProfileInfo);
  }, [values, photoFile, workField]);

  return (
    <>
      <form>
        <PreviewImage
          handlePhotoURLOnChange={setPhotoFile}
          defaultImage={JoinDefaultImage}
          previewImage={user.photoURL}
        />
        <S.Label>이름 </S.Label>
        <S.Input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange}
        />

        {user.role === "freelancer" && (
          <>
            <S.Label>직무 분야</S.Label>
            <br />
            <Select
              id="workField"
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={selectOnChange}
              value={workField}
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
            <br />
            <br />
            <S.Label>세부 분야</S.Label>
            <S.Input
              id="workSmallField"
              type="text"
              value={values.workSmallField}
              onChange={handleChange}
            />
          </>
        )}

        <S.Label>전화번호</S.Label>
        <S.Input
          id="phone"
          type="text"
          value={values.phone}
          onChange={handlePhoneNumberChange}
        />
      </form>
    </>
  );
};

export default EditForm;
