import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/store/useUserStore";
import { getUser } from "src/api/User";
import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { S } from "./LoginComp.styles";
import { ToastContainer, toast } from "react-toastify";
import useValidation from "../../../hooks/useValidation";
import WaveEffect from "src/components/common/waveEffect/WaveEffect";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrorForm {
  email: string | null;
  password: string | null;
}

const LoginComp = () => {
  // values와 erros 초기값 설정
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };
  const initialErrors: LoginErrorForm = {
    email: null,
    password: null,
  };

  const [values, setValues] = useState<LoginForm>(initialValues);
  const [findPasswordModalOpen, setFindPasswordModalOpen] = useState(false);
  const [showPswd, setShowPswd] = useState(false);
  const [errors, setErrors] = useState<LoginErrorForm>(initialErrors);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const { setUserId, setUserRole, setUser } = useUserStore();
  const { validateEmail, validatePassword } = useValidation();
  const logoURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/workwave/workwave.png";
  window.history.forward();

  // errors의 초기에도 확인할수있도록 작동하는 useEffect
  useEffect(() => {
    if (submitButtonClicked && errors.email === "" && errors.password === "") {
      login();
    } else setSubmitButtonClicked(false);
  }, [errors, submitButtonClicked]);

  const navigate = useNavigate();

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.error(error.message);
      toast.dismiss();
      toast.error("로그인 정보가 일치하지 않습니다.", {});
    } else if (data) {
      toast.success("로그인에 성공하였습니다.", {});
      const user = await getUser(data.user.id as string);
      setUserId(user.userId as string);
      setUserRole(user.role as string);
      setUser(user);
      navigate("/home");
    }
  };

  const loginButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    setErrors({
      email: emailError,
      password: passwordError,
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
  const findPasswordModalHandler = () => {
    setFindPasswordModalOpen(!findPasswordModalOpen);
  };

  const emailInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, []);

  return (
    <>
      <S.RealBack>
        <S.LoginBG>
          <S.LogoBox>
            <S.Logo src={logoURL} alt="logo" />
          </S.LogoBox>
          <S.Loginfont>서비스 이용을 위해 로그인 해주세요.</S.Loginfont>
          <S.LoginCard>
            <form onSubmit={loginButtonHandler}>
              <S.LoginBack>
                <S.LoginInput
                  type="email"
                  name="email"
                  ref={emailInput}
                  placeholder="이메일을 입력해주세요."
                  value={values.email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const emailError = validateEmail(e.target.value);
                    setErrors({ ...errors, email: emailError });
                  }}
                  autoComplete="on"
                />
                <S.ErrorMessage hasError={!!errors.email}>
                  {errors.email && <p>{errors.email}</p>}
                </S.ErrorMessage>
                <S.PasswordInputWrapper>
                  <S.PasswordInput
                    type={showPswd ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요."
                    onBlur={(e) => {
                      const passwordError = validatePassword(e.target.value);
                      setErrors({ ...errors, password: passwordError });
                    }}
                    autoComplete="on"
                  />
                  <S.CenterizeBox>
                    <S.EyeButton type="button" onClick={showPasswordHandler}>
                      {showPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </S.EyeButton>
                  </S.CenterizeBox>
                </S.PasswordInputWrapper>

                <S.ErrorMessage hasError={!!errors.password}>
                  {errors.password && <p>{errors.password}</p>}
                </S.ErrorMessage>
              </S.LoginBack>

              <S.LoginButton>로그인</S.LoginButton>
            </form>
            <div>
              <S.passwordFindButton onClick={findPasswordModalHandler}>
                비밀번호 찾기
              </S.passwordFindButton>
              <S.passwordFindButton onClick={() => navigate("/register")}>
                회원가입 하기
              </S.passwordFindButton>
            </div>
          </S.LoginCard>
        </S.LoginBG>
        <WaveEffect />
        {findPasswordModalOpen && (
          <EmailCheck openModal={findPasswordModalHandler} />
        )}
      </S.RealBack>
    </>
  );
};

export default LoginComp;
