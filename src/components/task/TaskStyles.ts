import { styled } from "styled-components";

interface TaskDetailBoxProps {
  backgroundColor?: string;
  width: number;
}

interface ColumnLabelProps {
  backgroundColor?: string;
  width: number;
}

const S = {
  TaskCardContainer: styled.div`
    display: flex;
  `,
  TaskDetailBox: styled.div<TaskDetailBoxProps>`
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : "#d3d3d3"};
    width: ${(props) => props.width}px;
    height: 50px;
    margin: 5px 10px 5px 0;
    border-radius: 3px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TaskDeleteButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  `,
  SelectAddButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  TaskAddButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,
  ColumnLabelWrapper: styled.div`
    display: flex;
    margin: 20px 0 0 10px;
  `,
  ColumnLabel: styled.div<ColumnLabelProps>`
    width: ${(props) => props.width}px;
    height: 30px;
    margin: 0px 10px 0px 0;

    display: flex;
    align-items: end;
  `,
  TaskTitleInput: styled.input`
    height: 50px;
    width: 200px;
    text-align: center;
  `,
};

export default S;
