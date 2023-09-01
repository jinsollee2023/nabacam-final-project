import React from "react";
import { S } from "./freelancerInfoStyle";
import { IUser } from "../../../Types";

interface FreelancerResumeProps {
  user: IUser;
}

const FreelancerResume = ({ user }: FreelancerResumeProps) => {
  return (
    <>
      <S.ResumeContent>프로필</S.ResumeContent>
      <S.ProfileIntro>{user.resumeProfileIntro}</S.ProfileIntro>
      <S.ResumeContent>경력사항</S.ResumeContent>
      <S.ExperienceWarp>
        {user.resumeExperience && user.resumeExperience.length > 0 ? (
          user.resumeExperience.map((experience, index) => {
            const startDate = new Date(experience.pastWorkDuration.pastWorkStartDate);
            const endDate = new Date(experience.pastWorkDuration.pastWorkEndDate);

            return (
              <S.ExperienceBox key={`${experience.experienceId}-${index}`}>
                <S.PastWorkPlace>{experience.pastWorkPlace}</S.PastWorkPlace>
                <S.PastWorkInfo>
                  {experience.pastWorkField} / {experience.pastEmploymentType} /{" "}
                  {experience.pastWorkPosition}
                </S.PastWorkInfo>
                <S.PastWorkDate>
                  {startDate.toISOString().split("T")[0]}-{endDate.toISOString().split("T")[0]}
                </S.PastWorkDate>
              </S.ExperienceBox>
            );
          })
        ) : (
          <S.DataNullBox>등록된 경력이 없습니다.</S.DataNullBox>
        )}
      </S.ExperienceWarp>
    </>
  );
};

export default FreelancerResume;
