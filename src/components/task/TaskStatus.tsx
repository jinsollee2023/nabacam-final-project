import React, { useState } from "react";
import { updateTaskStatus } from "../../api/Task";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import S from "./TaskStyles";
import { Task } from "../../Types";

interface TaskStatusProps {
  task: Task;
}

const TaskStatus = ({ task }: TaskStatusProps) => {
  const [statusOptionOn, setStatusOptionOn] = useState(false);
  const [status, setStatus] = useState(task.status);

  const statusDivOnClickHandler = () => {
    setStatusOptionOn(!statusOptionOn);
  };

  const updateTaskStatusMutation = useMutation(
    () => updateTaskStatus(task.taskId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`task ${task.projectId}`]);
      },
    }
  );

  const statusOptionArray = [
    "Before working",
    "Working on it",
    "Check",
    "Done",
    "Stuck",
  ];

  const statusOptionOnClickHandler = (statusOption: string) => {
    setStatus(statusOption);
    updateTaskStatusMutation.mutate();
    setStatusOptionOn(false);
  };
  return (
    <div>
      <S.TaskDetailBox width={150} onClick={statusDivOnClickHandler}>
        {task.status}
      </S.TaskDetailBox>
      {statusOptionOn
        ? statusOptionArray.map((status) => {
            return (
              <S.TaskDetailBox
                width={150}
                onClick={() => statusOptionOnClickHandler(status)}
              >
                {status}
              </S.TaskDetailBox>
            );
          })
        : null}
    </div>
  );
};

export default TaskStatus;
