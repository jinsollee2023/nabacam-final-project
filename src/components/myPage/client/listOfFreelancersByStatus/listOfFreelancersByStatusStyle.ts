import { styled } from "styled-components";

export const S = {
  FilterBtn: styled.button`
    position: absolute;
    /* 위치 변경 예정 */
    right: 300px;
    width: 90px;
    height: 30px;
    background-color: transparent;
    border: 2px solid #0086d0;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `,
  listContainer: styled.div`
    display: flex;
    margin: 15px;
    gap: 20px;
  `,
  ListsBox: styled.div`
    border: 2px solid #0086d0;
    border-radius: 10px;
    width: 280px;
    height: 350px;
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

  ProfileContents: styled.div`
    display: flex;
    flex-direction: column;
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
  WorkSmallFieldAndWorkExp: styled.span`
    color: gray;
  `,
  ContactBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

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
