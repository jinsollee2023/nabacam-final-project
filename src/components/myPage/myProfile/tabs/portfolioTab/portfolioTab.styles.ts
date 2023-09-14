import { Button } from "antd";
import { styled } from "styled-components";

export const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    height: 66vh;
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
    display: flex;
    flex-wrap: wrap;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  PortfolioTitle: styled.p`
    align-items: center;
    display: flex;
    justify-content: center;
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
    bottom: -20px;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
  `,
};
