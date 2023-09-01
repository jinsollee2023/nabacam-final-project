import React, { useState } from "react";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";

const EmailCheck = ({ openModal }: any) => {
  const [email, setEmail] = useState("");

  const EmailCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/resetPassword",
      });
      console.log(data);
      if (!error) {
        alert("입력한 이메일을 확인해주세요");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const emailOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <S.passwordModalBox>
        <S.passwordModalContents>
          <form onSubmit={(e) => EmailCheck(e)}>
            <S.H1>비밀번호 찾기</S.H1>
            <br />

            <S.emailInput
              type="email"
              placeholder="이메일 입력해주세요"
              value={email}
              onChange={emailOnChange}
            />
            <br />
            <br />
            <br />

            <S.emailButton>이메일 입력</S.emailButton>
            <S.xButton onClick={openModal}>x</S.xButton>
          </form>
        </S.passwordModalContents>
      </S.passwordModalBox>
    </div>
  );
};

export default EmailCheck;

const S = {
  passwordModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  passwordModalContents: styled.div`
    position: absolute;
    background-color: #fff;
    padding: 20px;
    width: 22%;
    height: 22%;
    border-radius: 12px;
  `,
  emailInput: styled.input`
    position: absolute;
    top: 25%;
    border: 1px solid black;
    width: 90%;
    height: 19%;
    border-radius: 10px;
  `,
  emailButton: styled.button`
    position: absolute;
    top: 60%;
    width: 90%;
    height: 19%;
    border-radius: 10px;
    background-color: black;
    color: white;
    cursor: pointer;
  `,
  H1: styled.h1`
    position: absolute;
    top: 5%;
    left: 15%;
    width: 320px;
    text-align: center;
    border-radius: 10px;

    cursor: pointer;
  `,
  xButton: styled.button`
    position: absolute;
    top: 0px;
    left: 90%;
    width: 15px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background-color: white;

    cursor: pointer;
  `,
};
