import { Button } from "antd";
import { styled } from "styled-components";

export const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    height: 90%;
    padding: 0px 10px 10px 0;
    position: relative;
  `,
  PortfolioListImg: styled.div`
    background-color: #8080803d;
    width: 100%;
    border-radius: 20px;
  `,
  PortfolioListWrapper: styled.div`
    padding-top: 5px;
    max-height: 60vh;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  PortfolioList: styled.div`
    width: 250px;
    height: 275px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    margin: 15px 15px 0 0;

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
    background-color: transparent;
    color: var(--main-blue);
    border: 1px solid var(--main-blue);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  PortfolioTitleAndButtonWrapper: styled.div`
    display: flex;
    width: 100%;
    padding-top: 10px;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
  `,

  PortfolioTabTitle: styled.h3`
    font-size: 18px;
    font-weight: bold;
  `,

  PortfolioTitle: styled.h4`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 5px;
  `,
};
