import { Task } from "../../../Types";
import { AiFillStar } from "react-icons/ai";
import S from "./TaskStyles";
import useTasksQueries from "../../../hooks/useTasksQueries";
import React from "react";

interface TaskImportanceProps {
  task: Task;
  userRole: string;
}

const TaskImportance = ({ task, userRole }: TaskImportanceProps) => {
  const { updateTaskImportanceMutation } = useTasksQueries(task.projectId);

  const importanceIconOnClickHandler = (importance: number) => {
    if (userRole === "freelancer")
      updateTaskImportanceMutation.mutate({
        taskId: task.taskId,
        importance,
      });
  };

  const yellowStars = task.importance;
  const greyStars = 5 - yellowStars;

  return (
    <div style={{ width: "25%" }}>
      <S.TaskDetailBox>
        {Array.from({ length: yellowStars }, (_, index) => {
          return (
            <span
              key={index}
              style={{ color: "yellow" }}
              onClick={() => importanceIconOnClickHandler(index + 1)}
            >
              <AiFillStar />
            </span>
          );
        })}
        {Array.from({ length: greyStars }, (_, index) => {
          return (
            <span
              key={index}
              style={{ color: "grey" }}
              onClick={() =>
                importanceIconOnClickHandler(yellowStars + index + 1)
              }
            >
              <AiFillStar />
            </span>
          );
        })}
      </S.TaskDetailBox>
    </div>
  );
};

export default TaskImportance;
