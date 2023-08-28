import React from "react";
import { IUser } from "../../../Types";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../api/Portfolio";
import { S } from "./freelancerInfoStyle";

interface FreelancerPortfolioProps {
  user: IUser;
}

const FreelancerPortfolio = ({ user }: FreelancerPortfolioProps) => {
  const {
    data: portfolio,
    isLoading: portfolioIsLoading,
    isError: portfolioIsError,
  } = useQuery(["portfolio"], (id) => getPortfolio(user.userId));
  return (
    <>
      <S.ResumeContent>포트폴리오</S.ResumeContent>
      <S.PortfolioBox>
        {portfolio && portfolio.length > 0 ? (
          portfolio.map((data) => (
            <div key={data.portfolioId}>
              <S.ImgBox>
                <S.PortfolioImg alt="portfolioImage" src={data.thumbNailURL}></S.PortfolioImg>
              </S.ImgBox>
              <S.PortfolioCmt>{data.title}</S.PortfolioCmt>
            </div>
          ))
        ) : portfolioIsLoading ? (
          <S.DataNullBox>Loading Portfolio...</S.DataNullBox>
        ) : portfolioIsError ? (
          <S.DataNullBox>포트폴리오 데이터를 불러오지 못했습니다.</S.DataNullBox>
        ) : (
          <S.DataNullBox>등록된 포트폴리오가 없습니다.</S.DataNullBox>
        )}
      </S.PortfolioBox>
    </>
  );
};

export default FreelancerPortfolio;
