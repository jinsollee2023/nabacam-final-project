import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";
import Validation from "../join/Validation";
import { validate } from "uuid";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const ResetPassword = () => {
  const initialValues: any = {
    password: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [showPswd, setShowPswd] = useState<boolean>(false);

  const updatePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (!errors.password && !errors.passwordConfirmCurrent) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: values.password,
        });
        if (data) {
          alert("비밀번호가 성공적으로 바뀌었습니다.");
          setValues("");
          navigate("/");
        }
      } catch (error) {
        alert("비밀번호 변경에 오류가 생겼습니다");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    setErrors(Validation(values));
  };
  const showPasswordHandler = () => {
    setShowPswd(!showPswd);
  };

  return (
    <S.PasswordBG>
      <S.Passwordfont>비밀번호 변경</S.Passwordfont>
      <form onSubmit={(e) => updatePasswordHandler(e)}>
        <S.PasswordBack>
          <S.PasswordInput
            name="password"
            type={showPswd ? "text" : "password"}
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          <S.errordiv>{errors.password && <p>{errors.password}</p>}</S.errordiv>
          <S.PasswordInput
            name="passwordConfirmCurrent"
            type={showPswd ? "text" : "password"}
            placeholder="비밀번호확인"
            value={values.passwordConfirmCurrent}
            onChange={handleChange}
          />
          <S.errordiv>
            {errors.passwordConfirmCurrent && (
              <p>{errors.passwordConfirmCurrent}</p>
            )}
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
    background-color: #dbcfcf;
    border: none;
    cursor: pointer;
    border-radius: 10px;
  `,

  errordiv: styled.div`
    height: 20px;
  `,
};
