import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Select } from "antd";
import ImagePreview from "./ProfileImg";
import { uploadUserImage } from "src/api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "src/zustand/useUserStore";
import { clientSignupHandler } from "src/api/auth";
import { FormEvent } from "react";
interface FormValue {
  email: string;
  password: string;
}

interface JoinComponentProps {
  freelancerOpen: boolean;
  role: string;
}

// 회원가입
const JoinForm = ({ freelancerOpen, role }: JoinComponentProps) => {
  // useinput

  const { handleSubmit } = useForm<FormValue>();
  const initialValues: any = {
    email: "",
    name: "",
    userRole: "",
    workExp: 0,
    phone: "",
    workField: "",
    photoURL: {},
  };

  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState("");
  const [values, setValues] = useState(initialValues);
  const [openClientJoin, setOpenClientJoin] = useState(true);
  const [openFreelancer] = useState(freelancerOpen);
  const [workSelect, setWorkSelect] = useState("");
  const { setUserRole } = useUserStore(); // 추가

  const { setUserId } = useUserStore();

  //  이미지 업로드 부분

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setWorkSelect(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // 회원가입 api

  const signUP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await clientSignupHandler(
      values,
      uploadUserImage,
      role,
      workSelect,
      setUserRole,
      setUserId,
      setOpenClientJoin,
      navigate
    );
  };

  //  순수 useState handler

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // 미리보기 핸들러

  const handlePhotoURLOnChange = (url: any) => {
    setPhotoURL(url);
  };

  // 모달

  const cancel = () => {
    setOpenClientJoin(false);
  };

  return (
    <>
      <div>
        {openClientJoin && (
          <form onSubmit={(e) => signUP(e)}>
            <h1>회원가입</h1>
            <div>
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={values.password}
                onChange={handleChange}
              />

              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />

              <ImagePreview
                photoURL={photoURL}
                photoURLOnChange={handlePhotoURLOnChange}
              />

              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
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
                    value: "기획",
                    label: "기획",
                  },
                  {
                    value: "기타",
                    label: "기타",
                  },
                ]}
              />

              {openFreelancer && (
                <input
                  type="text"
                  name="workField"
                  value={values.workField}
                  onChange={handleChange}
                  placeholder="작업영역"
                />
              )}

              {openFreelancer && (
                <input
                  type="text"
                  name="workExp"
                  value={values.workExp}
                  onChange={handleChange}
                  placeholder="경험"
                />
              )}

              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="핸드폰"
              />
              <button>회원가입</button>
              <button onClick={cancel}>취소</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default JoinForm;
