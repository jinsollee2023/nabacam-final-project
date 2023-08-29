import React from "react";
import { S } from "./freelancerInfoStyle";
import { IUser } from "src/Types";
import { User } from "src/Types";
import type { ResumeExperience } from "src/Types";

interface FreelancerResumeProps {
  user: User;
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
          user.resumeExperience.map((experience: ResumeExperience, index) => (
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
                {
                  experience.pastWorkDuration.pastWorkStartDate
                    .toISOString()
                    .split("T")[0]
                }
                -
                {
                  experience.pastWorkDuration.pastWorkEndDate
                    .toISOString()
                    .split("T")[0]
                }
              </span>
              <span>{experience.pastWorkPosition}</span>
            </div>
          ))
        ) : (
          <S.DataNullBox>등록된 경력이 없습니다.</S.DataNullBox>
        )}
      </div>
    </>
  );
};

export default FreelancerResume;
