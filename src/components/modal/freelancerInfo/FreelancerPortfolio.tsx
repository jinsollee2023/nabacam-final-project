import React, { useState } from "react";
import { IUser, Portfolio } from "../../../Types";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../api/Portfolio";
import { S } from "./freelancerInfoStyle";
import { useUserStore } from "../../../zustand/useUserStore";
import PortfolioDetailModal from "../../myPage/tabs/portfolioTab/portfolioDetailModal/PortfolioDetailModal";

interface FreelancerPortfolioProps {
  user: IUser;
}

const FreelancerPortfolio = ({ user }: FreelancerPortfolioProps) => {
  const { userId } = useUserStore();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>();

  const {
    data: portfolios,
    isLoading: portfoliosIsLoading,
    isError: portfoliosIsError,
  } = useQuery(["portfolio"], (id) => getPortfolio(user.userId));

  return (
    <>
      <S.ResumeContent>포트폴리오</S.ResumeContent>
      <S.PortfolioBox>
        {portfolios && portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div key={portfolio.portfolioId}>
              <S.ImgBox
                onClick={() => {
                  setSelectedPortfolio(portfolio);
                  setIsDetailModalOpen(true);
                }}
              >
                <S.PortfolioImg
                  alt="portfolioImage"
                  src={portfolio.thumbNailURL}
                />

                {isDetailModalOpen && (
                  <PortfolioDetailModal
                    setIsDetailModalOpen={setIsDetailModalOpen}
                    userId={userId}
                  />
                )}
              </S.ImgBox>
              <S.PortfolioCmt>{portfolio.title}</S.PortfolioCmt>
            </div>
          ))
        ) : portfoliosIsLoading ? (
          <S.DataNullBox>Loading Portfolio...</S.DataNullBox>
        ) : portfoliosIsError ? (
          <S.DataNullBox>
            포트폴리오 데이터를 불러오지 못했습니다.
          </S.DataNullBox>
        ) : (
          <S.DataNullBox>등록된 포트폴리오가 없습니다.</S.DataNullBox>
        )}
      </S.PortfolioBox>
    </>
  );
};

export default FreelancerPortfolio;
