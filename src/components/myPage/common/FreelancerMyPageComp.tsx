import { useState } from "react";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import MyPageMenuTabBarComp from "src/components/myPage/common/MyPageMenuTabBarComp";
import Account from "../myProfile/Account";
import ResumeTab from "../tabs/resumeTab/ResumeTab";
import PortfolioTab from "../tabs/portfolioTab/PortfolioTab";
import ContractInfoTab from "../tabs/ContractInfoTab";
import FeedbackTab from "../tabs/FeedbackTab";

const FreelancerMyPageComp = () => {
  const [activeTab, setActiveTab] = useState("이력서");
  const { userId } = useUserStore();

  const myPageMenu = ["마이페이지"];

  // Event Handler
  const handleTabClick = (
    tab: "이력서" | "포트폴리오" | "계약정보" | "피드백 관리"
  ) => {
    setActiveTab(tab);
  };

  return (
    <>
      <MyPageMenuTabBarComp menu={myPageMenu} />
      <S.Container>
        <Account />
        <S.TabsContainer>
          <S.TabsContainerInner>
            <S.TabBarContainer>
              <S.Tab
                onClick={() => handleTabClick("이력서")}
                style={{
                  borderBottom:
                    activeTab === "이력서"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                이력서
              </S.Tab>

              <S.Tab
                onClick={() => handleTabClick("포트폴리오")}
                style={{
                  borderBottom:
                    activeTab === "포트폴리오"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                포트폴리오
              </S.Tab>

              <S.Tab
                onClick={() => handleTabClick("계약정보")}
                style={{
                  borderBottom:
                    activeTab === "계약정보"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                계약정보
              </S.Tab>

              <S.Tab
                onClick={() => handleTabClick("피드백 관리")}
                style={{
                  borderBottom:
                    activeTab === "피드백 관리"
                      ? "4px solid var(--main-blue)"
                      : "transparent",
                }}
              >
                피드백 관리
              </S.Tab>
            </S.TabBarContainer>
            {/* ----- */}
            {activeTab === "이력서" && <ResumeTab />}
            {activeTab === "포트폴리오" && <PortfolioTab />}
            {activeTab === "계약정보" && <ContractInfoTab />}
            {activeTab === "피드백 관리" && <FeedbackTab />}
          </S.TabsContainerInner>
        </S.TabsContainer>
      </S.Container>
    </>
  );
};

export default FreelancerMyPageComp;

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
  `,
};
