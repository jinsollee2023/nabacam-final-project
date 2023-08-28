import React, { useState } from "react";
import { Select } from "antd";
import ImagePreview from "./ProfileImg";
import { uploadUserImage } from "src/api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "src/zustand/useUserStore";
import { clientSignupHandler } from "src/api/auth";

interface JoinFormProps {
  // freelancerOpen: boolean;
  role: string;
}

// 회원가입
const JoinForm = ({ role }: JoinFormProps) => {
  // useinput

  const initialValues: any = {
    email: "",
    name: "",
    workExp: 0,
    phone: "",
  };

  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState<File>();
  const [values, setValues] = useState(initialValues);
  const [openClientJoin, setOpenClientJoin] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [workSelect, setWorkSelect] = useState("");
  const { setUser } = useUserStore(); // 추가

  const onChange = (value: string) => {
    setWorkSelect(value);
  };

  // 회원가입 api

  const signUP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await clientSignupHandler(
      values,
      photoFile,
      uploadUserImage,
      role,
      workSelect,
      setUser,
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

  const handlePhotoURLOnChange = (file: File) => {
    setPhotoFile(file);
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
            {errors.email && <p>{errors.email}</p>}
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

              <ImagePreview handlePhotoURLOnChange={handlePhotoURLOnChange} />

              {role === "freelancer" && (
                <>
                  <Select
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
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
                  <input
                    type="text"
                    name="workField"
                    value={values.workField}
                    onChange={handleChange}
                    placeholder="작업영역"
                  />

                  <input
                    type="text"
                    name="workExp"
                    value={values.workExp}
                    onChange={handleChange}
                    placeholder="경험"
                  />
                </>
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
