import { styled } from "styled-components";

export const S = {
  UnderLine: styled.hr`
    height: 1.5px;
    border: 0;
    background-color: #bfbfbf;
  `,
  UserName: styled.span`
    display: flex;
    font-size: 16px;
    font-weight: bold;
  `,
  ModalTitle: styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  UserInfoBox: styled.div`
    display: flex;
    gap: 10px;
    text-align: center;
    align-items: center;
  `,
  ProfileImgBox: styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  `,
  WorkField: styled.span`
    display: flex;
    font-size: 14px;
    color: #3d3d3d;
  `,
  WorkSmallFieldAndWorkExp: styled.span`
    gap: 5px;
    display: flex;
    font-size: 12px;
    color: #3d3d3d;
  `,

  ResumeContent: styled.p`
    margin: 20px 0;
    font-size: 20px;
    font-weight: bold;
  `,
  ProfileIntro: styled.div`
    width: 100%;
    font-size: 16px;
    word-break: break-all;
  `,
  ContactBox: styled.div`
    gap: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  `,
  Contacts: styled.span`
    display: flex;
    font-size: 14px;
  `,
  PortfolioBox: styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  `,

  ImgBox: styled.div`
    width: 100px;
    height: 100px;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  PortfolioImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    cursor: pointer;
  `,
  ExperienceWarp: styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    flex-flow: row wrap;
  `,
  ExperienceBox: styled.div`
    border: 1.5px solid #0086d0;
    border-radius: 4px;
    min-width: 210px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    word-break: break-all;
    gap: 5px;
  `,
  PastWorkPlace: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,
  PastWorkInfo: styled.span`
    font-size: 14px;
  `,
  PastWorkDate: styled.span`
    font-size: 12px;
    color: #595959;
  `,
};
