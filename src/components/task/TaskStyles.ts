import { styled } from "styled-components";

interface TaskDetailBoxProps {
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
    height: 70px;
    margin: 5px;
  `,
};

export default S;
