import { styled } from "styled-components";

interface BoxProps {
  width?: string;
  height?: string;
  margin?: string;
  backGroundColor?: string;
  flexDirection?: string;
  padding?: string;
  alignItems?: string;
  justifyContent?: string;
}

interface PontProps {
  textAlign?: string;
  fontWeight?: string;
  marginBottom?: string;
}

interface BallonProps {
  left?: string;
  right?: string;
  borderLeft: string;
  borderRight: string;
}

interface SignButtonProps {
  backGroundColor: string;
  color: string;
  border: string;
}

export const S = {
  MainTitle: styled.p`
    font-size: 35px;
    font-weight: 900;
    color: var(--main-blue);
  `,
  MainDesc: styled.p`
    font-size: 17px;
    line-height: 25px;
  `,
  SignButtonContainer: styled.div`
    height: 70px;
    display: flex;
    justify-content: end;
    align-items: center;
  `,
  SignButton: styled.button<SignButtonProps>`
    width: 7%;
    height: 35px;
    margin-left: 1%;
    border: ${(props) => props.border};
    border-radius: 10px;
    background-color: ${(props) => props.backGroundColor};
    color: ${(props) => props.color};
    cursor: pointer;
  `,
  IntroContainer: styled.div`
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  TitleContainer: styled.div`
    width: 65%;
    padding: 1% 0;
  `,
  MainTitleBox: styled.div`
    margin: 2% 0;
    text-align: center;
  `,
  SubTitleBox: styled.div`
    margin: 2% 0;
    text-align: center;
  `,
  InfomationContainer: styled.div`
    padding: 7% 0 10% 0;
  `,

  MenuTitle: styled.p`
    font-size: 27px;
    font-weight: 600;
  `,
  MenuDesc: styled.p<PontProps>`
    font-size: 18px;
    font-weight: 400;
    text-align: ${(props) => (props.textAlign ? props.textAlign : null)};
  `,
  TabTitle: styled.p<PontProps>`
    font-size: 20px;
    font-weight: 600;
    text-align: ${(props) => (props.textAlign ? props.textAlign : null)};
  `,
  TabDesc: styled.p<PontProps>`
    font-size: 15px;
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : null)};
    text-align: ${(props) => (props.textAlign ? props.textAlign : null)};
    margin-bottom: ${(props) =>
      props.marginBottom ? props.marginBottom : null};
  `,
  MenuTitleBox: styled.div<BoxProps>`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "190px")};
    margin: ${(props) => (props.margin ? props.margin : "20px 0")};
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px #bebebe dashed;
    border-radius: 10px;
    justify-content: center;
  `,
  MenuContentsInnerBox: styled.div<BoxProps>`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "400px")};
    margin: ${(props) => (props.margin ? props.margin : "0")};
    padding: ${(props) => (props.padding ? props.padding : "0")};
    display: flex;
    flex-direction: ${(props) =>
      props.flexDirection ? props.flexDirection : "row"};
    align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
    justify-content: ${(props) =>
      props.justifyContent ? props.justifyContent : "center"};
    background: linear-gradient(to right, #cbcbcb, #b5b5b5);
    border-radius: 10px;
  `,
  MenuContentsBox: styled.div`
    width: 48%;
    margin: 1%;
  `,
  TabContentsBox: styled.div<BoxProps>`
    width: ${(props) => (props.width ? props.width : null)};
    height: ${(props) => (props.height ? props.height : "100px")};
    margin: ${(props) => (props.margin ? props.margin : "20px 0")};
    background-color: ${(props) =>
      props.backGroundColor ? props.backGroundColor : null};
  `,
  ProjectTabContentsBox: styled.div<BoxProps>`
    background-color: white;
    width: ${(props) => (props.width ? props.width : null)};
    height: ${(props) => (props.height ? props.height : "100px")};
    margin: 5px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  MenuContainer: styled.div`
    display: flex;
  `,
  BalloonContainer: styled.div`
    position: relative;
    width: 400px;
    height: 100px;
    padding: 10px;
    background-color: white;
    color: black;
    border-radius: 10px;
    margin: 20px;
  `,

  BalloonTail: styled.div<BallonProps>`
    position: absolute;
    bottom: -18px;
    right: ${(props) => (props.right ? props.right : null)};
    left: ${(props) => (props.left ? props.left : null)};
    width: 0;
    height: 0;
    border-left: ${(props) => props.borderLeft} solid transparent;
    border-right: ${(props) => props.borderRight} solid transparent;
    border-top: 30px solid white;
  `,
  OutroBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  OutroButton: styled.div`
    width: 20%;
    height: 60px;
    margin-top: 30px;
    background-color: #0086d0;
    color: white;
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};
