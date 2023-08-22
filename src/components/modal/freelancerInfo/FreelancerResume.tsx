import React from "react";
import { S } from "./freelancerInfoStyle";

const FreelancerResume = () => {
  return (
    <>
      <S.ResumeContent>프로필</S.ResumeContent>
      <S.ProfileBox></S.ProfileBox>
      <S.ResumeContent>경력 사항</S.ResumeContent>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            width: "50%",
            height: "100px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            width: "50%",
            height: "100px",
          }}
        ></div>
      </div>
    </>
  );
};

export default FreelancerResume;
