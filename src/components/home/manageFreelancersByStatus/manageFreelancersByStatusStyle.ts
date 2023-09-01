import { styled } from "styled-components";

export const S = {
  Title: styled.span`
    font-size: 22px;
    font-weight: bold;
  `,
  ListContainer: styled.div`
    overflow: auto;
    height: 45rem;
  `,
  List: styled.div`
    margin-top: 30px;
    padding: 0 20px;
    width: 100%;
    height: 80px;
    display: flex;
    margin-bottom: 25px;
    border-radius: 8px;
    align-items: center;
    border: 1px solid #d6d6d6;
    justify-content: space-between;
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
    color: #595959;
  `,
  ProjectContents: styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
  `,
  ProjectTitle: styled.span`
    white-space: nowrap;
    color: #595959;
  `,
  CheckingBtn: styled.button`
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 15px;
    background-color: #0086d0;
    font-size: 18px;
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
