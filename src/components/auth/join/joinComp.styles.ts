import { Tabs } from "antd";
import { styled } from "styled-components";

export const S = {
  JoinCompContainer: styled.div`
    width: 90vw;
    height: 100vh;
  `,
  tabsContainer: styled.div`
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    font-size: 18px;
    margin-top: 40%;
    margin-bottom: 40%;
  `,
  Tabs: styled(Tabs)`
    position: relative;
    height: 90vh;
  `,
  TabsBack: styled.div`
    height: 80vh;
    width: 70%;
    display: flex;
    align-items: center;
    position: absolute;
    border: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  JoinFormContainer: styled.div`
    width: 54vw;
    position: relative;
  `,
  JoinForm: styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  JoinInput: styled.input`
    border: none;
    border-bottom: 1px solid var(--lighter-gray);
    left: 10%;
    width: 400px;
    padding: 10px;
    outline: none;
    font-size: 12px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  JoinButton: styled.button`
    width: 417px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background-color: var(--main-blue);
    cursor: pointer;
    color: white;
  `,
  PasswordInputWrapper: styled.div`
    display: flex;
    height: 40%;
    left: 10%;
    width: 400px;
  `,
  PasswordInput: styled.input`
    border: none;
    border-bottom: 1px solid var(--lighter-gray);
    padding: 10px;
    outline: none;
    font-size: 12px;

    width: 93%;
  `,
  CenterizeBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 7%;
    border-bottom: 1px solid var(--lighter-gray);
  `,
  EyeBtn: styled.button`
    border: none;
    background-color: transparent;
  `,

  errordiv: styled.div`
    height: 20px;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  LoginButton: styled.button`
    border: none;
    background-color: transparent;
    margin: 10px 0 30px 0;
  `,
};
