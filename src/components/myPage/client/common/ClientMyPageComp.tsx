import { useUserStore } from "src/store/useUserStore";
import MenuTabBarComp from "../../../../components/common/MenuTabBarComp";
import Account from "../../myProfile/Account";
import React, { useState } from "react";
import { styled } from "styled-components";
import MemberList from "../MemberList";
import OngoingFreelancerList from "../listOfFreelancersByStatus/ongoingFreelancerList/OngoingFreelancerList";
import ContractTerminationFreelancers from "../listOfFreelancersByStatus/ContractTerminationFreelancers";

const ClientMyPageComp = () => {
  const [activeTab, setActiveTab] = useState("우리 기업 구성원");
  const { userId } = useUserStore();
  const menu = ["기업페이지"];

  const handleTabClick = (
    tab: "우리 기업 구성원" | "진행 중인 프리랜서" | "계약이 끝난 프리랜서"
  ) => {
    setActiveTab(tab);
  };
  return (
    <MenuTabBarComp menu={menu}>
      <S.Container>
        <Account />
        <S.TabsContainer>
          <S.TabsContainerInner>
            <S.TabBarContainer>
              <S.Tab
                onClick={() => handleTabClick("우리 기업 구성원")}
                style={{
                  borderBottom:
                    activeTab === "우리 기업 구성원"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                우리 기업 구성원
              </S.Tab>
              <S.Tab
                onClick={() => handleTabClick("진행 중인 프리랜서")}
                style={{
                  borderBottom:
                    activeTab === "진행 중인 프리랜서"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                진행 중인 프리랜서
              </S.Tab>
              <S.Tab
                onClick={() => handleTabClick("계약이 끝난 프리랜서")}
                style={{
                  borderBottom:
                    activeTab === "계약이 끝난 프리랜서"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                계약이 끝난 프리랜서
              </S.Tab>
            </S.TabBarContainer>
            {activeTab === "우리 기업 구성원" && <MemberList />}
            {activeTab === "진행 중인 프리랜서" && <OngoingFreelancerList />}
            {activeTab === "계약이 끝난 프리랜서" && (
              <ContractTerminationFreelancers />
            )}
          </S.TabsContainerInner>
        </S.TabsContainer>
      </S.Container>
    </MenuTabBarComp>
  );
};

export default ClientMyPageComp;

const S = {
  Container: styled.div`
    padding-left: 30px;
    width: 100%;
  `,
  TabsContainer: styled.section`
    display: flex;
    margin: 20px 10px 10px 10px;
    width: 100%;
  `,
  TabsContainerInner: styled.div`
    width: 100%;
  `,
  TabBarContainer: styled.div`
    margin-bottom: 15px;
    border-bottom: solid #d9d9d9 4px;
    display: flex;
    width: 100%;
  `,
  Tab: styled.button`
    border-top: none;
    border-right: none;
    border-left: none;
    padding: 8px 16px;
    margin-right: 10px;
    cursor: pointer;
    background-color: transparent;
  `,
};
