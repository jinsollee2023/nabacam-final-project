import React from "react";
import { IUser } from "../../../Types";
import { S } from "./applicantResumeModalStyle";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../api/Portfolio";
import FreelancerPortfolio from "../../modal/freelancerInfo/FreelancerPortfolio";
import FreelancerResume from "../../modal/freelancerInfo/FreelancerResume";
import FreelancerProfile from "../../modal/freelancerInfo/FreelancerProfile";

interface ApplicantResumeModalProps {
  user: IUser;
  onClose: () => void;
}

const ApplicantResumeModal = ({ user }: ApplicantResumeModalProps) => {
  const {
    data: portfolio,
    isLoading: portfolioIsLoading,
    isError: portfolioIsError,
  } = useQuery(["portfolio"], (id) => getPortfolio(user.userId));

  // console.log(portfolio);

  return (
    <>
      <S.Title>{user.title} 프로젝트에 지원</S.Title>
      <FreelancerProfile user={user} />
      <div style={{ color: "gray", fontSize: "14px" }}>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "100%" }}>
            <p>목표 기간</p>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                width: "90%",
                height: "28px",
                borderRadius: "10px",
              }}
            ></div>
          </div>
          <div style={{ width: "100%" }}>
            <p>급여</p>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                width: "90%",
                height: "28px",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
        <p style={{ marginTop: "10px" }}>수정 이유</p>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            width: "100%",
            height: "40px",
            borderRadius: "10px",
          }}
        ></div>
      </div>
      <div>
        <FreelancerResume />
        <FreelancerPortfolio user={user} />
      </div>
    </>
  );
};

export default ApplicantResumeModal;
