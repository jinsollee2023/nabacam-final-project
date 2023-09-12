import { styled } from "styled-components";

export const S = {
  SearchBox: styled.div`
    display: flex;
  `,
  SelectBox: styled.div`
    margin-bottom: 20px;
  `,
  FilterBtn: styled.button`
    margin: 0 15px;
    height: 47px;
    min-width: 120px;
    width: 10%;
    background-color: transparent;
    border: solid 1px var(--darker-gray);
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  `,
  listContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    height: 48vh;
    overflow: auto;

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
  OngoingFreelancerlistContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    height: 64vh;
    overflow: auto;
  `,
  ListsBox: styled.div`
    border: 1.5px solid #d6d6d6;
    border-radius: 10px;
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
  NameAndWorkFieldWrapper: styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 5px;
  `,
  Name: styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  `,
  WorkField: styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #3d3d3d;
  `,
  WorkSmallFieldAndWorkExp: styled.span`
    font-size: 14px;
    color: #595959;
    margin-bottom: 10px;
  `,
  ContactBox: styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 5px;
  `,
  Contact: styled.span`
    gap: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
    font-size: 14px;
  `,
  DateInnerText: styled.span`
    color: #595959;
    font-size: 13px;
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
  SearchItemBarAndFilterBtnWrapper: styled.div`
    display: flex;
    width: 98%;
    min-width: 400px;
  `,
};
