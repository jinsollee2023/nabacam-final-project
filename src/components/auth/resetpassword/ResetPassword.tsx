import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";
import Validation from "../join/Validation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

interface initialValuesForm {
  password: string;
  passwordConfirm: string;
}

interface initialErrorsForm {
  password: string | null;
  passwordConfirm: string | null;
}

// 패스워드 변경 로직

const ResetPassword = () => {
  // validation check의 erros form 과 맞추기 위해 넣었음
  const initialValues: initialValuesForm = {
    password: "",
    passwordConfirm: "",
  };

  const initialErrors: initialErrorsForm = {
    password: null,
    passwordConfirm: null,
  };

  const navigate = useNavigate();
  const [values, setValues] = useState<initialValuesForm>(initialValues);
  const [errors, setErrors] = useState<initialErrorsForm>(initialErrors);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const { validatePassword, validatePasswordConfirm } = Validation();
  // errors 바로확인하고 validation 체크 후 진행하게해주기위해 useEffect 사용

  useEffect(() => {
    if (
      submitButtonClicked &&
      errors.password === "" &&
      errors.passwordConfirm === ""
    ) {
      updatePassword();
    } else setSubmitButtonClicked(false);
  }, [errors, submitButtonClicked]);

  //  password 업데이트 하는 로직
  const updatePassword = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: values.password as string,
      });
      if (!error) {
        toast.success("비밀번호가 성공적으로 바뀌었습니다.");
        navigate("/");
      }
      if (error) {
        error.message ===
          "New password should be different from the old password." &&
          toast.error("이전 비밀번호와 다른 비밀번호로 입력해주세요.");
        setSubmitButtonClicked(false);
      }
    } catch (error) {
      console.log("resetPassword.tsx - updatePassword", error);
    }
  };

  //  password 업데이트 버튼 클릭시 실행되는 로직
  const updatePasswordButtonHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const passwordError = validatePassword(values.password);
    const passwordConfirmError = validatePasswordConfirm(
      values.password,
      values.passwordConfirm
    );
    setErrors({
      password: passwordError,
      passwordConfirm: passwordConfirmError,
    });
    setSubmitButtonClicked(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const showPasswordHandler = () => {
    setShowPswd(!showPswd);
  };

  return (
    <S.PasswordBG>
      <S.Passwordfont>비밀번호 변경</S.Passwordfont>
      <form onSubmit={(e) => updatePasswordButtonHandler(e)}>
        <S.PasswordBack>
          <S.PasswordInput
            name="password"
            type={showPswd ? "text" : "password"}
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
            onBlur={(e) => {
              const passwordError = validatePassword(e.target.value);
              setErrors({ ...errors, password: passwordError });
            }}
          />
          <S.errordiv>{errors.password && <p>{errors.password}</p>}</S.errordiv>
          <S.PasswordInput
            name="passwordConfirm"
            type={showPswd ? "text" : "password"}
            placeholder="비밀번호확인"
            value={values.passwordConfirm}
            onChange={handleChange}
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
          <S.errordiv>
            {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
          </S.errordiv>
        </S.PasswordBack>

        <S.PasswordButton>비밀번호변경</S.PasswordButton>
      </form>
      <S.passwordView onClick={showPasswordHandler}>
        {showPswd ? (
          <EyeOutlined onClick={showPasswordHandler} />
        ) : (
          <EyeInvisibleOutlined />
        )}
      </S.passwordView>
    </S.PasswordBG>
  );
};

export default ResetPassword;

const S = {
  PasswordInput: styled.input`
    align-items: center;
    width: 100%;
    height: 40%;
    border-radius: 10px;
    background-color: #dbcfcf;
  `,
  PasswordBack: styled.div`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
  `,
  Passwordfont: styled.h1`
    width: 100%;
    height: 48px;
    margin-bottom: 5%;
    text-align: center;
    font-weight: 284px;
    font-size: 48px;
  `,
  PasswordButton: styled.button`
    width: 80%;
    height: 50px;
    margin-left: 10%;
    margin-top: 15%;
    border-radius: 10px;
    font-weight: 62px;
    font-size: 28px;
    background-color: black;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 2px gray;
  `,
  PasswordBG: styled.div`
    position: relative;
    top: 20%;
    left: 45%;

    width: 40%;
    height: 50%;
    border-radius: 10px;
  `,
  passwordView: styled.button`
    position: relative;
    top: -36%;
    left: 94%;
    width: 5%;
    height: 5%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 10px;
  `,

  errordiv: styled.div`
    height: 20px;
  `,
};
