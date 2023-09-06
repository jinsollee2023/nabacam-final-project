import { styled } from "styled-components";

export const S = {
  LoginInput: styled.input`
    align-items: center;
    width: 100%;
    height: 40%;
    border-radius: 10px;
    background-color: #dbcfcf;
  `,
  LoginBack: styled.div`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
  `,
  Loginfont: styled.h1`
    width: 100%;
    height: 48px;
    margin-bottom: 5%;
    text-align: center;
    font-weight: 284px;
    font-size: 48px;
  `,
  LoginButton: styled.button`
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
  LoginBG: styled.div`
    position: relative;
    top: 20%;
    left: 45%;

    width: 40%;
    height: 50%;
    border-radius: 10px;
  `,
  passwordView: styled.button`
    position: relative;
    top: -41.5%;
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
  passwordFindButton: styled.button`
    width: 100%;
    height: 43px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: white;
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
    background-color: #dbcfcf;
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
    background-color: #dbcfcf;
  `,
  EyeBtn: styled.button`
    border: none;
    background-color: transparent;
  `,
};
