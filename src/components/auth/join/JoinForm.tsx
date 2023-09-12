import React, { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import PreviewImage from "../../common/PreviewImage";
import { uploadUserImage } from "../../../api/User";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { clientSignupHandler } from "../../../api/auth";
import useValidation from "../../../hooks/useValidation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { S } from "./joinComp.styles";
import { formatPhoneNumber } from "src/components/common/commonFunc";
import { DefaultOptionType } from "antd/es/select";

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
  photoFile: File | null | string;
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
    validateSelect,
    validateWorkSmallField,
    validateWorkExp,
    validatePhone,
  } = useValidation();

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
    const isClientValid =
      role === "client" &&
      submitButtonClicked &&
      errors.email === "" &&
      errors.password === "" &&
      errors.passwordConfirm === "" &&
      errors.name === "" &&
      errors.phone === "";

    const isFreelancerValid =
      role === "freelancer" &&
      submitButtonClicked &&
      errors.email === "" &&
      errors.password === "" &&
      errors.passwordConfirm === "" &&
      errors.name === "" &&
      errors.workField === "" &&
      errors.workSmallField === "" &&
      errors.workExp === "" &&
      errors.phone === "";

    if (isClientValid || isFreelancerValid) {
      signUp();
      setSubmitButtonClicked(false);
    }
    setSubmitButtonClicked(false);
  }, [submitButtonClicked, errors]);

  const validateRegister = () => {
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    const passwordConfirmError = validatePasswordConfirm(
      values.password,
      values.passwordConfirm
    );
    const nameError = validateName(values.name);
    const workFieldError = validateSelect("작업 영역", values.workField);
    const workSmallFieldError = validateWorkSmallField(values.workSmallField);
    const workExpError = validateWorkExp(String(values.workExp));
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
  const handlePhotoURLOnChange = (file: File | string | null) => {
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
        <S.JoinForm onSubmit={signUpButtonHandler}>
          <S.JoinFormContentsWrapper>
            <S.PreviewImageWrapper>
              <PreviewImage
                handlePhotoURLOnChange={handlePhotoURLOnChange}
                defaultImage={JoinDefaultImage}
              />
            </S.PreviewImageWrapper>
            <S.InputWrapper>
              <S.JoinInput
                id="emailInput"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => {
                  const emailError = validateEmail(e.target.value);
                  setErrors({ ...errors, email: emailError });
                }}
              />
              <S.ErrorMessage hasError={!!errors.email}>
                {errors.email && <p>{errors.email}</p>}
              </S.ErrorMessage>
              <S.PasswordBox>
                <S.PasswordInputWrapper>
                  <S.PassswordInputAndEyeBtnWrapper>
                    <S.PasswordInput
                      id="passwordInput"
                      type={showPswd ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요."
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
                  </S.PassswordInputAndEyeBtnWrapper>
                  <S.ErrorMessage hasError={!!errors.password}>
                    {errors.password && <p>{errors.password}</p>}
                  </S.ErrorMessage>
                </S.PasswordInputWrapper>
                <S.PasswordInputWrapper>
                  <S.PassswordInputAndEyeBtnWrapper>
                    <S.PasswordInput
                      id="checkPasswordInput"
                      type={showConfirmPswd ? "text" : "password"}
                      placeholder="비밀번호를 한 번 더 입력해주세요."
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
                      <S.EyeBtn
                        onClick={showConfirmPasswordHandler}
                        type="button"
                      >
                        {showConfirmPswd ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </S.EyeBtn>
                    </S.CenterizeBox>
                  </S.PassswordInputAndEyeBtnWrapper>
                  <S.ErrorMessage hasError={!!errors.passwordConfirm}>
                    {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
                  </S.ErrorMessage>
                </S.PasswordInputWrapper>
              </S.PasswordBox>
              <S.JoinInput
                id="nameInput"
                type="text"
                value={values.name}
                placeholder="이름을 입력해주세요."
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={(e) => {
                  const nameError = validateName(e.target.value);
                  setErrors({ ...errors, name: nameError });
                }}
              />
              <S.ErrorMessage hasError={!!errors.name}>
                {errors.name && <p>{errors.name}</p>}
              </S.ErrorMessage>

              {role === "freelancer" && (
                <>
                  <S.WorkFieldWrapper>
                    <S.WorkFieldSelectWrapper>
                      <S.WorkFieldSelect
                        id="workFieldInput"
                        placeholder="작업 영역을 선택 해주세요."
                        optionFilterProp="children"
                        onChange={(value, _) =>
                          handleChange("workSmallField", value as string)
                        }
                        onBlur={() => {
                          const workFieldError = validateSelect(
                            "작업 영역",
                            values.workField
                          );
                          setErrors({ ...errors, workField: workFieldError });
                        }}
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
                      <S.ErrorMessage hasError={!!errors.workField}>
                        {errors.workField && <p>{errors.workField}</p>}
                      </S.ErrorMessage>
                    </S.WorkFieldSelectWrapper>
                    <S.WorkFieldInputWrapper>
                      <S.JoinInput
                        id="workSmallFieldInput"
                        type="text"
                        value={values.workField}
                        placeholder="상세한 작업 영역을 입력해주세요."
                        onChange={(e) =>
                          handleChange("workField", e.target.value)
                        }
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
                      <S.ErrorMessage hasError={!!errors.workSmallField}>
                        {errors.workSmallField && (
                          <p>{errors.workSmallField}</p>
                        )}
                      </S.ErrorMessage>
                    </S.WorkFieldInputWrapper>
                  </S.WorkFieldWrapper>
                  <S.JoinInput
                    id="workExpInput"
                    type="text"
                    placeholder="경력 / 연차를 입력해주세요."
                    value={values.workExp as number}
                    onChange={(e) =>
                      handleChange(
                        "workExp",
                        e.target.value.replace(/\D/g, "").slice(0, 2)
                      )
                    }
                    onBlur={(e) => {
                      const workExpError = validateWorkExp(e.target.value);
                      setErrors({ ...errors, workExp: workExpError });
                    }}
                    onWheel={(e) => e.preventDefault()}
                  />
                  <S.ErrorMessage hasError={!!errors.workExp}>
                    {errors.workExp && <p>{errors.workExp}</p>}
                  </S.ErrorMessage>
                </>
              )}
              <S.JoinInput
                id="phoneNumberInput"
                type="text"
                placeholder="전화번호를 입력해주세요."
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
              <br />
            </S.InputWrapper>
          </S.JoinFormContentsWrapper>
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
