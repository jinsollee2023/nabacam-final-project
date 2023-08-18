import { styled } from "styled-components";

interface TaskDetailBoxProps {
  backgroundColor?: string;
  width: number;
}

const S = {
  TaskCardContainer: styled.div`
    display: flex;
    align-items: center;
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
  `,
  TaskTitleInput: styled.input`
    height: 50px;
    width: 200px;
    text-align: center;
  `,
  // StatusOptionBox: styled.div`
  //   position: absolute;
  //   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  // `,
};

export default S;
