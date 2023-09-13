import styled from "styled-components";

export const S = {
  LogoBox: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
  `,
  Logo: styled.img`
    width: 440px;
  `,
  PasswordInput: styled.input`
    border: none;
    width: 93%;
    border-radius: 10px 0 0 10px;
    background-color: #f0f0f0;
    padding: 17px 15px;
    outline: none;
  `,
  PasswordBack: styled.div`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    margin-bottom: 20px;
  `,
  Passwordfont: styled.h1`
    width: 100%;
    margin: 5% 0;
    text-align: center;
    font-size: 20px;
    color: var(--middle-gray);
  `,
  ChangePasswordButton: styled.button`
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
    background-color: var(--main-blue);
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 17px;
  `,
  PasswordBG: styled.div`
    position: relative;
    top: 40%;
    left: 50%;
    width: 550px;
    min-width: 550px;
    height: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
  `,
  PasswordInputWrapper: styled.div`
    display: flex;
    height: 40%;
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
  EyeButton: styled.button`
    border: none;
    background-color: transparent;
  `,

  ErrorMessage: styled.div<{ hasError: boolean }>`
    height: ${(props) => (props.hasError ? "20px" : "0")};
    margin: 10px 0 20px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
  `,

  RealBack: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,

  ChangePasswordCard: styled.div`
    margin-top: 50px;
    width: 100%;
    padding: 30px 15px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  `,
};
