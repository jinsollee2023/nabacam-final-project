import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/store/useUserStore";
import { getUser } from "src/api/User";
import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { S } from "./LoginComp.styles";
import { toast } from "react-toastify";
import useValidation from "../../../hooks/useValidation";

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
  window.history.forward();
  const { validateEmail, validatePassword } = Validation();

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
      toast.error("로그인 정보가 일치하지 않습니다.");
    } else if (data) {
      toast.success("로그인에 성공하였습니다.");
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

  return (
    <>
      <S.LoginBG>
        <S.Loginfont>로그인</S.Loginfont>
        <form onSubmit={loginButtonHandler}>
          <S.LoginBack>
            <S.LoginInput
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={values.email}
              onChange={handleChange}
              onBlur={(e) => {
                const emailError = validateEmail(e.target.value);
                setErrors({ ...errors, email: emailError });
              }}
              autoComplete="on"
            />
            <S.errordiv>{errors.email && <p>{errors.email}</p>}</S.errordiv>
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
                <S.EyeBtn type="button" onClick={showPasswordHandler}>
                  {showPswd ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </S.EyeBtn>
              </S.CenterizeBox>
            </S.PasswordInputWrapper>

            <div>{errors.password && <p>{errors.password}</p>}</div>
          </S.LoginBack>

          <S.LoginButton>로그인</S.LoginButton>
        </form>
        <S.passwordFindButton onClick={findPasswordModalHandler}>
          비밀번호 찾기
        </S.passwordFindButton>
        <S.passwordFindButton onClick={() => navigate("/register")}>
          회원가입 하기
        </S.passwordFindButton>
        {findPasswordModalOpen && (
          <EmailCheck openModal={findPasswordModalHandler} />
        )}
      </S.LoginBG>
    </>
  );
};

export default LoginComp;
