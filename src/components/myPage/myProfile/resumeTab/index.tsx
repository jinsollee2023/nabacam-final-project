import React from "react";
import ResumeProfileIntroComp from "./ResumeProfileIntroComp";
import ResumeExperienceComp from "./ResumeExperienceComp";
import { S } from "./resume.styles";

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
