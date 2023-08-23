import { styled } from "styled-components";

export const S = {
  ModalTitle: styled.div`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin: 30px;
  `,
  ProjectConditions: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
    align-items: center;

    justify-content: space-between;
  `,
  ProjectConditionTitle: styled.span`
    color: gray;
    font-size: 15px;
    line-height: 25px;
  `,
  ProjectDeadLineBox: styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 12rem;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ProjectPayBox: styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 12rem;
    height: 50px;
    border-radius: 10px;
    position: relative;
  `,
  ProjectPayContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
};
