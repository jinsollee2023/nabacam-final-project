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
      <hr style={{ margin: "100px 0" }} />
      <ProjectManagementInformation />
      <hr style={{ margin: "100px 0" }} />
      <MyPageInformation />
      <hr style={{ margin: "100px 0" }} />
      <ChatInformation />
      <hr style={{ margin: "100px 0" }} />
      <S.OutroBox>
        <S.TabTitle $textAlign="center">
          다양한 프로젝트가 당신의 전문성을 기다립니다. 지금 가입하고 최상의
          기회를 잡아보세요.
        </S.TabTitle>
        <S.OutroButton onClick={GotoFreelancerRegisterButtonHandler}>
          프리랜서로 회원가입하기
        </S.OutroButton>
      </S.OutroBox>
    </S.InfomationContainer>
  );
};

export default FreelancerInfomation;
