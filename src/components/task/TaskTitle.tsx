import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { updateTaskTitle } from "../../api/Task";
import { queryClient } from "../../App";
import S from "./TaskStyles";
import { Task } from "../../Types";

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
      setIsTitleEditable(false);
      updateTaskTitleMutation.mutate();
    }
  };

  const updateTaskTitleMutation = useMutation(
    () => updateTaskTitle(task.taskId, title),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`task ${task.projectId}`]);
      },
    }
  );

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
