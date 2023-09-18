import { styled } from "styled-components";

interface ProjectStatusProps {
  recruitmentCompleted: boolean;
}

export const S = {
  ProejctCardContainer: styled.div`
    min-width: 950px;
    width: 100%;
    height: 70px;
    border: 1px solid #d6d6d6;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  `,
  ProejctContentLeftWrapper: styled.div`
    display: flex;
    align-items: center;
    min-width: 700px;
  `,
  ProejctContentRightWrapper: styled.div`
    min-width: 215px;
    display: flex;
    align-items: center;
    flex-direction: row;
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
    color: var(--main-blue);
  `
        : `
    background-color: #f6f6f6;
    color: var(--darker-gray);
  `}
  `,
  AppliedFreelancersCountBox: styled.div`
    margin-right: 30px;
    width: 100px;
    display: flex;
    justify-content: space-between;
    color: gray;
  `,
  DetailModalOpenButton: styled.button`
    background-color: var(--main-blue);
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
  `,
  ClientName: styled.span`
    width: 130px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,

  ProjectName: styled.span`
    font-weight: bold;
    font-size: 17px;
  `,

  ProjectTagBox: styled.div`
    margin-top: 10px;
  `,
  ProjectTag: styled.span`
    border-radius: 5px;
    margin: 0 7px 0 0;
    font-size: 12px;
    padding: 4px 7px;
    background-color: #f0f0f0;
    color: gray;
  `,
  ProejctContentRightTextWrapper: styled.div`
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: gray;
    margin-top: 3px;
    width: 100%;
  `,
  ProjectRegistrationDate: styled.span`
    width: 80px;
    text-align: center;
  `,
};
