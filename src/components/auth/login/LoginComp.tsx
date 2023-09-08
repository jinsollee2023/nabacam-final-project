import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/store/useUserStore";
import { getUser } from "src/api/User";
import LoginValidation from "./LoginValidation";
import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { S } from "./LoginComp.styles";

interface LoginForm {
  email: string;
  password: string;
}

// values와 erros 초기값 설정
const LoginComp = () => {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };
  const initialErrors: LoginForm = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState<LoginForm>(initialValues);
  const [findPassword, setFindPassword] = useState<boolean>(false);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginForm>(initialErrors);
  const { setUserId, setUserRole, setUser } = useUserStore();

  // errors의 초기에도 확인할수있도록 작동하는 useEffect
  useEffect(() => {
    setErrors(LoginValidation(values));
  }, [values]);

  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(LoginValidation(values));

    // errors 글자가 없을때만 통신해라 라는 조건문
    if (!errors.email && !errors.password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) {
          console.error(error);
          alert("로그인 정보가 일치하지 않습니다.");
        } else if (data) {
          const user = await getUser(data.user.id as string);
          setUserId(user.userId as string);
          setUserRole(user.role as string);
          setUser(user);
          navigate("/home");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  const showPasswordHandler = () => {
    setShowPswd(!showPswd);
  };
  const findPasswordModalHandler = () => {
    setFindPassword(!findPassword);
  };

  return (
    <>
      <S.LoginBG>
        <S.Loginfont>로그인</S.Loginfont>
        <form onSubmit={loginHandler}>
          <S.LoginBack>
            <S.LoginInput
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={values.email}
              onChange={handleChange}
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
        {findPassword && <EmailCheck openModal={findPasswordModalHandler} />}
      </S.LoginBG>
    </>
  );
};

export default LoginComp;
