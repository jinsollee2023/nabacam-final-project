import { styled } from "styled-components";

export const S = {
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
  `,
  ListContainer: styled.div`
    overflow: auto;
    height: 45rem;
  `,
  List: styled.div`
    margin-top: 30px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    margin-bottom: 25px;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  `,
  ListContents: styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    text-align: center;
  `,
  FreelancerName: styled.span`
    font-size: 20px;
  `,
  WorkFieldAndWorkExp: styled.span`
    color: gray;
  `,
  ProjectContents: styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
  `,
  ProjectTitle: styled.span`
    white-space: nowrap;
  `,
  CheckingBtn: styled.button`
    width: 130px;
    height: 30px;
    border: none;
    border-radius: 10px;
    background-color: #0086d0;
    color: white;
    cursor: pointer;
  `,
  ContractBtn: styled.button`
    width: 50%;
    height: 35px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    margin-top: 8px;
    cursor: pointer;
    background-color: #0086d0;
    color: white;
  `,
  PendingBtn: styled.button`
    width: 50%;
    height: 35px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    margin-top: 8px;
    cursor: pointer;
  `,
  ModalTitle: styled.div`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: 30px;
  `,
  DataStatus: styled.div`
    margin: 10px;
  `,
};
