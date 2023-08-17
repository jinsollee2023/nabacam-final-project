import TaskCard from "./TaskCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addTasks, getTasks } from "../../api/Task";
import { styled } from "styled-components";
import { queryClient } from "../../App";

const TaskBox = () => {
  const projectId = "3edfcbdd-27a6-4722-a01b-c50aa0167752";
  const { data: tasks } = useQuery([`task ${projectId}`], async () => {
    const tasksData = await getTasks(projectId);
    return tasksData;
  });
  console.log(tasks);

  const addTaskMutation = useMutation(() => addTasks(projectId), {
    onSuccess: () => {
      queryClient.invalidateQueries([`task ${projectId}`]);
    },
  });

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
