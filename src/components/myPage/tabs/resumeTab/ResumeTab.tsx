import { styled } from "styled-components";
import ResumeExperienceComp from "./ResumeExperienceComp";
import ResumeProfileIntroComp from "./ResumeProfileIntroComp";
import React from "react";
import { S } from "./ResumeStyles";

const ResumeTab = () => {
  return (
    <S.Container>
      <ResumeProfileIntroComp />
      <ResumeExperienceComp />
    </S.Container>
  );
};

export default ResumeTab;
