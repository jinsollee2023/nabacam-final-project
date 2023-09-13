import { styled } from "styled-components";

interface ColumnBoxProps {
  marginLeft?: string;
}
interface FlexBoxProps {
  marginLeft?: string;
}
interface ButtonProps {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  height?: string;
  padding?: string;
}
interface DetailProps {
  marginLeft?: string;
  color?: string;
}

export const S = {
  // Account
  AccountContainer: styled.section`
    display: flex;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
  `,
  Img: styled.img`
    margin-left: 5px;
    width: 120px;
    height: 120px;
    border-radius: 5px;
  `,
  Title: styled.p`
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: bold;
  `,
  Detail: styled.p<DetailProps>`
    font-size: 16px;
    color: var(--middle-gray);
    margin-top: 15px;
    margin-left: ${(props) => props.marginLeft};
    color: ${(props) => props.color || "var(--middle-gray)"};
    display: flex;
  `,
  SettingButton: styled.span`
    cursor: pointer;
    margin-left: 5px;
    height: 25px;
    transition: 0.3s ease-in-out;

    &:hover {
      transform: rotate(60deg);
    }
  `,

  // EditForm
  Label: styled.label`
    color: #595959;
  `,
  Input: styled.input`
    width: 100%;
    height: 32px;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
  `,
  ErrorMessage: styled.div<{ hasError: boolean }>`
    height: ${(props) => (props.hasError ? "20px" : "0")};
    margin: 2px 0 5px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
  `,
  EditForm: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  WriteBox: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: start;
  `,

  // 공통
  ColumnBox: styled.div<ColumnBoxProps>`
    display: flex;
    flex-direction: column;
    width: 280px;
    min-width: 170px;
    margin-left: ${(props) => props.marginLeft};
  `,
  FlexBox: styled.div<FlexBoxProps>`
    display: flex;
    margin-left: ${(props) => props.marginLeft};
  `,
  CenterizeBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  JustifyBox: styled.div`
    display: flex;
    align-items: center;
  `,
  RightEndButtonBox: styled.div`
    display: flex;
    margin-left: auto;
  `,
  Button: styled.button<ButtonProps>`
    width: ${(props) => props.width};
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
    background-color: #0086d0;
    color: white;
  `,
  UnMemberButton: styled.button<ButtonProps>`
    width: ${(props) => props.width};
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
  `,
};
