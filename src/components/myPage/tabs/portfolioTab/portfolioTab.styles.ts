import { Button } from "antd";
import { styled } from "styled-components";

export const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  PortfolioListImg: styled.div`
    background-color: #8080803d;
    width: 100%;
    border-radius: 20px;
  `,

  PortfolioListWrapper: styled.div`
    margin-top: 5px;
    height: 60vh;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 320px 320px 320px 320px;
    grid-template-rows: 340px 340px 340px 340px;
    gap: 10px;
  `,
  PortfolioTitle: styled.p`
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  PortfolioAdd: styled.div`
    background-color: #8080803d;
    border-radius: 20px;
  `,
  PortfolioList: styled.div`
    width: 100%;
    height: 340px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 320px;
      object-fit: cover;
    }
  `,
  Button: styled(Button)`
    background-color: var(--main-blue);
  `,
  PortfolioAddButton: styled.button`
    border: none;
    background-color: transparent;
    border-radius: 15px;
    width: 320px;
    height: 320px;
    font-size: 20px;
  `,
};
