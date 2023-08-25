import React, { useState } from "react";
import { styled } from "styled-components";
import PortfolioAddModal from "./PortfolioAddModal";

const PortfolioTab = () => {
  const [open, setOpen] = useState(false);

  return (
    <S.PortfolioListContainer>
      <S.PortfolioListWrapper>
        <S.PortfolioList onClick={() => setOpen(true)}>
          + 포트폴리오 첨부하기
        </S.PortfolioList>
        <PortfolioAddModal open={open} setOpen={setOpen} />
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
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  PortfolioList: styled.div`
    background-color: #8080803d;
    width: 130px;
    height: 130px;
    margin-right: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 13px;
    padding: 10px;
    list-style: none;
  `,
};
