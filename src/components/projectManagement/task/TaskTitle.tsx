import { ChangeEvent, useState } from "react";
import S from "./TaskStyles";
import { Task } from "../../../Types";
import useTasksQueries from "../../../hooks/useTasksQueries";

interface TaskTitleProps {
  task: Task;
  userRole: string;
}

const TaskTitle = ({ task, userRole }: TaskTitleProps) => {
  const [title, setTitle] = useState(task.title);
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const handleTitleDoubleClick = () => {
    if (userRole === "freelancer") setIsTitleEditable(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateTaskTitleMutation.mutate({ taskId: task.taskId, title });
    setIsTitleEditable(false);
  };

  const { updateTaskTitleMutation } = useTasksQueries(task.projectId);

  return (
    <S.TaskDetailBoxWrapper width="24%">
      <S.TaskDetailBox onDoubleClick={handleTitleDoubleClick}>
        {isTitleEditable ? (
          <form onSubmit={handleKeyDown}>
            <S.TaskTitleInput
              type="text"
              value={title}
              onChange={handleChange}
            />
          </form>
        ) : (
          <p>{task.title}</p>
        )}
      </S.TaskDetailBox>
    </S.TaskDetailBoxWrapper>
  );
};

export default TaskTitle;
