import React, { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import PreviewImage from "./PreviewImage";
import { uploadUserImage } from "../../../api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { clientSignupHandler } from "../../../api/auth";
import useValidation from "../../../hooks/useValidation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { S } from "./joinComp.styles";
import { formatPhoneNumber } from "src/components/common/commonFunc";

interface JoinFormProps {
  role: string;
}
interface initialValuesForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  workExp: number | null;
  phone: string;
  workField: string;
  workSmallField: string;
  photoFile: File | null;
}
interface initialErrorsForm {
  email: string | null;
  password: string | null;
  passwordConfirm: string | null;
  name: string | null;
  workField: string | null;
  workSmallField: string | null;
  workExp: string | null;
  phone: string | null;
}
// 회원가입
const JoinForm = ({ role }: JoinFormProps) => {
  // useinput
  const initialValues: initialValuesForm = {
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    workExp: null,
    phone: "",
    workField: "",
    workSmallField: "",
    photoFile: null,
  };

  const initialErrors: initialErrorsForm = {
    email: null,
    password: null,
    passwordConfirm: null,
    name: null,
    workField: null,
    workSmallField: null,
    workExp: null,
    phone: null,
  };

  const navigate = useNavigate();
  const [values, setValues] = useState<initialValuesForm>(initialValues);
  const [errors, setErrors] = useState<initialErrorsForm>(initialErrors);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [showConfirmPswd, setShowConfirmPswd] = useState<boolean>(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const { setUser, setUserId, setUserRole } = useUserStore(); // 추가
  const {
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateName,
    validateWorkField,
    validateWorkSmallField,
    validateWorkExp,
    validatePhone,
  } = useValidation();

  const emailInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, []);

  // 회원가입 api

  const signUp = async () => {
    try {
      await clientSignupHandler(
        values,
        uploadUserImage,
        role,
        setUser,
        setUserId,
        setUserRole,
        navigate,
        setSubmitButtonClicked
      );
    } catch (error) {
      setSubmitButtonClicked(false);
    }
  };

  useEffect(() => {
    if (
      role === "client" &&
      submitButtonClicked &&
      errors.email === "" &&
      errors.password === "" &&
      errors.passwordConfirm === "" &&
      errors.name === "" &&
      errors.phone === ""
    ) {
      signUp();
    } else setSubmitButtonClicked(false);
  }, [submitButtonClicked, errors]);

  const validateRegister = () => {
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    const passwordConfirmError = validatePasswordConfirm(
      values.password,
      values.passwordConfirm
    );
    const nameError = validateName(values.name);
    const workFieldError = validateWorkField(values.workField);
    const workSmallFieldError = validateWorkSmallField(values.workSmallField);
    const workExpError = validateWorkExp(values.workExp as number);
    const phoneError = validatePhone(values.phone);

    setErrors({
      email: emailError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
      name: nameError,
      workField: workFieldError,
      workSmallField: workSmallFieldError,
      workExp: workExpError,
      phone: phoneError,
    });
  };

  const signUpButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateRegister();
    setSubmitButtonClicked(true);
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

  const JoinDefaultImage =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800";

  return (
    <>
      <S.JoinFormContainer>
        {/* 폼 안에 있는건 전부 input */}
        <S.JoinForm onSubmit={signUpButtonHandler}>
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
              ref={emailInput}
              type="email"
              placeholder="ex ) email@google.com"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={(e) => {
                const emailError = validateEmail(e.target.value);
                setErrors({ ...errors, email: emailError });
              }}
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
                onBlur={(e) => {
                  const passwordError = validatePassword(e.target.value);
                  setErrors({ ...errors, password: passwordError });
                }}
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
                value={values.passwordConfirm}
                onChange={(e) =>
                  handleChange("passwordConfirm", e.target.value)
                }
                onBlur={(e) => {
                  const passwordComfirmError = validatePasswordConfirm(
                    values.password,
                    e.target.value
                  );
                  setErrors({
                    ...errors,
                    passwordConfirm: passwordComfirmError,
                  });
                }}
              />
              <S.CenterizeBox>
                <S.EyeBtn onClick={showConfirmPasswordHandler} type="button">
                  {showConfirmPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </S.EyeBtn>
              </S.CenterizeBox>
            </S.PasswordInputWrapper>

            <S.errordiv>
              {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
            </S.errordiv>

            <label htmlFor="nameInput" style={{ color: "var(--darker-gray)" }}>
              * 이름
            </label>

            <S.JoinInput
              id="nameInput"
              type="text"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={(e) => {
                const nameError = validateName(e.target.value);
                setErrors({ ...errors, name: nameError });
              }}
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
                    handleChange("workSmallField", selectedValue)
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
                      value: "마케팅",
                      label: "마케팅",
                    },
                    {
                      value: "기타",
                      label: "기타",
                    },
                  ]}
                />
                <div>{errors.workField && <p>{errors.workField}</p>}</div>

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
                  onFocus={() => {
                    const workFieldError = validateWorkField(values.workField);
                    setErrors({ ...errors, workField: workFieldError });
                  }}
                  onBlur={(e) => {
                    const workSmallFieldError = validateWorkSmallField(
                      e.target.value
                    );
                    setErrors({
                      ...errors,
                      workSmallField: workSmallFieldError,
                    });
                  }}
                />
                <div>
                  {errors.workSmallField && <p>{errors.workSmallField}</p>}
                </div>

                <label
                  htmlFor="workExpInput"
                  style={{ color: "var(--darker-gray)" }}
                >
                  * 경력 / 연차
                </label>
                <S.JoinInput
                  id="workExpInput"
                  type="text"
                  value={values.workExp as number}
                  onChange={(e) =>
                    handleChange(
                      "workExp",
                      e.target.value.replace(/\D/g, "").slice(0, 2)
                    )
                  }
                  onBlur={(e) => {
                    const workExpError = validateWorkExp(
                      Number(e.target.value)
                    );
                    setErrors({ ...errors, workExp: workExpError });
                  }}
                  onWheel={(e) => e.preventDefault()}
                />
                <div>{errors.workExp && <p>{errors.workExp}</p>}</div>
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
              onChange={(e) =>
                handleChange("phone", formatPhoneNumber(e.target.value))
              }
              onBlur={(e) => {
                const phoneError = validatePhone(e.target.value);
                setErrors({ ...errors, phone: phoneError });
              }}
            />
            <div>{errors.phone && <p>{errors.phone}</p>}</div>
            <br />
          </S.InputWrapper>

          <S.JoinButton>
            {role === "client" ? "클라이언트 회원가입" : "프리랜서 회원가입"}
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
