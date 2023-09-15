import React from "react";
import { S } from "./resume.styles";
import ResumeProfileIntroComp from "./ResumeProfileIntroComp";
import ResumeExperienceComp from "./ResumeExperienceComp";

const ResumeTab = () => {
  return (
    <S.Container>
      <S.ContainerInner>
        <ResumeProfileIntroComp />
        <ResumeExperienceComp />
      </S.ContainerInner>
    </S.Container>
  );
};

export default ResumeTab;
