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
      <S.ExperienceWarp>
        {user.resumeExperience && user.resumeExperience.length > 0 ? (
          user.resumeExperience.map((experience, index) => (
            <S.ExperienceBox key={index}>
              <span>{experience.pastWorkPlace}</span>
              <span>
                {experience.pastWorkDuration.pastWorkStartDate} -
                {experience.pastWorkDuration.pastWorkEndDate}
              </span>
              <span>{experience.pastWorkPosition}</span>
            </S.ExperienceBox>
          ))
        ) : (
          <S.DataNullBox>등록된 경력이 없습니다.</S.DataNullBox>
        )}
      </S.ExperienceWarp>
    </>
  );
};

export default FreelancerResume;
