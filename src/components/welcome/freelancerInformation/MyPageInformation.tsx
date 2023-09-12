import React from "react";
import { S } from "../welcome.styles";

const MyPageInformation = () => {
  return (
    <S.MenuContainer>
      <S.MenuContentsBox>
        <S.MenuContentsInnerBox
          margin="0 0 20px 0"
          height="500px"
          $flexDirection="column"
          $alignItems="left"
          padding="5%"
        >
          <S.TabTitle>이력서</S.TabTitle>
          <S.TabDesc $fontWeight="600" $marginBottom="10px">
            당신의 이야기를 알려주세요.
            <br />
            프로필부터 경력 사항까지 자신을 소개할 수 있는 모든 정보를 기입할 수
            있어요.
          </S.TabDesc>
          <img src="" alt="이력서 탭 스크린샷" />
          <S.TabDesc>
            사진, 이름, 직무, 기술 스택, 간단한 자기 소개 등을 통해
            <br />
            클라이언트에게 당신을 알릴 수 있어요.
            <br />
            이전에 진행했던 프로젝트나 경력, 학력 등의 정보를 상세하게 기입하여,
            <br />
            클라이언트에게 당신의 전문성과 경험을 어필해주세요!
          </S.TabDesc>
        </S.MenuContentsInnerBox>
        <S.MenuContentsInnerBox
          height="395px"
          $flexDirection="column"
          $alignItems="left"
          padding="5%"
        >
          <S.TabTitle>계약 정보</S.TabTitle>
          <S.TabDesc $fontWeight="600" $marginBottom="10px">
            과거의 협업, 그 흔적들
          </S.TabDesc>
          <S.TabDesc>
            과거에 진행했던 프로젝트들의 계약 정보와 상세 내용을 확인할 수
            있어요.
            <br /> 프로젝트의 기간, 계약 조건 등 협업에 대한 모든 이야기를
            한눈에 파악할 수 있어요
          </S.TabDesc>
          <img src="" alt="계약정보 탭 스크린샷" />
        </S.MenuContentsInnerBox>
      </S.MenuContentsBox>
      <S.MenuContentsBox>
        <S.MenuTitleBox height="210px" margin="0 0 20px 0">
          <S.MenuTitle>마이페이지 🙎🏻‍♂️ </S.MenuTitle>
          <S.MenuDesc $textAlign="center">
            프리랜서로서의 당신의 전체적인 모습과 능력,
            <br /> 그리고 경험을 집약적으로 소개하는 곳이에요.
          </S.MenuDesc>
        </S.MenuTitleBox>
        <S.MenuContentsInnerBox
          height="685px"
          $flexDirection="column"
          $alignItems="left"
          padding="5%"
        >
          <S.TabTitle>포트폴리오</S.TabTitle>
          <S.TabDesc $fontWeight="600" $marginBottom="10px">
            프리랜서의 능력을 가장 잘 보여줄 수 있는 곳, 바로 포트폴리오
            탭이에요.
            <br />
          </S.TabDesc>
          <S.TabDesc>
            작업물의 배경, 진행 과정, 사용된 기술 및 도구 등의 상세 내용을
            기술해주세요.
            <br />
            당신의 작업에 담긴 이야기와 노력을 충분히 전달하는 글로 표현하세요.
            <br />
            <br />
            포트폴리오 리스트에서 가장 먼저 눈에 들어오는 썸네일!
            <br />
            강력하고, 효과적인 이미지로 클라이언트의 관심을 한 번에
            집중시켜보세요.
            <br />
            <br />
            작업물을 직접 파일로 업로드하거나 외부 링크로 연결하여 제공하실 수
            있습니다.
          </S.TabDesc>
          <img src="" alt="포트폴리오 탭 스크린샷" />
        </S.MenuContentsInnerBox>
      </S.MenuContentsBox>
    </S.MenuContainer>
  );
};

export default MyPageInformation;
