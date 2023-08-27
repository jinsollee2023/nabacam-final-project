import { styled } from "styled-components";

export const S = {
  listContainer: styled.div`
    display: flex;
    margin: 15px;
    gap: 20px;
  `,
  ListsBox: styled.div`
    border: 1px solid #0086d0;
    border-radius: 15px;
    width: 400px;
    height: 300px;
    display: table;
  `,
  Profile: styled.div`
    display: table-cell;
    vertical-align: middle;
  `,
  ProfileContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  ContentContainer: styled.div`
    display: flex;
  `,
  ImgBox: styled.div`
    width: 100px;
    height: 100px;
    border-radius: 30%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ProfileContents: styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  `,
  Name: styled.span`
    font-size: 20px;
    font-weight: bold;
  `,
  WorkField: styled.span`
    font-weight: bold;
    color: gray;
  `,
  WorkSmallField: styled.span`
    color: gray;
  `,
  WorkExp: styled.span`
    color: gray;
  `,
  ContactBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Contact: styled.span``,

  Line: styled.hr`
    width: 90%;
    background-color: gray;
  `,
  OngoingProject: styled.span`
    font-weight: bold;
    font-size: 20px;
  `,
  ProjectTitle: styled.span`
    font-size: 18px;
  `,
  ProjectDate: styled.span``,
  DetailBtn: styled.button`
    border: 1px solid gray;
    border-radius: 10px;
    width: 90%;
    height: 35px;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
  `,
};
