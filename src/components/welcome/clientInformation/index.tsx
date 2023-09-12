import React from "react";
import { S } from "../welcome.styles";
import ChatInformation from "../ChatInformation";
import { useNavigate } from "react-router-dom";
import FindFreelancerInfromation from "./FindFreelancerInfromation";
import ProjectInformation from "./ProjectInformation";
import CompanyPageInformation from "./CompanyPageInformation";
import { useUserStore } from "src/store/useUserStore";

const ClientInformation = () => {
  const navigate = useNavigate();
  const { setUserRole } = useUserStore();
  const GotoClientRegisterButtonHandler = () => {
    setUserRole("client");
    navigate("/register");
  };

  return (
    <S.InfomationContainer>
      <FindFreelancerInfromation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <ProjectInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <CompanyPageInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <ChatInformation />
      <div style={{ margin: "100px 0" }}>
        <hr />
      </div>
      <S.OutroBox>
        <S.TabTitle textAlign="center">
          이곳에서 최적의 프리랜서를 만나세요. 지금 회원가입하고 프로젝트를
          게시하여 전문 프리랜서의 지원을 받아보세요.
        </S.TabTitle>
        <S.OutroButton onClick={GotoClientRegisterButtonHandler}>
          <S.TabTitle>클라이언트로 회원가입하기</S.TabTitle>
        </S.OutroButton>
      </S.OutroBox>
    </S.InfomationContainer>
  );
};

export default ClientInformation;
