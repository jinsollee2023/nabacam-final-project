import { styled } from "styled-components";

import ResumeExperience from "./resumeTab/ResumeExperience";
import ResumeProfileIntro from "./resumeTab/ResumeProfileIntro";

const ResumeTab = () => {
  return (
    <>
      <ResumeProfileIntro />
      <ResumeExperience />
    </>
  );
};

export default ResumeTab;
