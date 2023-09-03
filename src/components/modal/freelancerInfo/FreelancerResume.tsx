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
            return (
              <S.ExperienceBox key={`${experience.experienceId}-${index}`}>
                <S.PastWorkPlace>{experience.pastWorkPlace}</S.PastWorkPlace>
                <S.PastWorkInfo>
                  {experience.pastWorkField} / {experience.pastEmploymentType} /{" "}
                  {experience.pastWorkPosition}
                </S.PastWorkInfo>
                <S.PastWorkDate>
                  {experience.pastWorkDuration.pastWorkStartDate &&
                    new Date(experience.pastWorkDuration.pastWorkStartDate)
                      .toISOString()
                      .split("T")[0]}
                  -
                  {experience.pastWorkDuration.pastWorkEndDate &&
                    new Date(experience.pastWorkDuration.pastWorkEndDate)
                      .toISOString()
                      .split("T")[0]}
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
