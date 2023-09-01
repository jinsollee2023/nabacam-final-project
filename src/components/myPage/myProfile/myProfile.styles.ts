import { styled } from "styled-components";

interface ColumnBoxProps {
  marginLeft?: string;
}
interface FlexBoxProps {
  marginLeft?: string;
}
interface BtnProps {
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
    font-size: 14px;
    color: var(--middle-gray);
    margin-top: 15px;
    margin-left: ${(props) => props.marginLeft};
    color: ${(props) => props.color || "var(--middle-gray)"};
  `,
  SettingBtn: styled.span`
    cursor: pointer;
    font-size: 20px;
  `,

  // EditForm
  Label: styled.label`
    font-size: 16px;
    margin-bottom: 15px;
  `,
  Input: styled.input`
    width: 100%;
    height: 32px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  `,

  // 공통
  ColumnBox: styled.div<ColumnBoxProps>`
    display: flex;
    flex-direction: column;
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
  RightEndBtnBox: styled.div`
    display: flex;
    margin-left: auto;
    /* margin-top: 25px;
    padding-right: 3%; */
  `,
  Btn: styled.button<BtnProps>`
    background-color: var(--main-blue);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    width: ${(props) => props.width};
    height: ${(props) => props.height || "40px"};
    padding: ${(props) => props.padding};
  `,
};
