import { styled } from "styled-components";

export const S = {
  UserInfoBox: styled.div`
    display: flex;
    gap: 10px;
    text-align: center;
    align-items: center;
  `,
  ProfileImgBox: styled.div`
    width: 80px;
    height: 80px;
    border-radius: 30%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  `,
  UserWorkField: styled.p`
    font-size: 14px;
    color: gray;
  `,
  ResumeContent: styled.p`
    margin: 10px 0;
    font-size: 20px;
    font-weight: bold;
  `,
  ProfileIntro: styled.div`
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    min-height: 70px;
    max-height: 100px;
    font-size: 18px;
    word-break: break-all;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  PortfolioBox: styled.div`
    display: flex;
    gap: 10px;
  `,
  PortfolioImg: styled.img`
    border-radius: 15px;
    width: 100px;
    height: 100px;
  `,
  PortfolioCmt: styled.p`
    margin-top: 5px;
    font-size: 14px;
  `,
  DataNullBox: styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  `,
  BtnBox: styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
  `,
  Btn: styled.button`
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 10px;
  `,
};