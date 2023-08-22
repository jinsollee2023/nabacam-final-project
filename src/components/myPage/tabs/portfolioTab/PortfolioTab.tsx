import React from "react";
import { styled } from "styled-components";

const PortfolioTab = () => {
  return (
    <S.PortfolioListContainer>
      <S.PortfolioListWrapper>
        <S.PortfolioList>p1</S.PortfolioList>
        <S.PortfolioList>p2</S.PortfolioList>
        <S.PortfolioList>p3</S.PortfolioList>
        <S.PortfolioList onClick={() => {}}>+ 파일첨부하기</S.PortfolioList>
      </S.PortfolioListWrapper>
    </S.PortfolioListContainer>
  );
};

export default PortfolioTab;

const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  PortfolioListWrapper: styled.div`
    margin-top: 5px;
    display: flex;
  `,
  PortfolioList: styled.div`
    background-color: #8080803d;
    width: 130px;
    height: 130px;
    margin-right: 20px;
  `,
};
