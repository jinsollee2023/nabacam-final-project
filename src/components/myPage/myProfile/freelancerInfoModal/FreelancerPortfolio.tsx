import React, { useState } from "react";
import { IUser, Portfolio } from "../../../../Types";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../../api/Portfolio";
import { S } from "./freelancerInfo.style";
import { useUserStore } from "../../../../store/useUserStore";
import PortfolioDetailModal from "../tabs/portfolioTab/portfolioDetailModal/PortfolioDetailModal";
import Modal from "../../../modal/Modal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { usePortfolioStore } from "src/store/usePortfolioStore";

interface FreelancerPortfolioProps {
  user: IUser;
}

const FreelancerPortfolio = ({ user }: FreelancerPortfolioProps) => {
  const { userId } = useUserStore();
  const { selectedPortfolio, setSelectedPortfolio } = usePortfolioStore();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: portfolios,
    isLoading: portfoliosIsLoading,
    isError: portfoliosIsError,
  } = useQuery(["portfolio"], (id) => getPortfolio(user.userId));

  // 포트폴리오 케러셀 설정
  const responsive = {
    0: { items: 1 },
    600: { items: 3 },
  };

  // 포트폴리오 케러셀 설정
  const handleSlideChanged = (e: { item: number }) => {
    setCurrentIndex(e.item);
  };

  const openModal = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <S.ResumeContent>포트폴리오</S.ResumeContent>
      {portfoliosIsLoading ? (
        <S.DataNullBox>Loading Portfolio...</S.DataNullBox>
      ) : portfoliosIsError ? (
        <S.DataNullBox>포트폴리오 데이터를 불러오지 못했습니다.</S.DataNullBox>
      ) : portfolios && portfolios.length > 3 ? (
        <AliceCarousel
          responsive={responsive}
          infinite={false}
          mouseTracking
          disableDotsControls
          onSlideChanged={handleSlideChanged}
        >
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.portfolioId}
              onClick={() => openModal(portfolio)}
            >
              <S.PortfolioImgBox>
                <S.PortfolioImg
                  alt="portfolioImage"
                  src={portfolio.thumbNailURL}
                />
              </S.PortfolioImgBox>
              <S.PortfolioCmt>{portfolio.title}</S.PortfolioCmt>
            </div>
          ))}
        </AliceCarousel>
      ) : portfolios!.length > 0 ? (
        <S.PortfolioWrapper>
          {portfolios!.map((portfolio) => (
            <div
              key={portfolio.portfolioId}
              onClick={() => openModal(portfolio)}
            >
              <S.PortfolioImgBox>
                <S.PortfolioImg
                  alt="portfolioImage"
                  src={portfolio.thumbNailURL}
                />
              </S.PortfolioImgBox>
              <S.PortfolioCmt>{portfolio.title}</S.PortfolioCmt>
            </div>
          ))}
        </S.PortfolioWrapper>
      ) : (
        <S.DataNullBox>등록된 포트폴리오가 없습니다.</S.DataNullBox>
      )}
      {isDetailModalOpen && (
        <Modal setIsModalOpen={setIsDetailModalOpen}>
          <PortfolioDetailModal
            setIsDetailModalOpen={setIsDetailModalOpen}
            userId={userId}
          />
        </Modal>
      )}
    </>
  );
};

export default FreelancerPortfolio;
