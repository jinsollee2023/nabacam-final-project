import { Task } from "../../Types";
import S from "./TaskStyles";
import TaskTitle from "./TaskTitle";
import TaskStatus from "./TaskStatus";
import TaskImportance from "./TaskImportance";
import useTasksQueries from "../../hooks/useTasksQueries";
import TaskDeadLine from "./TaskDeadLine";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTaskMutation } = useTasksQueries(task.projectId);

  const deleteTaskButtonHandler = () => {
    deleteTaskMutation.mutate(task.taskId);
  };

  return (
    <S.TaskCardContainer>
      <TaskTitle task={task as Task} />
      <TaskStatus task={task as Task} />
      <TaskDeadLine task={task as Task} />
      <TaskImportance task={task as Task} />
      <button onClick={deleteTaskButtonHandler}>삭제</button>
    </S.TaskCardContainer>
  );
};

export default TaskCard;
