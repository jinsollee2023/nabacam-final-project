import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { User } from "src/Types";
import PreviewImage from "src/components/auth/join/PreviewImage";
import { useProfileInfoStore } from "src/zustand/useProfileInfoStore";

interface EditFormProps {
  user: User;
}
const EditForm = ({ user }: EditFormProps) => {
  // 상태관리
  const initialValues = {
    name: user.name,
    workSmallField: user.workField?.workSmallField as string,
    phone: user.contact.phone,
    photo: user.photoURL,
  };

  const [values, setValues] = useState(initialValues);
  const [workField, setWorkField] = useState(user.workField?.workField);
  const [photoFile, setPhotoFile] = useState<File>();
  const { changeNewProfileInfo } = useProfileInfoStore();

  const newProfileInfo = {
    name: values.name,
    workField: workField as string,
    workSmallField: values.workSmallField,
    phone: values.phone,
    photo: photoFile ? (photoFile as File) : user.photoURL,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };

  const selectOnChange = (value: string) => {
    setWorkField(value);
  };

  useEffect(() => {
    changeNewProfileInfo(newProfileInfo);
  }, [values, photoFile, workField]);

  return (
    <>
      <form>
        <PreviewImage
          handlePhotoURLOnChange={setPhotoFile}
          defaultImage={user.photoURL}
        />
        <label>
          이름:
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label>
          직무분야:
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
          />
        </label>
        <label>
          세부분야:
          <input
            id="workSmallField"
            type="text"
            value={values.workSmallField}
            onChange={handleChange}
          />
        </label>
        <label>
          전화번호:
          <input
            id="phone"
            type="text"
            value={values.phone}
            onChange={handleChange}
          />
        </label>
      </form>
    </>
  );
};

export default EditForm;
