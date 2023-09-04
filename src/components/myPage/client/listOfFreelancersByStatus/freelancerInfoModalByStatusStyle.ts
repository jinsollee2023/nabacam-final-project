import { styled } from "styled-components";

export const S = {
  ModalTitle: styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  ProjectTitleContents: styled.p`
    margin: 20px 0;
    font-size: 16px;
    font-weight: bold;
  `,
  ProjectWarp: styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
  `,
  ProjectBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ProjectTitle: styled.span`
    font-size: 14px;
  `,
  ProjectDate: styled.span`
    font-size: 12px;
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
