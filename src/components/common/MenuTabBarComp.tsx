import { useEffect, useState } from "react";
import { styled } from "styled-components";
import TaskList from "../projectManagement/task";
import FreelancerMarket from "../home/freelancerMarket";
import ApplicantFreelancerList from "../home/manageFreelancersByStatus/ApplicantFreelancerList";
import PendingFreelancerList from "../home/manageFreelancersByStatus/PendingFreelancerList";
import ProjectList from "../projectManagement/projectList";
import ProjectNavigation from "../home/projectNavigation";
import MemberList from "../myPage/client/memberList/MemberList";
import AppliedProjectList from "../home/appliedProjectList/AppliedProjectList";
import SuggestedProjectList from "../home/suggestedProjectList/SuggestedProjectList";
import OngoingFreelancerList from "../myPage/client/listOfFreelancersByStatus/OngoingFreelancerList";
import ContractTerminationFreelancerList from "../myPage/client/listOfFreelancersByStatus/ContractTerminationFreelancerList";
import React from "react";
import { useTabStore } from "src/store/useTabStore";

interface MenuTabBarCompProps {
  menu: string[];
  children?: React.ReactNode;
}

const MenuTabBarComp = ({ menu, children }: MenuTabBarCompProps) => {
  const { currentTab, setCurrentTab } = useTabStore();

  useEffect(() => {
    setCurrentTab(menu[0]);
  }, []);

  return (
    <>
      <S.MenuTabBar>
        {menu.map((item, index) => (
          <S.MenuTab
            key={index}
            onClick={() => setCurrentTab(item)}
            fontWeight={currentTab === item ? 600 : 400}
          >
            {item}
          </S.MenuTab>
        ))}
      </S.MenuTabBar>
      {children}
      <S.CompContainer>
        {currentTab === "프로젝트 진행 상태" && <TaskList />}
        {currentTab === "프로젝트 목록" && <ProjectList />}
        {currentTab === "프리랜서 마켓" && <FreelancerMarket />}
        {currentTab === "프로젝트 탐색" && <ProjectNavigation />}
        {currentTab === "지원한 프로젝트" && <AppliedProjectList />}
        {currentTab === "제안받은 프로젝트" && <SuggestedProjectList />}
        {currentTab === "지원한 프리랜서" && <ApplicantFreelancerList />}
        {currentTab === "보류한 프리랜서" && <PendingFreelancerList />}
        {currentTab === "우리 기업 구성원" && <MemberList />}
        {currentTab === "진행 중인 프리랜서" && <OngoingFreelancerList />}
        {currentTab === "계약이 끝난 프리랜서" && (
          <ContractTerminationFreelancerList />
        )}
      </S.CompContainer>
    </>
  );
};

export default MenuTabBarComp;

interface MenuTabProps {
  fontWeight?: number;
}

const S = {
  MenuTabBar: styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid grey;

    display: flex;
    align-items: center;

    padding: 0 20px;
  `,
  MenuTab: styled.span<MenuTabProps>`
    margin: 0 20px;
    font-size: 15px;
    font-weight: ${(props) => props.fontWeight};
    cursor: pointer;
  `,
  CompContainer: styled.div`
    padding: 30px 30px 0px 30px;
  `,
};
