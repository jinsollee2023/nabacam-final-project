import { Task } from "../../../Types";
import S from "./TaskStyles";
import TaskTitle from "./TaskTitle";
import TaskStatus from "./TaskStatus";
import TaskImportance from "./TaskImportance";
import useTasksQueries from "../../../hooks/useTasksQueries";
import TaskDeadLine from "./TaskDeadLine";
import { BsTrash3Fill } from "react-icons/bs";
import TaskMonth from "./TaskMonth";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTaskMutation } = useTasksQueries(task.projectId);

  const deleteTaskButtonHandler = () => {
    deleteTaskMutation.mutate(task.taskId);
  };

  return (
    <S.TaskCardBox>
      <TaskMonth task={task as Task} />
      <TaskTitle task={task as Task} />
      <TaskStatus task={task as Task} />
      <TaskDeadLine task={task as Task} />
      <TaskImportance task={task as Task} />
      <div>
        <S.TaskDeleteButton onClick={deleteTaskButtonHandler}>
          <BsTrash3Fill />
        </S.TaskDeleteButton>
      </div>
    </S.TaskCardBox>
  );
};

export default TaskCard;
