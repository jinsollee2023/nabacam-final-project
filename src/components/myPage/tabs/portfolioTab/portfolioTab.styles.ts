import { Button } from "antd";
import { styled } from "styled-components";

export const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    padding: 10px;
    position: relative;
  `,
  PortfolioListImg: styled.div`
    background-color: #8080803d;
    width: 100%;
    border-radius: 20px;
  `,

  PortfolioListWrapper: styled.div`
    padding-top: 5px;
    max-height: 63vh;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 255px 255px 255px 255px 255px;
    grid-template-rows: 275px;
    gap: 10px;

    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #848484;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #f3f3f3;
      border-radius: 10px;
    }
  `,
  PortfolioTitle: styled.p`
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  PortfolioList: styled.div`
    width: 100%;
    height: 275px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
  `,
  Button: styled(Button)`
    background-color: var(--main-blue);
  `,
  PortfolioAddButton: styled.button`
    background-color: var(--main-blue);
    color: white;
    border: none;
    border-radius: 15px;
    width: 500px;
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 35px;
    left: 50%;
    z-index: 1;
    transform: translateX(-25%);
    transition: transform 0.2s ease-in-out;
  `,
};
