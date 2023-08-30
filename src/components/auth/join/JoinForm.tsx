import React, { useEffect, useState } from "react";
import { Select } from "antd";
import ImagePreview from "./ProfileImg";
import { uploadUserImage } from "src/api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "src/zustand/useUserStore";
import { clientSignupHandler } from "src/api/auth";
import Validation from "./Validation";
import { styled } from "styled-components";
import EmailCheck from "../resetpassword/EmailCheck";

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
  const [modal, setModal] = useState(false);
  const { setUser } = useUserStore(); // 추가

  const onChange = (value: string) => {
    setWorkSelect(value);
  };

  // 회원가입 api

  const signUP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(Validation(values));

    await clientSignupHandler(
      values,
      photoFile,
      uploadUserImage,
      role,
      workSelect,
      setUser,
      // setOpenClientJoin
      navigate
    );
  };
  //  순수 useState handler

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  const openModalHandler = () => {
    setModal(!modal);
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
      <S.JoinForm>
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
              <div>{errors.email && <p>{errors.email}</p>}</div>

              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={values.password}
                onChange={handleChange}
              />
              <div>{errors.password && <p>{errors.password}</p>}</div>

              <input
                type="password"
                name="passwordConfirmCurrent"
                placeholder="비밀번호 확인"
                value={values.passwordConfirmCurrent}
                onChange={handleChange}
              />
              <div>
                {errors.passwordConfirmCurrent && (
                  <p>{errors.passwordConfirmCurrent}</p>
                )}
              </div>

              <input
                type="text"
                name="name"
                placeholder="이름"
                value={values.name}
                onChange={handleChange}
              />
              <div>{errors.name && <p>{errors.name}</p>}</div>

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
              <div>{errors.phone && <p>{errors.phone}</p>}</div>

              <button>회원가입</button>
              <button onClick={cancel}>취소</button>
            </div>
          </form>
        )}
        <div>
          <button onClick={openModalHandler}>비밀번호찾기</button>
          {modal && <EmailCheck />}
        </div>
      </S.JoinForm>
    </>
  );
};

export default JoinForm;

const S = {
  tabsContainer: styled.div`
    height: 50%px;
    font-size: 50px;
    position: relative;
    margin-top: 50%;
  `,
  Tabs: styled.div`
    height: 100px;
    padding: 100px;
    position: relative;
    top: 100px;
  `,
  JoinForm: styled.div`
    position: relative;
    left: 100px;
  `,
};
