import { useState } from "react";
import { styled } from "styled-components";
import TaskBox from "../task/TaskBox";
import FreelancerMarket from "../home/freelancerMarket/FreelancerMarket";
import ApplicantFreelancerList from "../home/applicantFreelancerList/ApplicantFreelancerList";
import PendingFreelancerLists from "../home/pendingFreelancerLists/PendingFreelancerLists";

interface MenuTabBarCompProps {
  menu: string[];
}

const MenuTabBarComp = ({ menu }: MenuTabBarCompProps) => {
  const [currentTab, setCurrentTab] = useState(menu[0]);
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
      <S.CompContainer>
        {currentTab === "프로젝트 진행 상태" && <TaskBox />}
        {currentTab === "프리랜서 마켓" && <FreelancerMarket />}
        {currentTab === "지원한 프리랜서 확인" && <ApplicantFreelancerList />}
        {currentTab === "보류한 프리랜서" && <PendingFreelancerLists />}
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
    padding: 30px;
  `,
};
