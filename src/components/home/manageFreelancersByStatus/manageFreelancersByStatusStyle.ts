import { styled } from "styled-components";

export const S = {
  Title: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,
  ListContainer: styled.div`
    overflow: auto;
    height: 45rem;
  `,
  List: styled.div`
    padding: 0 20px;
    width: 100%;
    height: 70px;
    display: flex;
    margin: 10px 0;
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
  Recruiting: styled.span`
    width: 62px;
    padding: 5px;
    margin-right: 5px;
    border-radius: 5px;
    color: #0086d0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background-color: aliceblue;
  `,
  RecruitmentCompleted: styled.span`
    width: 62px;
    padding: 5px;
    margin-right: 5px;
    border-radius: 5px;
    color: var(--darker-gray);
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background-color: #f6f6f6;
  `,

  FreelancerName: styled.span`
    font-size: 16px;
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
    font-size: 14px;
    white-space: nowrap;
    color: #595959;
  `,
  CheckingBtn: styled.button`
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 10px;
    background-color: #0086d0;
    font-size: 14px;
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
  DisabledBtn: styled.button`
    width: 100%;
    height: 35px;
  `,
};
