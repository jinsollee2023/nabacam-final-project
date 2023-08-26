import React, { useState } from "react";
import { styled } from "styled-components";
import ResumeTab from "../components/myPage/tabs/resumeTab/ResumeTab";
import PortfolioTab from "../components/myPage/tabs/portfolioTab/PortfolioTab";
import ContractInfoTab from "../components/myPage/tabs/ContractInfoTab";
import FeedbackTab from "../components/myPage/tabs/FeedbackTab";
import supabase from "../config/supabaseClient";
import Account from "../components/myPage/myProfile/Account";
import { useQuery } from "@tanstack/react-query";
import { getFreelancer } from "src/api/User";
import { useUserStore } from "src/zustand/useUserStore";
import MyPageMenuTabBarComp from "src/components/myPage/common/MyPageMenuTabBarComp";

const MyPage = () => {
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
        <section
          style={{
            display: "flex",
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f8f5ed",
          }}
        >
          <div className="inner" style={{ width: "100%" }}>
            <button
              onClick={() => handleTabClick("이력서")}
              style={{
                backgroundColor:
                  activeTab === "이력서" ? "gray" : "transparent",
                border: "none",
                padding: "6px 12px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              이력서
            </button>
            <button
              onClick={() => handleTabClick("포트폴리오")}
              style={{
                backgroundColor:
                  activeTab === "포트폴리오" ? "gray" : "transparent",
                border: "none",
                padding: "8px 16px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              포트폴리오
            </button>
            <button
              onClick={() => handleTabClick("계약정보")}
              style={{
                backgroundColor:
                  activeTab === "계약정보" ? "gray" : "transparent",
                border: "none",
                padding: "8px 16px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              계약정보
            </button>
            <button
              onClick={() => handleTabClick("피드백 관리")}
              style={{
                backgroundColor:
                  activeTab === "피드백 관리" ? "gray" : "transparent",
                border: "none",
                padding: "8px 16px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              피드백 관리
            </button>
            {/* ----- */}
            {activeTab === "이력서" && <ResumeTab />}
            {activeTab === "포트폴리오" && <PortfolioTab />}
            {activeTab === "계약정보" && <ContractInfoTab />}
            {activeTab === "피드백 관리" && <FeedbackTab />}
          </div>
        </section>
      </S.Container>
    </>
  );
};

export default MyPage;

const S = {
  Container: styled.div`
    padding-left: 30px;
  `,
};
