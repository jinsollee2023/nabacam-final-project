import { styled } from "styled-components";

export const S = {
  SearchBox: styled.div`
    display: flex;
  `,
  SelectBox: styled.div`
    margin-bottom: 20px;
  `,
  FilterBtn: styled.button`
    position: relative;
    margin: 15px;
    left: 10px;
    width: 90px;
    height: 30px;
    background-color: transparent;
    border: 1.5px solid #0086d0;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `,
  listContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    height: 61vh;
    overflow: auto;
  `,
  ListsBox: styled.div`
    border: 1.5px solid #d6d6d6;
    border-radius: 4px;
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
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
    font-size: 16px;
    font-weight: bold;
  `,
  WorkField: styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #3d3d3d;
  `,
  WorkSmallFieldAndWorkExp: styled.span`
    font-size: 14px;
    color: #595959;
  `,
  ContactBox: styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
  `,
  Contact: styled.span`
    font-size: 14px;
    cursor: pointer;
  `,

  Line: styled.hr`
    width: 90%;
    height: 1px;
    border: 0;
    background: #0086d0;
  `,
  ProjectTitle: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,
  ProjectSubTitle: styled.span`
    font-size: 14px;
  `,
  ProjectDate: styled.span`
    font-size: 12px;
  `,
  DateInnerText: styled.span`
    color: #595959;
    font-size: 12px;
  `,
  DetailBtn: styled.button`
    position: relative;
    border: 1px solid #0086d0;
    border-radius: 6px;
    width: 90%;
    height: 35px;
    margin-top: 5px;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer;
    color: #0086d0;
  `,
  ModalInnerBtn: styled.button`
    position: relative;
    border: none;
    border-radius: 6px;
    width: 100%;
    height: 35px;
    margin-top: 5px;
    font-size: 14px;
    cursor: pointer;
    color: white;
    background-color: #0086d0;
  `,
};
