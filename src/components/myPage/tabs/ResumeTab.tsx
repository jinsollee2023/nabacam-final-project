import { styled } from "styled-components";
import React from "react";

const ResumeTab = () => {
  return (
    <>
      <S.ProfileContainer>
        <p>프로필</p>
        <S.ProfileInputBox>bla</S.ProfileInputBox>
      </S.ProfileContainer>
      <S.WorkExperienceContainer>
        <p>경력사항</p>
        <S.WorkExperienceListWrapper>
          <S.WorkExperienceList>IT스타트업직원</S.WorkExperienceList>
          <S.WorkExperienceList>디자이너</S.WorkExperienceList>
          <S.WorkExperienceList>사무직</S.WorkExperienceList>
          <S.WorkExperienceList>PM</S.WorkExperienceList>
          <S.WorkExperienceList>마케터</S.WorkExperienceList>
          <S.WorkExperienceList>sales</S.WorkExperienceList>
          <S.WorkExperienceList>매니저</S.WorkExperienceList>
          <S.WorkExperienceList>데이터분석가</S.WorkExperienceList>
          <S.WorkExperienceList>엔지니어</S.WorkExperienceList>
        </S.WorkExperienceListWrapper>
        <S.WorkExperienceAddBtn>+ 경력 추가하기</S.WorkExperienceAddBtn>
      </S.WorkExperienceContainer>
    </>
  );
};

export default ResumeTab;

const S = {
  ProfileContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  ProfileInputBox: styled.div`
    background-color: #8080803d;
    padding: 10px;
    margin-top: 5px;
  `,
  WorkExperienceContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  WorkExperienceListWrapper: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  WorkExperienceList: styled.li`
    background-color: #8080803d;
    padding: 20px;
    list-style: none;
  `,
  WorkExperienceAddBtn: styled.button`
    padding: 10px;
    margin-top: 30px;
  `,
};
