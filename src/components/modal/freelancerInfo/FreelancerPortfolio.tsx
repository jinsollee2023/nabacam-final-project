import React, { useState } from "react";
import { IUser, Portfolio } from "../../../Types";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../api/Portfolio";
import { S } from "./freelancerInfo.style";
import { useUserStore } from "../../../zustand/useUserStore";
import PortfolioDetailModal from "../../myPage/tabs/portfolioTab/portfolioDetailModal/PortfolioDetailModal";
import Modal from "../Modal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface FreelancerPortfolioProps {
  user: IUser;
}

const FreelancerPortfolio = ({ user }: FreelancerPortfolioProps) => {
  const { userId } = useUserStore();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | undefined>(undefined);
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
      <AliceCarousel
        responsive={responsive}
        infinite={false}
        mouseTracking
        disableDotsControls
        onSlideChanged={handleSlideChanged}
      >
        {portfolios && portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div key={portfolio.portfolioId} onClick={() => openModal(portfolio)}>
              <S.PortfolioImgBox>
                <S.PortfolioImg alt="portfolioImage" src={portfolio.thumbNailURL} />
              </S.PortfolioImgBox>
              <S.PortfolioCmt>{portfolio.title}</S.PortfolioCmt>
            </div>
          ))
        ) : portfoliosIsLoading ? (
          <S.DataNullBox>Loading Portfolio...</S.DataNullBox>
        ) : portfoliosIsError ? (
          <S.DataNullBox>포트폴리오 데이터를 불러오지 못했습니다.</S.DataNullBox>
        ) : (
          <S.DataNullBox>등록된 포트폴리오가 없습니다.</S.DataNullBox>
        )}
      </AliceCarousel>
      {isDetailModalOpen && (
        <Modal setIsModalOpen={setIsDetailModalOpen}>
          <PortfolioDetailModal setIsDetailModalOpen={setIsDetailModalOpen} userId={userId} />
        </Modal>
      )}
    </>
  );
};

export default FreelancerPortfolio;
