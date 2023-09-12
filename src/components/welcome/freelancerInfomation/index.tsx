import React from "react";
import { S } from "../welcome.styles";
import ProjectManagementInfomation from "./ProjectManagementInfomation";
import MyPageInfomation from "./MyPageInfomation";
import ChatInfomation from "./ChatInfomation";
import ExploreProjectInfomation from "./ExploreProjectInfomation";
import { useNavigate } from "react-router-dom";

const FreelancerInfomation = () => {
  const navigate = useNavigate();
  return (
    <S.InfomationContainer>
      <ExploreProjectInfomation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <ProjectManagementInfomation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <MyPageInfomation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <ChatInfomation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <S.OutroBox>
        <S.TabTitle textAlign="center">
          다양한 프로젝트가 당신의 전문성을 기다립니다. 지금 가입하고 최상의
          기회를 잡아보세요.
        </S.TabTitle>
        <S.OutroButton onClick={() => navigate("/register")}>
          <S.TabTitle>프리랜서로 회원가입하기</S.TabTitle>
        </S.OutroButton>
      </S.OutroBox>
    </S.InfomationContainer>
  );
};

export default FreelancerInfomation;
