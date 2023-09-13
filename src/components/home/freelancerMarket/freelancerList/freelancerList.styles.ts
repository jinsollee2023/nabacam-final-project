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
}

interface PortfolioItemProps {
  isselected: boolean;
}

export const S = {
  FreelancerListContainer: styled.div`
    max-width: 100%;
    min-width: 740px;
    height: 72.5vh;
    overflow-y: scroll;
    margin-top: 20px;
    padding: 5px 0 5px 5px;

    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-template-rows: 350px 350px 350px;
    grid-column-gap: 2%;
    grid-row-gap: 7%;

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
    width: 100%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    padding: 10px;
  `,

  PortfolioItem: styled.div<PortfolioItemProps>`
    width: 100%;
    display: ${(props) => (props.isselected ? "block" : "none")};
  `,

  PortfoliothumbNailImageBox: styled.div`
    box-shadow: 1px 1px 3px 1px #dadce0;
    width: 100%;
    height: 250px;
    border-radius: 15px;
    overflow: hidden;
    animation: ${fadeIn} 0.2s ease-in-out;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,

  PortfolioTitleBox: styled.div`
    max-width: 100%;
    min-width: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    margin-top: 3px;
  `,

  PortfolioTitle: styled.h6`
    font-weight: bold;
  `,

  MiniProfileBox: styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-radius: 15px;
    width: 100%;
    background-color: white;
  `,

  indicatorWrapper: styled.div`
    position: absolute;
    bottom: 7px;
    display: flex;
    width: 100%;
    justify-content: center;
  `,

  Indicator: styled.span<IndicatorProps>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 5px;
    transition: 0.5s;
    background-color: ${(props) =>
      props.selected ? "var(--main-blue)" : "var(--lighter-gray)"};
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
    color: var(--main-blue);
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
  FreelancerInfoModalButton: styled.button`
    width: 100%;
    height: 35px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #0086d0;
    color: white;
  `,
  ArrowIconWrapper: styled.div`
    position: absolute;
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: aliceblue;
  `,
  ArrowIconPrevBox: styled.div`
    position: absolute;
    left: 0;
  `,
  ArrowIconNextBox: styled.div`
    position: absolute;
    right: 0;
  `,
};
