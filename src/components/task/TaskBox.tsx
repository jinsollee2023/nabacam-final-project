import TaskCard from "./TaskCard";
import { styled } from "styled-components";
import useTasksQueries from "../../hooks/useTasksQueries";

const TaskBox = () => {
  const projectId = "3edfcbdd-27a6-4722-a01b-c50aa0167752";
  const { tasks, addTaskMutation } = useTasksQueries(projectId);

  const addTaskButtonHandler = () => {
    addTaskMutation.mutate();
  };

  return (
    <S.TaskBoxContainer>
      {tasks &&
        tasks.map((task) => {
          return <TaskCard task={task} key={task.taskId} />;
        })}
      <button onClick={addTaskButtonHandler}>추가</button>
    </S.TaskBoxContainer>
  );
};

export default TaskBox;

const S = {
  TaskBoxContainer: styled.div`
    background-color: green;
  `,
};
