import { Select } from "antd";
import { styled } from "styled-components";

export const S = {
  LogoBox: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 3%;
  `,
  Logo: styled.img`
    width: 440px;
  `,
  UserRoleSelecteTabUL: styled.ul`
    width: 40%;
    display: flex;
    margin-left: 25px;
    border-radius: 20px 20px 0 0;
    border: 1px solid #f0f0f0;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s;
  `,
  UserRoleSelecteTabItemLI: styled.li`
    width: 50%;
    text-align: center;

    .selected {
      background-color: white;
      color: var(--main-blue);
      font-weight: 700;
    }
  `,
  UserRoleSelecteTabItemButton: styled.button`
    width: 100%;
    text-align: center;
    padding: 15px 0;
    border: none;
    color: #cacaca;
    background-color: #f0f0f0;
    font-size: 16px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--hover-blue);
      color: var(--main-blue);
    }
  `,
  JoinBG: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 850px;
    min-width: 850px;
  `,
  Joinfont: styled.h1`
    width: 100%;
    margin: 3% 0;
    text-align: center;
    font-size: 18px;
    color: var(--middle-gray);
  `,
  JoinFormContainer: styled.div`
    width: 100%;
    position: relative;
  `,
  JoinForm: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 15px;
    background-color: white;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
  `,
  JoinInput: styled.input`
    border-radius: 10px;
    background-color: #f0f0f0;
    left: 10%;
    width: 100%;
    padding: 17px 15px;
    outline: none;
    border: none;
    font-size: 12px;
    margin-bottom: 5px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  JoinButton: styled.button`
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: var(--main-blue);
    cursor: pointer;
    color: white;
    width: 100%;
    font-size: 18px;
  `,
  PasswordBox: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  PassswordInputAndEyeButtonWrapper: styled.div`
    margin-bottom: 5px;
    display: flex;
  `,
  PasswordInputWrapper: styled.div`
    display: flex;
    left: 10%;
    width: 49%;
    flex-direction: column;
  `,
  PasswordInput: styled.input`
    border-radius: 10px 0 0 10px;
    background-color: #f0f0f0;
    padding: 17px 15px;
    outline: none;
    border: none;
    font-size: 12px;
    width: 93%;
  `,
  CenterizeBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 5%;

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
    margin: 2px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
    margin-bottom: 5px;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    padding: 5px;
    width: 70%;
  `,
  LoginButton: styled.button`
    border: none;
    background-color: transparent;
    margin-top: 5px;
    padding-top: 10px;
    width: 100%;
  `,
  RealBack: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  PreviewImageWrapper: styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
  `,
  JoinFormContentsWrapper: styled.div`
    display: flex;
    margin-bottom: 10px;
    width: 100%;
  `,
  WorkFieldWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  WorkFieldSelectWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 49%;
  `,
  WorkFieldInputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 49%;
  `,
  WorkFieldSelect: styled(Select)`
    .ant-select-selector {
      height: 48px !important;
      display: flex !important;
      align-items: center !important;
      outline: none !important;
      border-radius: 10px !important;
      font-size: 12px;
      margin-bottom: 5px !important;
    }
  `,
};
