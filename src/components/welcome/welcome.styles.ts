import { styled } from "styled-components";

interface BoxProps {
  width?: string;
  height?: string;
  margin?: string;
  $backGroundColor?: string;
  $flexDirection?: string;
  padding?: string;
  $alignItems?: string;
  $justifyContent?: string;
}

interface PontProps {
  $textAlign?: string;
  $fontWeight?: string;
  $marginBottom?: string;
  $marginTop?: string;
  color?: string;
}

interface BallonProps {
  left?: string;
  right?: string;
  $borderLeft: string;
  $borderRight: string;
}

interface SignButtonProps {
  $backGroundColor: string;
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
    width: 60px;
    height: 35px;
    margin-left: 10px;
    border: ${(props) => props.border};
    border-radius: 10px;
    background-color: ${(props) => props.$backGroundColor};
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
    min-width: 980px;
  `,

  MenuTitle: styled.p`
    font-size: 27px;
    font-weight: 600;
    margin-bottom: 20px;
  `,
  MenuDesc: styled.p<PontProps>`
    font-size: 18px;
    font-weight: 400;
    text-align: ${(props) => (props.$textAlign ? props.$textAlign : null)};
  `,
  TabTitle: styled.p<PontProps>`
    font-size: 20px;
    font-weight: 600;
    text-align: ${(props) => (props.$textAlign ? props.$textAlign : null)};
    margin-bottom: 10px;
  `,
  TabDesc: styled.p<PontProps>`
    font-size: 15px;
    font-weight: ${(props) => (props.$fontWeight ? props.$fontWeight : 500)};
    color: ${(props) => (props.color ? props.color : "black")};
    text-align: ${(props) => (props.$textAlign ? props.$textAlign : null)};
    margin-bottom: ${(props) =>
      props.$marginBottom ? props.$marginBottom : null};
    margin-top: ${(props) => (props.$marginTop ? props.$marginTop : null)};
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
      props.$flexDirection ? props.$flexDirection : "row"};
    align-items: ${(props) =>
      props.$alignItems ? props.$alignItems : "center"};
    justify-content: ${(props) =>
      props.$justifyContent ? props.$justifyContent : "center"};
    background: linear-gradient(
      270deg,
      rgba(203, 203, 203, 0.45) 0%,
      rgba(181, 181, 181, 0.17) 103.03%
    );
    border-radius: 10px;
    overflow: hidden;
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
      props.$backGroundColor ? props.$backGroundColor : null};
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
    min-width: 400px;
    height: 100px;
    padding: 10px;
    background-color: white;
    color: black;
    border-radius: 10px;
    margin: 20px;
  `,

  AlarmBallonContainer: styled.div`
    position: relative;
    width: 440px;
    height: 110px;
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
    border-left: ${(props) => props.$borderLeft} solid transparent;
    border-right: ${(props) => props.$borderRight} solid transparent;
    border-top: 30px solid white;
  `,
  OutroBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  OutroButton: styled.button`
    min-width: 300px;
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
    font-size: 18px;
  `,

  ProjectNavigationAndFreelancerMarketImageWrapper: styled.div`
    width: 100%;
    height: 350px;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      object-fit: cover;
    }
  `,

  ProjectManagementImageWrapper: styled.div`
    height: 247px;
    width: 95%;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  `,

  ResumeImage: styled.img`
    border-radius: 5px;
    margin: 10px 0 20px 0;
  `,

  ContractTerminationAndProjectListAndMemberImage: styled.img`
    border-radius: 5px;
    margin-top: 20px;
  `,

  PortfolioBox: styled.div`
    width: 100%;
    height: 100%;
    padding: 5% 0 0 5%;
    position: relative;
    overflow: hidden;
  `,

  PortfolioImage: styled.img`
    border-radius: 5px;
    position: absolute;
    height: 200px;
    top: 60%;
    left: 100px;
  `,

  ChatImageWrapper: styled.div`
    border-radius: 5px;
    height: 407px;
    width: 95%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  `,

  ClientMyPageRightBoxTextWrapper: styled.div`
    padding: 3% 0 0 3%;
  `,
  FreelancerCardImageWrapper: styled.div`
    width: 120%;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    overflow: hidden;

    img {
      margin-left: -120px;
      width: 100%;
      object-fit: cover;
    }
  `,
};
