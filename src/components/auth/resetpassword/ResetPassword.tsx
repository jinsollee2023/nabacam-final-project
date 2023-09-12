import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import useValidation from "../../../hooks/useValidation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { S } from "./resetPassword.styles";
import WaveEffect from "src/components/common/waveEffect/WaveEffect";

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
  const { validatePassword, validatePasswordConfirm } = useValidation();
  const logoURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/workwave/workwave.png";

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
    <>
      <S.RealBack>
        <S.PasswordBG>
          <S.LogoBox>
            <S.Logo src={logoURL} alt="logo" />
          </S.LogoBox>
          <S.Passwordfont>
            새롭게 설정 할 비밀번호를 입력해주세요.
          </S.Passwordfont>
          <S.ChangePasswordCard>
            <form onSubmit={(e) => updatePasswordButtonHandler(e)}>
              <S.PasswordBack>
                <S.PasswordInputWrapper>
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
                  <S.CenterizeBox>
                    <S.EyeBtn type="button" onClick={showPasswordHandler}>
                      {showPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </S.EyeBtn>
                  </S.CenterizeBox>
                </S.PasswordInputWrapper>
                <S.ErrorMessage hasError={!!errors.password}>
                  {errors.password && <p>{errors.password}</p>}
                </S.ErrorMessage>
                <S.PasswordInputWrapper>
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
                  <S.CenterizeBox>
                    <S.EyeBtn type="button" onClick={showPasswordHandler}>
                      {showPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </S.EyeBtn>
                  </S.CenterizeBox>
                </S.PasswordInputWrapper>
                <S.ErrorMessage hasError={!!errors.passwordConfirm}>
                  {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
                </S.ErrorMessage>
              </S.PasswordBack>

              <S.ChangePasswordButton>비밀번호 변경</S.ChangePasswordButton>
            </form>
          </S.ChangePasswordCard>
        </S.PasswordBG>
        <WaveEffect />
      </S.RealBack>
    </>
  );
};

export default ResetPassword;
