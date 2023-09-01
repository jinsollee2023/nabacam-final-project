import { styled } from "styled-components";
import ResumeExperienceComp from "./ResumeExperienceComp";
import ResumeProfileIntroComp from "./ResumeProfileIntroComp";
import React from "react";
import { S } from "./Resume.styles";

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
