import { styled } from "styled-components";

interface commonBtnProps {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  height?: string;
  padding?: string;
  backgroundColor?: string;
}

interface ColumnBoxProps {
  marginLeft?: string;
}
interface FlexBoxProps {
  marginLeft?: string;
  marginTop?: string;
}
interface CenterizeBoxProps {
  marginTop?: string;
  marginBottom?: string;
}

export const CommonS = {
  CommonBtn: styled.button<commonBtnProps>`
    background-color: ${(props) => props.backgroundColor || "var(--main-blue)"};
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "50px"};
    padding: ${(props) => props.padding || "10px"};
    border: none;
    border-radius: 8px;

    margin-bottom: ${(props) => props.marginBottom};
    margin-top: ${(props) => props.marginTop || "30px"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};

    display: flex;
    align-items: center;
    justify-content: center;
  `,
  /** 사이에 아이콘 */
  CommonSpan: styled.span`
    font-size: 15px;
    color: white;
    display: flex;
    align-items: center;
  `,

  ColumnBox: styled.div<ColumnBoxProps>`
    display: flex;
    flex-direction: column;
    margin-left: ${(props) => props.marginLeft};
  `,
  FlexBox: styled.div<FlexBoxProps>`
    display: flex;
    margin-left: ${(props) => props.marginLeft};
    margin-top: ${(props) => props.marginTop};
  `,
  CenterizeBox: styled.div<CenterizeBoxProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
  `,
  JustifyBox: styled.div`
    display: flex;
    align-items: center;
  `,
  RightEndBtnBox: styled.div`
    display: flex;
    margin-left: auto;
  `,
  RightEndBox: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  toastinfo: styled.div`
    text-align: center;
    height: 65px;
  `,
  toastintoText: styled.p`
    text-align: center;
    margin-right: 25px;
    font-size: 17px;
  `,
  toastOkButton: styled.button`
    height: 30px;
    width: 100px;
    border-radius: 15px;
    border-style: none;
    margin-right: 5%;
    display: inline-block;
    background-color: var(--main-blue);
    color: white;
    font-size: 15px;
  `,
  toastNoButton: styled.button`
    margin-top: 6.5%;
    margin-right: 8%;
    height: 30px;
    width: 100px;
    display: inline-block;
    border-radius: 15px;
    border: none;
    background-color: #ebebeb;
    color: black;
    stroke: #ebebeb;
    font-size: 15px;
  `,
};
