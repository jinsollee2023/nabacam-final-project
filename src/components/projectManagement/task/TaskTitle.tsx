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

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      updateTaskTitleMutation.mutate({ taskId: task.taskId, title });
      setIsTitleEditable(false);
    }
  };

  const { updateTaskTitleMutation } = useTasksQueries(task.projectId);

  return (
    <S.TaskDetailBoxWrapper width="24%">
      <S.TaskDetailBox onDoubleClick={handleTitleDoubleClick}>
        {isTitleEditable ? (
          <S.TaskTitleInput
            type="text"
            value={title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p>{task.title}</p>
        )}
      </S.TaskDetailBox>
    </S.TaskDetailBoxWrapper>
  );
};

export default TaskTitle;
