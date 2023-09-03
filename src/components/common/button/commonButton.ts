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
  `,
};
