import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/zustand/useUserStore";
import { getUser } from "src/api/User";

import LoginValidation from "./LoginValidation";
import { Tabs } from "antd";
import { styled } from "styled-components";
import EmailCheck from "../resetpassword/EmailCheck";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { CommonS } from "src/components/common/button/commonButton";

type TabPosition = "left" | "right" | "top" | "bottom";

interface LoginForm {
  email: string;
  password: string;
}

const LoginComp = () => {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  // const { email, setUserEmail } = useUserStore();
  const [values, setValues] = useState<any>(initialValues);
  const [findPassword, setFindPassword] = useState(false);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>("");
  const { setUserId, setUserRole, setUser } = useUserStore();

  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setErrors(LoginValidation(values));
    if (!errors.email && !errors.password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) {
          console.error(error);
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
            />
            <S.errordiv>{errors.email && <p>{errors.email}</p>}</S.errordiv>
            <S.PasswordInputWrapper>
              <S.PasswordInput
                type={showPswd ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요."
              />
              <S.CenterizeBox>
                <S.EyeBtn onClick={showPasswordHandler}>
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

const S = {
  LoginInput: styled.input`
    align-items: center;
    width: 100%;
    height: 40%;
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 0 10px;
    outline: none;
    border: none;
  `,
  LoginBack: styled.div`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
  `,
  Loginfont: styled.h1`
    width: 100%;
    margin-bottom: 5%;
    text-align: center;
    font-weight: 284px;
    font-size: 40px;
  `,
  LoginButton: styled.button`
    width: 100%;
    height: 50px;
    margin-top: 10%;
    border-radius: 10px;
    font-weight: 62px;
    font-size: 20px;
    background-color: var(--main-blue);
    border: none;
    color: white;
    cursor: pointer;
  `,
  LoginBG: styled.div`
    position: relative;
    top: 20%;
    left: 45%;
    width: 40%;
    height: 50%;
    border-radius: 10px;
  `,
  PasswordInputWrapper: styled.div`
    display: flex;
    height: 40%;
  `,
  PasswordInput: styled.input`
    border: none;
    width: 93%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #f0f0f0;
    padding: 0 10px;
    outline: none;
  `,
  CenterizeBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 7%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #f0f0f0;
  `,
  EyeBtn: styled.button`
    border: none;
    background-color: transparent;
  `,

  errordiv: styled.div`
    height: 20px;
  `,
  passwordFindButton: styled.button`
    width: 100%;
    height: 43px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: white;
  `,
};
