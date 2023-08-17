import React, { useState } from "react";
import { Task } from "../../Types";
import { useMutation } from "@tanstack/react-query";
import { updateTaskImportance } from "../../api/Task";
import { queryClient } from "../../App";
import { AiFillStar } from "react-icons/ai";
import S from "./TaskStyles";

interface TaskImportanceProps {
  task: Task;
}

const TaskImportance = ({ task }: TaskImportanceProps) => {
  const [importance, setImportance] = useState(task.importance);

  const updateTaskImportanceMutation = useMutation(
    () => updateTaskImportance(task.taskId, importance),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`task ${task.projectId}`]);
      },
    }
  );

  const importanceIconOnClickHandler = (importanceNumber: number) => {
    setImportance(importanceNumber);
    updateTaskImportanceMutation.mutate();
  };

  const yellowStars = task.importance;
  const greyStars = 5 - yellowStars;

  return (
    <S.TaskDetailBox width={200}>
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
  );
};

export default TaskImportance;
