import React, { useState } from "react";
import { styled } from "styled-components";
import PortfolioAddModal from "./PortfolioAddModal";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import PortfolioDetailModal from "./PortfolioDetailModal";

const PortfolioTab = () => {
  const { userId } = useUserStore();
  const [open, setOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);

  const { portfolios } = usePortfolioInfoQueries({ userId });

  return (
    <>
      {/* 썸네일만 */}
      <S.PortfolioListContainer>
        <S.PortfolioListWrapper>
          {portfolios &&
            portfolios.map((portfolio) => (
              <S.PortfolioList
                key={portfolio.portfolioId}
                onClick={() => {
                  setSelectedPortfolio(portfolio); // 선택한 포트폴리오 데이터를 상태에 저장
                  setIsDetailModalOpen(true);
                }}
              >
                <img
                  className="portfolioThumbnail"
                  src={portfolio.thumbNailURL}
                  alt="등록된 이미지가 없습니다."
                  width="120px"
                  height="120px"
                  style={{ marginLeft: "10px" }}
                />
              </S.PortfolioList>
            ))}

          <S.PortfolioList onClick={() => setOpen(true)}>
            + 포트폴리오 첨부하기
          </S.PortfolioList>
          <PortfolioAddModal open={open} setOpen={setOpen} />
        </S.PortfolioListWrapper>
      </S.PortfolioListContainer>

      {isDetailModalOpen && (
        <PortfolioDetailModal
          setIsDetailModalOpen={setIsDetailModalOpen}
          portfolioData={selectedPortfolio}
          userId={userId}
        />
      )}
    </>
  );
};

export default PortfolioTab;

const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  PortfolioListWrapper: styled.div`
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  PortfolioList: styled.div`
    background-color: #8080803d;
    width: 130px;
    height: 130px;
    margin-right: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 13px;
    padding: 10px;
    list-style: none;
  `,
};
