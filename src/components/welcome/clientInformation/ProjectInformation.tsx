import React from "react";
import { S } from "../welcome.styles";

const ProjectInformation = () => {
  return (
    <S.MenuContainer>
      <S.MenuContentsBox>
        <S.MenuContentsInnerBox
          margin="0"
          height="530px"
          $flexDirection="column"
          $alignItems="left"
          padding="5% 5% 0 5%"
        >
          <S.TabTitle>프로젝트 목록</S.TabTitle>
          <S.TabDesc $fontWeight="600" $marginBottom="20px">
            프로젝트 목록은 여러분의 프로젝트 관리의 핵심이 될거에요.
          </S.TabDesc>
          <S.TabDesc color="#2D2D2D" $marginBottom="50px">
            정확하고 세부적인 설정을 통해 원하는 프리랜서를 모집하고, <br />
            프로젝트의 성공적인 진행을 위한 첫 발걸음을 시작해보세요!
          </S.TabDesc>
          <S.ContractTerminationAndProjectListAndMemberImage
            src="/assets/img/welcomePageImg/프로젝트 목록.JPG"
            alt="프로젝트 목록 스크린샷"
          />
        </S.MenuContentsInnerBox>
      </S.MenuContentsBox>
      <S.MenuContentsBox>
        <S.MenuTitleBox height="150px" margin="0 0 20px 0">
          <S.MenuTitle>프로젝트 관리 도구 📝</S.MenuTitle>
          <S.MenuDesc $textAlign="center">
            프로젝트 목록을 확인하고 진행중인 프로젝트의 <br />
            전반적인 흐름과 현 상태를 효과적으로 관리할 수 있어요.
          </S.MenuDesc>
        </S.MenuTitleBox>
        <S.MenuContentsInnerBox
          height="360px"
          $flexDirection="column"
          $alignItems="left"
          padding="5%"
        >
          <S.TabTitle>프로젝트 관리</S.TabTitle>
          <S.TabDesc $fontWeight="600" $marginBottom="10px">
            프리랜서의 능력을 가장 잘 보여줄 수 있는 곳, 바로 포트폴리오
            탭이에요.
            <br />
          </S.TabDesc>
          <S.TabDesc color="#2D2D2D" $marginBottom="30px">
            상단에 메뉴를 통해 확인을 원하시는 프로젝트를 손쉽게 선택하실 수
            있으며,
            <br />
            프리랜서가 작성한 업무 목록을 확인하여 프로젝트에 대한 진행 상황을
            확인할 수 있습니다.
          </S.TabDesc>
          <img
            src="/assets/img/welcomePageImg/클라이언트 - 프로젝트 관리.JPG"
            alt="프로젝트 관리 도구 스크린샷"
          />
        </S.MenuContentsInnerBox>
      </S.MenuContentsBox>
    </S.MenuContainer>
  );
};

export default ProjectInformation;
