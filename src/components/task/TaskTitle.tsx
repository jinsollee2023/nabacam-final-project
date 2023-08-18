import { ChangeEvent, useState } from "react";
import S from "./TaskStyles";
import { Task } from "../../Types";
import useTasksQueries from "../../hooks/useTasksQueries";

interface TaskTitleProps {
  task: Task;
}

const TaskTitle = ({ task }: TaskTitleProps) => {
  const [title, setTitle] = useState(task.title);
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const handleTitleDoubleClick = () => {
    setIsTitleEditable(true);
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
    <S.TaskDetailBox width={200} onDoubleClick={handleTitleDoubleClick}>
      {isTitleEditable ? (
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p>{task.title}</p>
      )}
    </S.TaskDetailBox>
  );
};

export default TaskTitle;
