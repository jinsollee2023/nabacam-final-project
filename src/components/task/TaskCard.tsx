import { Task } from "../../Types";
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "../../api/Task";
import { queryClient } from "../../App";
import S from "./TaskStyles";
import TaskTitle from "./TaskTitle";
import TaskStatus from "./TaskStatus";
import TaskImportance from "./TaskImportance";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const deleteTaskMutation = useMutation(() => deleteTask(task.taskId), {
    onSuccess: () => {
      queryClient.invalidateQueries([`task ${task.projectId}`]);
    },
  });

  const deleteTaskButtonHandler = () => {
    deleteTaskMutation.mutate();
  };

  return (
    <S.TaskCardContainer>
      <TaskTitle task={task as Task} />
      <TaskStatus task={task as Task} />
      <S.TaskDetailBox width={100}>{task.deadLine}</S.TaskDetailBox>
      <TaskImportance task={task as Task} />
      <button onClick={deleteTaskButtonHandler}>삭제</button>
    </S.TaskCardContainer>
  );
};

export default TaskCard;
