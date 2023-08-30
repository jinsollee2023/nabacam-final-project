import { styled } from "styled-components";

import ResumeExperienceComp from "./ResumeExperienceComp";
import ResumeProfileIntroComp from "./ResumeProfileIntroComp";

const ResumeTab = () => {
  return (
    <S.Container>
      <ResumeProfileIntroComp />
      <ResumeExperienceComp />
    </S.Container>
  );
};

export default ResumeTab;

const S = {
  Container: styled.div`
    width: 100%;
  `,
};
