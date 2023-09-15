import { ChangeEvent, useEffect, useRef, useState } from "react";
import S from "./task.styles";
import { Task } from "../../../Types";
import useTasksQueries from "../../../hooks/queries/useTasksQueries";

interface TaskTitleProps {
  task: Task;
  userRole: string;
}

const TaskTitle = ({ task, userRole }: TaskTitleProps) => {
  const [title, setTitle] = useState(task.title);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, [isTitleEditable]);

  const handleTitleDoubleClick = () => {
    if (userRole === "freelancer") setIsTitleEditable(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const titleSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateTaskTitleMutation.mutate({ taskId: task.taskId, title });
    setIsTitleEditable(false);
  };

  const { updateTaskTitleMutation } = useTasksQueries(task.projectId);

  return (
    <S.TaskDetailBoxWrapper width="24%">
      <S.TaskDetailBox
        onDoubleClick={handleTitleDoubleClick}
        cursor={userRole === "freelancer" ? "pointer" : null}
      >
        {isTitleEditable ? (
          <form onSubmit={titleSubmitHandler}>
            <S.TaskTitleInput
              ref={titleInput}
              type="text"
              value={title}
              onChange={handleChange}
              onBlur={titleSubmitHandler}
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
