import { styled } from "styled-components";
import React from "react";
import { S } from "./Resume.styles";
import ResumeProfileIntroComp from "./profileIntro/ResumeProfileIntroComp";
import ResumeExperienceComp from "./experience/ResumeExperienceComp";

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
