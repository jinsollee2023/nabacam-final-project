import React, { useState } from "react";
import FreelancerMarket from "../components/home/freelancerMarket/FreelancerMarket";
import ApplicantFreelancerList from "../components/home/applicantFreelancerList/ApplicantFreelancerList";
import PendingFreelancerLists from "../components/home/pendingFreelancerLists/PendingFreelancerLists";
import { styled } from "styled-components";

// 프리랜서 구인 페이지

const Home = () => {
  const [activeTab, setActiveTab] = useState("freelancerMarket");

  return (
    <>
      <S.MenuTabBar>
        <S.MenuTab
          onClick={() => setActiveTab("freelancerMarket")}
          active={activeTab === "freelancerMarket"}
        >
          프리랜서 마켓
        </S.MenuTab>
        <S.MenuTab
          onClick={() => setActiveTab("applicantFreelancerList")}
          active={activeTab === "applicantFreelancerList"}
        >
          지원한 프리랜서 확인
        </S.MenuTab>
        <S.MenuTab
          onClick={() => setActiveTab("pendingFreelancerLists")}
          active={activeTab === "pendingFreelancerLists"}
        >
          보류한 프리랜서
        </S.MenuTab>
      </S.MenuTabBar>
      <S.CompContainer>
        {activeTab === "freelancerMarket" ? <FreelancerMarket /> : null}
        {activeTab === "applicantFreelancerLists" ? <ApplicantFreelancerList /> : null}
        {activeTab === "pendingFreelancerLists" ? <PendingFreelancerLists /> : null}
      </S.CompContainer>
    </>
  );
};

export default Home;

interface MenuTabProps {
  active?: boolean;
}

const S = {
  MenuTabBar: styled.div`
    width: 100%;
    height: 12vh;
    border-bottom: 1px solid grey;

    display: flex;
    align-items: center;

    padding: 0 20px;
  `,
  MenuTab: styled.span<MenuTabProps>`
    margin: 0 20px;
    font-size: 15px;
    font-weight: ${(props) => (props.active ? 600 : 400)};
    cursor: pointer;
  `,
  CompContainer: styled.div`
    padding: 30px;
  `,
};
