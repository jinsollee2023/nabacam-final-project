import { Button } from "antd";
import { styled } from "styled-components";

interface ProjectStatusProps {
  recruitmentCompleted: boolean;
}

export const S = {
  ProjectListContainer: styled.div`
    height: 86vh;
    overflow-y: auto;
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
  ProjectCardContainer: styled.div`
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    min-width: 1020px;
    width: 100%;
    height: 70px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ProejctContentLeftWrapper: styled.div`
    display: flex;
    align-items: center;
    min-width: 770px;
  `,
  ProejctContentRightWrapper: styled.div`
    min-width: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
  `,

  ProjectStatus: styled.span<ProjectStatusProps>`
    width: 62px;
    text-align: center;
    margin-right: 5px;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 14px;

    ${(props) =>
      props.recruitmentCompleted
        ? `
      background-color: aliceblue;
      color: #0086d0;
    `
        : `
      background-color: #f6f6f6;
      color: #A1a1a1;
    `}
  `,
  AppliedCancleButton: styled.button`
    border: 1px solid #d32828;
    background-color: transparent;
    margin: 0 7px 5px 0px;
    font-weight: bold;
    color: #d32828;
    border-radius: 5px;
  `,

  ClientName: styled.span`
    width: 130px;
    text-align: center;
  `,

  ProjectName: styled.span`
    font-weight: bold;
    font-size: 17px;
    margin: 0px 10px;
  `,
  ProejctContentRightTextWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    color: gray;
    margin-top: 3px;
  `,

  Button: styled(Button)`
    background-color: var(--main-blue);

    &:hover {
      background-color: var(--hover-blue);
    }
  `,

  DetailModalOpenButton: styled.button`
    background-color: var(--main-blue);
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
  `,

  AppliedFreelancersCountBox: styled.div`
    margin-left: 10px;
    width: 100px;
    display: flex;
    justify-content: space-between;
    color: gray;
  `,

  ProjectRegistrationDate: styled.span`
    width: 80px;
    text-align: center;
  `,
};
