import React from "react";
import { IPortfolio, Portfolio } from "src/Types";
import { S } from "./portfolioTab.styles";

interface PortfolioCardProps {
  idx: number;
  page: IPortfolio;
  setIsDetailModalOpen: (isDetailModalOpen: boolean) => void;
  setIsAddModalOpen: (isAddModalOpen: boolean) => void;
  setSelectedPortfolio: (portfolio: Portfolio | null) => void;
}

const PortfolioCard = ({
  idx,
  page,
  setIsDetailModalOpen,
  setIsAddModalOpen,
  setSelectedPortfolio,
}: PortfolioCardProps) => {
  const handleOpenDetailModalButtonClick = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsDetailModalOpen(true);
    setIsAddModalOpen(false);
  };

  return (
    <React.Fragment key={idx}>
      {page.portfolio.map((portfolio) => {
        return (
          <S.PortfolioList
            key={portfolio.portfolioId}
            onClick={() => {
              handleOpenDetailModalButtonClick(portfolio);
            }}
          >
            <img
              style={{ borderRadius: "20px" }}
              src={
                typeof portfolio.thumbNailURL === "string"
                  ? portfolio.thumbNailURL
                  : ""
              }
              alt="썸네일 이미지"
            />

            <S.PortfolioTitle>{portfolio.title}</S.PortfolioTitle>
          </S.PortfolioList>
        );
      })}
    </React.Fragment>
  );
};

export default PortfolioCard;
