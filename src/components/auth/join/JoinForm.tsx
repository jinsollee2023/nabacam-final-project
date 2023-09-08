import React, { useEffect, useState } from "react";
import { Select } from "antd";
import PreviewImage from "./PreviewImage";
import { uploadUserImage } from "../../../api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { clientSignupHandler } from "../../../api/auth";
import Validation from "./Validation";

import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { S } from "./joinComp.styles";

interface JoinFormProps {
  role: string;
}
interface initialValuesForm {
  email: string;
  password: string;
  passwordConfirmCurrent: string;
  name: string;
  workExp: number;
  phone: string;
  category: string;
  workField: string;
  photoFile: File | null;
}
interface initialErrorsForm {
  email: string | null;
  password: string | null;
  passwordConfirmCurrent: string | null;
  name: string | null;
  phone: string | null;
}
// 회원가입
const JoinForm = ({ role }: JoinFormProps) => {
  // useinput

  const initialValues: initialValuesForm = {
    email: "",
    password: "",
    passwordConfirmCurrent: "",
    name: "",
    workExp: 0,
    phone: "",
    category: "",
    workField: "",
    photoFile: null,
  };

  const initialErrors: initialErrorsForm = {
    email: null,
    password: null,
    passwordConfirmCurrent: null,
    name: null,
    phone: null,
  };

  const navigate = useNavigate();
  const [values, setValues] = useState<initialValuesForm>(initialValues);
  const [errors, setErrors] = useState<initialErrorsForm>(initialErrors);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [showConfirmPswd, setShowConfirmPswd] = useState<boolean>(false);
  const [findPasswordModalOpen, setFindPasswordModalOpen] =
    useState<boolean>(false);
  const { setUser, setUserId, setUserRole } = useUserStore(); // 추가

  // erros 변경사항 바로확인하기 위한 useEffect

  useEffect(() => {
    setErrors(Validation(values));
  }, [values]);

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
        uploadUserImage,
        role,
        setUser,
        setUserId,
        setUserRole,
        navigate
      );
    } else {
      alert("필수입력칸이 비워져있습니다.");
    }
  };

  //  순수 useState handler
  const handleChange = (key: string, value: string | number) => {
    setValues({ ...values, [key]: value });
  };
  // 미리보기 핸들러
  const handlePhotoURLOnChange = (file: File) => {
    setValues({ ...values, photoFile: file });
  };
  // 비밀번호 표시
  const showPasswordHandler = () => {
    setShowPswd(!showPswd);
  };
  // 비밀번호 확인
  const showConfirmPasswordHandler = () => {
    setShowConfirmPswd(!showConfirmPswd);
  };

  // 모달

  const JoinDefaultImage =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800";

  return (
    <>
      <S.JoinFormContainer>
        {/* 폼 안에 있는건 전부 input */}
        <S.JoinForm onSubmit={(e) => signUP(e)}>
          <PreviewImage
            handlePhotoURLOnChange={handlePhotoURLOnChange}
            defaultImage={JoinDefaultImage}
          />
          <S.InputWrapper>
            <label htmlFor="emailInput" style={{ color: "var(--darker-gray)" }}>
              * 이메일
            </label>
            <S.JoinInput
              id="emailInput"
              type="email"
              placeholder="ex ) email@google.com"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <S.errordiv>{errors.email && <p>{errors.email}</p>}</S.errordiv>

            <label
              htmlFor="passwordInput"
              style={{ color: "var(--darker-gray)" }}
            >
              * 비밀번호
            </label>
            <S.PasswordInputWrapper>
              <S.PasswordInput
                id="passwordInput"
                type={showPswd ? "text" : "password"}
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <S.CenterizeBox>
                <S.EyeBtn onClick={showPasswordHandler} type="button">
                  {showPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </S.EyeBtn>
              </S.CenterizeBox>
            </S.PasswordInputWrapper>
            <S.errordiv>
              {errors.password && <p>{errors.password}</p>}
            </S.errordiv>

            <label
              htmlFor="checkPasswordInput"
              style={{ color: "var(--darker-gray)" }}
            >
              * 비밀번호 확인
            </label>
            <S.PasswordInputWrapper>
              <S.PasswordInput
                id="checkPasswordInput"
                type={showConfirmPswd ? "text" : "password"}
                value={values.passwordConfirmCurrent}
                onChange={(e) =>
                  handleChange("passwordConfirmCurrent", e.target.value)
                }
              />
              <S.CenterizeBox>
                <S.EyeBtn onClick={showConfirmPasswordHandler} type="button">
                  {showConfirmPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </S.EyeBtn>
              </S.CenterizeBox>
            </S.PasswordInputWrapper>

            <S.errordiv>
              {errors.passwordConfirmCurrent && (
                <p>{errors.passwordConfirmCurrent}</p>
              )}
            </S.errordiv>

            <label htmlFor="nameInput" style={{ color: "var(--darker-gray)" }}>
              * 이름
            </label>

            <S.JoinInput
              id="nameInput"
              type="text"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <div>{errors.name && <p>{errors.name}</p>}</div>

            {role === "freelancer" && (
              <>
                <label
                  htmlFor="workFieldInput"
                  style={{
                    color: "var(--darker-gray)",
                    marginBottom: "10px",
                  }}
                >
                  * 작업영역
                </label>
                <Select
                  id="workFieldInput"
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(selectedValue) =>
                    handleChange("category", selectedValue)
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
                    {
                      value: "마케팅",
                      label: "마케팅",
                    },
                    {
                      value: "기타",
                      label: "기타",
                    },
                  ]}
                />
                <label
                  htmlFor="workSmallFieldInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 작업 영역 (상세)
                </label>

                <S.JoinInput
                  id="workSmallFieldInput"
                  type="text"
                  value={values.workField}
                  onChange={(e) => handleChange("workField", e.target.value)}
                />
                <label
                  htmlFor="workExpInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 경험/연차 (숫자만 입력 가능합니다.)
                </label>
                <S.JoinInput
                  id="workExpInput"
                  type="number"
                  value={values.workExp}
                  onChange={(e) => handleChange("workExp", e.target.value)}
                />
              </>
            )}

            <label
              htmlFor="phoneNumberInput"
              style={{ color: "var(--darker-gray)" }}
            >
              * 전화번호
            </label>
            <S.JoinInput
              id="phoneNumberInput"
              type="text"
              value={values.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="ex) - 빼고 입력해주세요 "
            />
            <div>{errors.phone && <p>{errors.phone}</p>}</div>
            <br />
          </S.InputWrapper>

          <S.JoinButton>
            {role !== "freelancer"
              ? "클라이언트 회원가입"
              : "프리랜서 회원가입"}
          </S.JoinButton>

          <S.LoginButton type="button" onClick={() => navigate("/login")}>
            로그인하러 가기
          </S.LoginButton>
        </S.JoinForm>
      </S.JoinFormContainer>
    </>
  );
};

export default JoinForm;
