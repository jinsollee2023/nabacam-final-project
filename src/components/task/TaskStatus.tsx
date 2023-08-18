import React, { useState } from "react";
import S from "./TaskStyles";
import { Task } from "../../Types";
import useTasksQueries from "../../hooks/useTasksQueries";

interface TaskStatusProps {
  task: Task;
}

const TaskStatus = ({ task }: TaskStatusProps) => {
  const [statusOptionOn, setStatusOptionOn] = useState(false);

  const statusDivOnClickHandler = () => {
    setStatusOptionOn(!statusOptionOn);
  };

  const { updateTaskStatusMutation } = useTasksQueries(task.projectId);

  const statusOptionArray = [
    "Before working",
    "Working on it",
    "Check",
    "Done",
    "Stuck",
  ];

  const statusOptionOnClickHandler = (status: string) => {
    updateTaskStatusMutation.mutate({
      taskId: task.taskId,
      status,
    });
    setStatusOptionOn(false);
  };
  return (
    <>
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
    </>
  );
};

export default TaskStatus;
