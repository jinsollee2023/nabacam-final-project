import React, { useState } from "react";
import { styled } from "styled-components";
import ResumeTab from "../components/myPage/tabs/ResumeTab";
import PortfolioTab from "../components/myPage/tabs/PortfolioTab";
import ContractInfoTab from "../components/myPage/tabs/ContractInfoTab";
import FeedbackTab from "../components/myPage/tabs/FeedbackTab";

const MyPage = () => {
  // useStates
  const [activeTab, setActiveTab] = useState("이력서");

  // Event Handler
  const handleTabClick = (
    tab: "이력서" | "포트폴리오" | "계약정보" | "피드백 관리"
  ) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ margin: "10px 10px 10px 0px" }}>
      <section
        style={{
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
          width: "100%",
          height: "50px",
        }}
      >
        <div>내 프로필</div>
      </section>
      {/* -----------------------section1------------------------------ */}
      <section
        style={{
          display: "flex",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#f8f5ed",
        }}
      >
        <img
          src="path_to_your_image.jpg"
          alt="img"
          width="40px"
          height="40px"
          style={{ marginLeft: "10px" }}
        />
        <div
          style={{
            marginLeft: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>이름</h1>
          <S.Info>직무</S.Info>
          <S.Info>현재 진행중인 프로젝트</S.Info>
        </div>
        <div
          style={{
            marginLeft: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>연락망</h1>
          <S.Info>전화번호</S.Info>
          <S.Info>이메일</S.Info>
        </div>
      </section>
      {/* -----------------------section2------------------------------ */}
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
              backgroundColor: activeTab === "이력서" ? "gray" : "transparent",
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
    </div>
  );
};

export default MyPage;

const S = {
  Info: styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.583);
    margin-top: 5px;
  `,
};
