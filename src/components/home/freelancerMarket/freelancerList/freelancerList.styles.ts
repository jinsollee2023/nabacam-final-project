import { styled, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface IndicatorProps {
  selected: boolean;
  onClick: () => void;
}

interface PortfolioItemProps {
  isselected: boolean;
}

export const S = {
  FreelancerListContainer: styled.div`
    width: 100%;
    height: 72.5vh;
    overflow-y: scroll;
    margin-top: 20px;

    display: grid;
    grid-template-columns: 475px 475px 475px;
    grid-template-rows: 350px 350px 350px;
    gap: 20px;

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

  FreelancerList: styled.ul`
    width: 455px;
  `,

  PortfolioItem: styled.div<PortfolioItemProps>`
    position: relative;
    display: ${(props) => (props.isselected ? "block" : "none")};
  `,

  PortfoliothumbNailImageBox: styled.div`
    width: 455px;
    height: 250px;
    border-radius: 15px;
    background-color: #403e3e;
    overflow: hidden;
    animation: ${fadeIn} 0.2s ease-in-out;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,

  PortfolioTitleBox: styled.div`
    width: 455px;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  `,

  PortfolioTitle: styled.h6`
    font-weight: bold;
  `,

  MiniProfileBox: styled.li`
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-radius: 15px;
    width: 455px;
  `,

  PortfolioList: styled.ul`
    display: flex;
    width: 455px;
    overflow: hidden;
  `,

  indicatorWrapper: styled.div`
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  `,

  Indicator: styled.span<IndicatorProps>`
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: 0.5s;
    background-color: ${(props) => (props.selected ? "black" : "gray")};
  `,

  SuggestButton: styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
    &:hover:not(:hover) {
      transform: scale(1);
    }
  `,

  FreelancerContentBox: styled.div`
    display: flex;
    align-items: end;
    cursor: pointer;

    span {
      margin: 0 3px;
    }
  `,

  FreelancerName: styled.span`
    font-weight: bold;
    color: #045fb4;
    font-size: 18px;
    margin-right: 5px;
  `,

  FreelancerContent: styled.span`
    font-size: 14px;
  `,

  ModalInnerButton: styled.button`
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 40px;
    cursor: pointer;
  `,
  FreelancerInfoModalBtn: styled.button`
    width: 100%;
    height: 35px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    margin-top: 8px;
  `,
};
