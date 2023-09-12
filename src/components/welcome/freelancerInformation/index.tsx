import React from "react";
import { S } from "../welcome.styles";
import ProjectManagementInformation from "./ProjectManagementInformation";
import MyPageInformation from "./MyPageInformation";
import ChatInformation from "../ChatInformation";
import ExploreProjectInformation from "./ExploreProjectInformation";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "src/store/useUserStore";

const FreelancerInfomation = () => {
  const navigate = useNavigate();
  const { setUserRole } = useUserStore();
  const GotoFreelancerRegisterButtonHandler = () => {
    setUserRole("freelancer");
    navigate("/register");
  };
  return (
    <S.InfomationContainer>
      <ExploreProjectInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <ProjectManagementInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <MyPageInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <ChatInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <S.OutroBox>
        <S.TabTitle $textAlign="center">
          다양한 프로젝트가 당신의 전문성을 기다립니다. 지금 가입하고 최상의
          기회를 잡아보세요.
        </S.TabTitle>
        <S.OutroButton onClick={GotoFreelancerRegisterButtonHandler}>
          <S.TabTitle>프리랜서로 회원가입하기</S.TabTitle>
        </S.OutroButton>
      </S.OutroBox>
    </S.InfomationContainer>
  );
};

export default FreelancerInfomation;
