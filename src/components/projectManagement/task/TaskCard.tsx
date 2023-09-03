import { Task } from "../../../Types";
import S from "./TaskStyles";
import TaskTitle from "./TaskTitle";
import TaskStatus from "./TaskStatus";
import TaskImportance from "./TaskImportance";
import useTasksQueries from "../../../hooks/useTasksQueries";
import TaskDeadLine from "./TaskDeadLine";
import { BsTrash3Fill } from "react-icons/bs";
import TaskMonth from "./TaskMonth";
import React from "react";

interface TaskCardProps {
  task: Task;
  userRole: string;
  month: string;
}

const TaskCard = ({ task, userRole, month }: TaskCardProps) => {
  const { deleteTaskMutation } = useTasksQueries(task.projectId);

  const deleteTaskButtonHandler = () => {
    deleteTaskMutation.mutate(task.taskId);
  };

  return (
    <S.TaskCardBox>
      <TaskMonth task={task as Task} userRole={userRole} month={month} />
      <TaskTitle task={task as Task} userRole={userRole} />
      <TaskStatus task={task as Task} userRole={userRole} />
      <TaskDeadLine task={task as Task} userRole={userRole} />
      <TaskImportance task={task as Task} userRole={userRole} />
      <div>
        {userRole === "freelancer" ? (
          <S.TaskDeleteButton onClick={deleteTaskButtonHandler}>
            <BsTrash3Fill />
          </S.TaskDeleteButton>
        ) : null}
      </div>
    </S.TaskCardBox>
  );
};

export default TaskCard;
