import { styled } from "styled-components";

export const S = {
  ModalTitle: styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  ProjectTitleContents: styled.p`
    margin: 20px 0 10px 0;
    font-size: 16px;
    font-weight: bold;
  `,
  ProjectWarp: styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `,
  ProjectBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #f0f0f0;
    height: 70px;
    width: 31%;
    border-radius: 5px;
  `,
  ProjectTitle: styled.span`
    width: 100%;
    text-align: center;
    font-size: 15px;
  `,
  ProjectDate: styled.span`
    font-size: 14px;
  `,
  DateInnerText: styled.span`
    color: #595959;
    font-size: 10px;
  `,
  ProfileInfo: styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `,
  ImgBox: styled.div`
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 15%;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  Contact: styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
  `,
  Contacts: styled.div`
    gap: 5px;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    cursor: pointer;
  `,
  ProjectInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  `,
  ProjectContents: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    background-color: aliceblue;
  `,
  OngoingProjectTitle: styled.span`
    font-size: 14px;
  `,
  OngoingProjectDate: styled.span`
    font-size: 12px;
  `,
  ContentTitle: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,
  WorkField: styled.span`
    color: #595959;
    font-size: 14px;
    font-weight: bold;
  `,
  WorkExp: styled.span`
    color: #595959;
    font-size: 14px;
  `,
};
