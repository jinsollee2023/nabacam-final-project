import React from "react";
import { S } from "../welcome.styles";

const ExploreProjectInfomation = () => {
  return (
    <>
      <S.MenuTitleBox>
        <S.MenuTitle>프로젝트 탐색 🔍️ </S.MenuTitle>
        <S.MenuDesc>
          등록된 프로젝트 중에서 본인의 능력과 일치하는 최적의 프로젝트를
          발견하여 성공적인 프리랜서 경력을 쌓아보세요!
        </S.MenuDesc>
      </S.MenuTitleBox>
      <S.MenuContentsInnerBox>
        <S.MenuContentsBox>
          <img src="" alt="프로젝트 탐색 스크린샷" />
        </S.MenuContentsBox>
        <S.MenuContentsBox>
          <S.TabContentsBox>
            <S.TabTitle>프로젝트 탐색</S.TabTitle>
            <S.TabDesc>
              본인의 능력과 일치하는 최적의 프로젝트를 발견하여 성공적인
              프리랜서 경력을 쌓아보세요!
              <br />
              편리한 탐색을 위해 검색 및 카테고리, 정렬 기능 등이 준비되어
              있어요.
            </S.TabDesc>
          </S.TabContentsBox>
          <S.TabContentsBox>
            <S.TabTitle>지원한 프로젝트</S.TabTitle>
            <S.TabDesc>
              지원한 프로젝트들을 확인할 수 있어요!
              <br />
              자세히 보기 버튼을 클릭하여 지원 취소도 언제든 가능해요.
            </S.TabDesc>
          </S.TabContentsBox>
          <S.TabContentsBox>
            <S.TabTitle>제안받은 프로젝트</S.TabTitle>
            <S.TabDesc>
              기업들로부터 직접 프로젝트 제안을 받았을 경우 이곳에서 확인할 수
              있어요.
              <br />
              여러 기업들이 본인의 능력과 전문성을 인정하여 보낸 제안을
              확인해보세요!
            </S.TabDesc>
          </S.TabContentsBox>
        </S.MenuContentsBox>
      </S.MenuContentsInnerBox>
    </>
  );
};

export default ExploreProjectInfomation;
