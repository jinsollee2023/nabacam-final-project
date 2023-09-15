import React from "react";
import { S } from "../welcome.styles";

const CompanyPageInformation = () => {
  return (
    <>
      <S.MenuContainer>
        <S.MenuContentsBox>
          <S.MenuTitleBox height="170px" margin="0 1% 20px 1%">
            <S.MenuTitle>기업페이지 🏢</S.MenuTitle>
            <S.MenuDesc $textAlign="center">
              회사의 모든 구성원 정보와 <br />
              프리랜서를 한 눈에 파악하고 관리할 수 있어요.
            </S.MenuDesc>
          </S.MenuTitleBox>
          <S.MenuContentsInnerBox
            height="450px"
            margin="0 1% 20px 1%"
            $flexDirection="column"
            $justifyContent="null"
            $alignItems="null"
            padding="5%"
          >
            <S.TabTitle>우리 기업 구성원</S.TabTitle>
            <S.TabDesc $fontWeight="600" $marginBottom="10px">
              기업 구성원을 한 눈에 확인할 수 있어요.
            </S.TabDesc>
            <S.TabDesc color="#2D2D2D" $marginBottom="40px">
              등록한 기업 구성원은 이후 프로젝트를 모집글을 게시할 때,
              <br />
              담당자로 지정하여 프로젝트의 담당자를 한 번에 확인할 수 있어요.
            </S.TabDesc>
            <img
              src="/assets/img/welcomePageImg/우리 기업 구성원.JPG"
              alt="우리 기업 구성원 스크린샷"
            />
          </S.MenuContentsInnerBox>
        </S.MenuContentsBox>
        <S.MenuContentsInnerBox
          width="48%"
          height="640px"
          margin="1% 1% 20px 1%"
          $flexDirection="column"
          $justifyContent="null"
          $alignItems="null"
        >
          <S.ClientMyPageRightBoxTextWrapper>
            <S.TabTitle>진행 중인 프리랜서</S.TabTitle>
            <S.TabDesc color="#2D2D2D" $marginBottom="20px">
              현재 우리 회사와 함께 작업 중인 프리랜서의 전반적인 정보를 확인할
              수 있어요.
            </S.TabDesc>
            <S.TabTitle>계약이 끝난 프리랜서</S.TabTitle>
            <S.TabDesc color="#2D2D2D">
              함께 했던 프리랜서들의 전반적인 정보를 확인 할 수 있고,
              <br />
              프로젝트가 시작할 때 다시 제안할 수 있어요.
            </S.TabDesc>
          </S.ClientMyPageRightBoxTextWrapper>
          <S.FreelancerCardImageWrapper>
            <img
              src="/assets/img/welcomePageImg/계약이 끝난 프리랜서 전체.png"
              alt="프리랜서 카드 스크린샷"
            />
          </S.FreelancerCardImageWrapper>
        </S.MenuContentsInnerBox>
      </S.MenuContainer>
    </>
  );
};

export default CompanyPageInformation;
