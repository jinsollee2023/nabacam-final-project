import { styled } from "styled-components";

export const S = {
  FreelancerListContainer: styled.div`
    width: 98%;
    height: 80vh;
    overflow-y: auto;
    margin-top: 20px;

    display: grid;
    grid-template-columns: 455px 455px;
	  grid-template-rows: 350px 350px;
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
    margin: 10px;
  `,

  PortfoliothumbNailImageBox: styled.div`
    width: 455px;
    height: 250px;
    border-radius: 15px;
    background-color: #403E3E;
    overflow: hidden;

    img{
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
    background-color: rgba(0,0,0,0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
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
  `
}