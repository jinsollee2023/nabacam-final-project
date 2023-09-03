import React, { useEffect, useState } from "react";
import { Select } from "antd";
import PreviewImage from "./PreviewImage";
import { uploadUserImage } from "../../../api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../zustand/useUserStore";
import { clientSignupHandler } from "../../../api/auth";
import Validation from "./Validation";
import { styled } from "styled-components";
import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

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
  const [showPswd, setShowPswd] = useState<boolean>(false);
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
    if (
      !errors.email &&
      !errors.password &&
      !errors.passwordConfirmCurrent &&
      !errors.name &&
      !errors.phone
    ) {
      await clientSignupHandler(
        values,
        photoFile,
        uploadUserImage,
        role,
        workSelect,
        setUser,

        navigate
      );
    }
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
  // 비밀번호 표시
  const showPasswordHandler = () => {
    setShowPswd(!showPswd);
  };

  // 모달

  const JoinDefaultImage =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800";

  return (
    <>
      <S.JoinForm>
        {openClientJoin && (
          <form onSubmit={(e) => signUP(e)}>
            <h1>이메일</h1>
            <div>
              <S.JoinInput
                type="email"
                name="email"
                placeholder="ex ) email@google.com"
                value={values.email}
                onChange={handleChange}
              />
              <S.errordiv>{errors.email && <p>{errors.email}</p>}</S.errordiv>

              <h1>비밀번호</h1>
              <S.JoinInput
                type={showPswd ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                value={values.password}
                onChange={handleChange}
              />
              <S.errordiv>
                {errors.password && <p>{errors.password}</p>}
              </S.errordiv>

              <h1>비밀번호 확인</h1>

              <S.JoinInput
                type={showPswd ? "text" : "password"}
                name="passwordConfirmCurrent"
                placeholder="비밀번호 확인"
                value={values.passwordConfirmCurrent}
                onChange={handleChange}
              />

              <S.errordiv>
                {errors.passwordConfirmCurrent && (
                  <p>{errors.passwordConfirmCurrent}</p>
                )}
              </S.errordiv>

              <h1>이름</h1>

              <S.JoinInput
                type="text"
                name="name"
                placeholder="ex) 홍길동"
                value={values.name}
                onChange={handleChange}
              />
              <div>{errors.name && <p>{errors.name}</p>}</div>
              <br />

              <PreviewImage
                handlePhotoURLOnChange={handlePhotoURLOnChange}
                defaultImage={JoinDefaultImage}
              />
              <br />

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
                  <br />

                  <h1>작업영역</h1>

                  <S.JoinInput
                    type="text"
                    name="workField"
                    value={values.workField}
                    onChange={handleChange}
                    placeholder="ex) react"
                  />
                  <br />

                  <h1>경험</h1>
                  <S.JoinInput
                    type="text"
                    name="workExp"
                    value={values.workExp}
                    onChange={handleChange}
                    placeholder="ex) 1"
                  />
                  <br />
                </>
              )}
              <h1>전화번호</h1>

              <S.JoinInput
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="ex) 010-1234-5678 "
              />
              <div>{errors.phone && <p>{errors.phone}</p>}</div>
              <br />

              <S.JoinButton>
                {role !== "freelancer"
                  ? "클라이언트 회원가입"
                  : "프리랜서 회원가입"}
              </S.JoinButton>
            </div>
          </form>
        )}
        <S.passwordView onClick={showPasswordHandler}>
          {showPswd ? (
            <EyeOutlined onClick={showPasswordHandler} />
          ) : (
            <EyeInvisibleOutlined />
          )}
        </S.passwordView>

        <br />
        <div>
          <S.passwordFindButton onClick={openModalHandler}>
            비밀번호찾기
          </S.passwordFindButton>
          {modal && <EmailCheck openModal={openModalHandler} />}
        </div>
      </S.JoinForm>
    </>
  );
};

export default JoinForm;

const S = {
  JoinForm: styled.div`
    position: relative;
    top: 5px;
    left: 300px;
    bottom: 100px;
  `,
  JoinInput: styled.input`
    border: 1px solid black;
    left: 10%;
    width: 416px;
    height: 43px;
    border-radius: 10px;
  `,
  JoinButton: styled.button`
    width: 417px;
    height: 43px;
    border-radius: 10px;
    border: 1px solid;
    background-color: white;
    cursor: pointer;
  `,
  passwordFindButton: styled.button`
    width: 417px;
    height: 43px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: white;
  `,
  passwordView: styled.button`
    position: relative;
    top: -90%;
    left: 59%;
    width: 2%;
    height: 2%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 10px;
  `,
  errordiv: styled.div`
    height: 20px;
  `,
};
