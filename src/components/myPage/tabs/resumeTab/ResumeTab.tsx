import { styled } from "styled-components";

import ResumeExperienceComp from "./ResumeExperienceComp";
import ResumeProfileIntroComp from "./ResumeProfileIntroComp";

const ResumeTab = () => {
  return (
    <>
      <ResumeProfileIntroComp />
      <ResumeExperienceComp />
    </>
  );
};

export default ResumeTab;
