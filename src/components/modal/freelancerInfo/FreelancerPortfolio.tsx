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
      <div style={{ display: "flex", gap: "10px" }}>
        {portfolio ? (
          portfolio.map((data) => (
            <div>
              <img
                alt="portfolioImage"
                style={{
                  borderRadius: "15px",
                  width: "100px",
                  height: "100px",
                }}
                src={data.thumbNailURL}
              ></img>
              {/* <a href={data.pdfFileURL} download="portfolio.pdf">
                        test
                      </a> */}
              <p style={{ marginTop: "5px", fontSize: "14px" }}>{data.title}</p>
            </div>
          ))
        ) : portfolioIsLoading ? (
          <div>Loading Portfolio...</div>
        ) : portfolioIsError ? (
          <div>포트폴리오 데이터를 불러오지 못했습니다.</div>
        ) : null}
      </div>
    </>
  );
};

export default FreelancerPortfolio;
