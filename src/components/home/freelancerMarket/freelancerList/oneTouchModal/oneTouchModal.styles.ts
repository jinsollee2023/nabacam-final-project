import { styled } from "styled-components";

export const S = {
  ModalContainer: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  ModalTitle: styled.h3`
    font-size: 20px;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 10px;
  `,

  ProjectListWrapper: styled.div`
    overflow-y: auto;
    padding: 20px 0;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  `,

  ProjectItem: styled.div<{ isselected?: boolean }>`
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 75px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #a9e2f3;
    }

    border: ${({ isselected }) => (isselected ? "2px solid #58ACFA" : "none")};
    background-color: ${({ isselected }) =>
      isselected ? "#a9e2f3" : "rgba(0, 0, 0, 0.1)"};
  `,

  ProjectItemTitle: styled.h4`
    font-weight: bold;
    margin-bottom: 10px;
  `,

  ProjectItemDeadLine: styled.span`
    font-size: 14px;
  `,
};
