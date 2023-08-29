import React from "react";
import { S } from "./freelancerInfoStyle";
import { IUser } from "src/Types";

interface FreelancerResumeProps {
  user: IUser;
}

const FreelancerResume = ({ user }: FreelancerResumeProps) => {
  return (
    <>
      <S.ResumeContent>프로필</S.ResumeContent>
      <S.ProfileIntro>{user.resumeProfileIntro}</S.ProfileIntro>
      <S.ResumeContent>경력사항</S.ResumeContent>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
          flexFlow: "row wrap",
        }}
      >
        {user.resumeExperience && user.resumeExperience.length > 0 ? (
          user.resumeExperience.map((experience, index) => {
            const startDate = new Date(
              experience.pastWorkDuration.pastWorkStartDate
            );
            const endDate = new Date(
              experience.pastWorkDuration.pastWorkEndDate
            );

            return (
              <div
                key={index}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  minWidth: "210px",
                  minHeight: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                  wordBreak: "break-all",
                }}
              >
                <span>{experience.pastWorkPlace}</span>
                <span>
                  {startDate.toISOString().split("T")[0]} -{" "}
                  {endDate.toISOString().split("T")[0]}
                </span>
                <span>{experience.pastWorkPosition}</span>
              </div>
            );
          })
        ) : (
          <S.DataNullBox>등록된 경력이 없습니다.</S.DataNullBox>
        )}
      </div>
    </>
  );
};

export default FreelancerResume;
