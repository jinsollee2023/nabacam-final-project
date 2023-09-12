import React from "react";
import { S } from "../welcome.styles";

const ProjectManagementInformation = () => {
  return (
    <>
      <S.MenuContainer>
        <S.MenuContentsBox>
          <S.MenuTitleBox height="210px" margin="0 1% 20px 1%">
            <S.MenuTitle>프로젝트 관리 도구 📝</S.MenuTitle>
            <S.MenuDesc textAlign="center">
              프로젝트 관리 도구를 활용하여 클라이언트와의
              <br /> 원활한 커뮤니케이션과 프로젝트의 효율적인 관리를
              실현하세요!
            </S.MenuDesc>
          </S.MenuTitleBox>
          <S.MenuContentsInnerBox height="413px" margin="0 1% 20px 1%">
            <img src="" alt="프로젝트 탐색 스크린샷" />
          </S.MenuContentsInnerBox>
        </S.MenuContentsBox>
        <S.MenuContentsInnerBox
          width="48%"
          height="640px"
          margin="1% 1% 20px 1%"
          padding="15px 0"
          flexDirection="column"
        >
          <S.ProjectTabContentsBox width="93%" height="150px">
            <S.TabDesc fontWeight="600" marginBottom="10px">
              📅 색상으로 된 월별 타임라인
            </S.TabDesc>
            <S.TabDesc textAlign="center">
              1월부터 12월까지 각 월마다 다른 색상으로 지정돼요. <br />
              이를 통해 작업 스케줄을 한눈에 파악하고 효율적으로 관리하세요!
            </S.TabDesc>
          </S.ProjectTabContentsBox>
          <S.ProjectTabContentsBox width="93%" height="150px">
            <S.TabDesc fontWeight="600" marginBottom="10px">
              🚀 타임라인 상태 표시기
            </S.TabDesc>
            <S.TabDesc textAlign="center">
              다섯가지의 작업 상태를 통해 프로젝트의 진척 상황을 투명하게
              공유하세요.
            </S.TabDesc>
          </S.ProjectTabContentsBox>
          <S.ProjectTabContentsBox width="93%" height="150px">
            <S.TabDesc fontWeight="600" marginBottom="10px">
              🗓️ 마감 기한 캘린더
            </S.TabDesc>
            <S.TabDesc textAlign="center">
              해당 프로젝트의 마감 기한을 설정하여 작업 일정을 체계적으로
              관리하세요.
              <br />
              이를 통해 시간 관리와 클라이언트와의 기한 일정을 맞추는 데 도움이
              됩니다.
            </S.TabDesc>
          </S.ProjectTabContentsBox>
          <S.ProjectTabContentsBox width="93%" height="150px">
            <S.TabDesc fontWeight="600" marginBottom="10px">
              ⭐ 중요도 설정
            </S.TabDesc>
            <S.TabDesc textAlign="center">
              별을 통해 프로젝트의 중요도를 표시하세요. <br />
              작업들을 우선순위로 관리하고 클라이언트에게 중요한 작업을 알릴 수
              있습니다.
            </S.TabDesc>
          </S.ProjectTabContentsBox>
        </S.MenuContentsInnerBox>
      </S.MenuContainer>
    </>
  );
};

export default ProjectManagementInformation;
