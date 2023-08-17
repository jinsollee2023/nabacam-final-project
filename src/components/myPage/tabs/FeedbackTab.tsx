import React from "react";
import { styled } from "styled-components";

const FeedbackTab = () => {
  return (
    <S.FeedbackContainer>
      <S.FeedbackInner>
        <S.FeedbackProvider>
          <p>삼성/디자인 프로젝트</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
        </S.FeedbackProvider>

        <S.FeedbackBody>feedback1</S.FeedbackBody>
      </S.FeedbackInner>

      <S.FeedbackInner>
        <S.FeedbackProvider>
          <p>네이버/FE 프로젝트</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
        </S.FeedbackProvider>
        <S.FeedbackBody>feedback1</S.FeedbackBody>
      </S.FeedbackInner>

      <S.FeedbackInner>
        <S.FeedbackProvider>
          <p>카카오/FE 프로젝트</p>
          <p>⭐️⭐️⭐️⭐️⭐️</p>
        </S.FeedbackProvider>
        <S.FeedbackBody>feedback1</S.FeedbackBody>
      </S.FeedbackInner>
    </S.FeedbackContainer>
  );
};

export default FeedbackTab;

const S = {
  FeedbackContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  FeedbackInner: styled.div`
    margin-bottom: 10px;
  `,
  FeedbackProvider: styled.div`
    background-color: #80808078;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  `,
  FeedbackBody: styled.div`
    background-color: #1a191978;
    padding: 10px;
  `,
};
