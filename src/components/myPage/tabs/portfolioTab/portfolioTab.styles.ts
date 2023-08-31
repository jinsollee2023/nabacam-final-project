import { styled } from "styled-components";

export const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    padding: 10px;
    border: 1px solid gray;
  `,
  PortfolioListWrapper: styled.div`
    margin-top: 5px;
    display: grid;
    grid-template-columns: 130px 130px 130px 130px;
    grid-template-rows: 130px;
    gap: 20px;
  `,
  PortfolioList: styled.div`
    background-color: #8080803d;
    width: 130px;
    height: 130px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};
