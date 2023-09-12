import React from "react";
import { S } from "../welcome.styles";

const FindFreelancerInfromation = () => {
  return (
    <>
      <S.MenuTitleBox>
        <S.MenuTitle>프리랜서 구인 🔍️</S.MenuTitle>
        <S.MenuDesc>
          수많은 프리랜서의 포트폴리오를 확인하고 지원과 보류 현황에 대해서
          확인이 가능해요.
        </S.MenuDesc>
      </S.MenuTitleBox>
      <S.MenuContentsInnerBox>
        <S.MenuContentsBox>
          <img src="" alt="프리랜서 구인 스크린샷" />
        </S.MenuContentsBox>
        <S.MenuContentsBox>
          <S.TabContentsBox height="140px">
            <S.TabTitle>프리랜서 구인</S.TabTitle>
            <S.TabDesc>
              프리랜서의 주요 작업을 대표하는 포트폴리오 썸네일을 통해 그들의
              역량을 빠르게 파악하세요.
              <br />
              썸네일을 클릭하시면, 포트폴리오의 설명과 파일 및 링크를 확인할 수
              있어요 <br />
              프리랜서의 이름을 클릭하시면, 프리랜서의 상세 정보를 확인할 수
              있어요.
              <br />
              특정 프리랜서의 능력에 확신이 드셨다면, '제안하기' 버튼을 통해
              프로젝트를 제안해주세요.
            </S.TabDesc>
          </S.TabContentsBox>
          <S.TabContentsBox height="70px">
            <S.TabTitle>지원한 프리랜서</S.TabTitle>
            <S.TabDesc>
              나의 프로젝트에 지원한 프리랜서를 확인하고 매칭을 진행할 수
              있어요.
            </S.TabDesc>
          </S.TabContentsBox>
          <S.TabContentsBox height="70px">
            <S.TabTitle>보류한 프리랜서</S.TabTitle>
            <S.TabDesc>
              이전에 보류했던 프리랜서 목록을 확인하고 매칭을 진행할 수 있어요.
            </S.TabDesc>
          </S.TabContentsBox>
        </S.MenuContentsBox>
      </S.MenuContentsInnerBox>
    </>
  );
};

export default FindFreelancerInfromation;
