import { styled } from "styled-components";

export const S = {
  ModalTitle: styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  ProfileInfo: styled.div`
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
    flex-direction: column;
    gap: 5px;
    justify-content: center;
  `,
  Contacts: styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
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
  ContentTitle: styled.span`
    font-size: 15px;
    font-weight: bold;
  `,
  WorkField: styled.span`
    color: gray;
    font-weight: bold;
  `,
  WorkExp: styled.span`
    color: gray;
  `,
  DateInnerText: styled.span`
    color: gray;
    font-size: 12px;
  `,
};
