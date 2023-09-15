import React, { useEffect, useState } from "react";
import S from "./TaskStyles";
import { Task } from "../../../Types";
import useTasksQueries from "../../../hooks/queries/useTasksQueries";

interface TaskStatusProps {
  task: Task;
  userRole: string;
}

const TaskStatus = ({ task, userRole }: TaskStatusProps) => {
  const [statusOptionOn, setStatusOptionOn] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const statusDivOnClickHandler = () => {
    if (userRole === "freelancer") setStatusOptionOn(!statusOptionOn);
  };

  const { updateTaskStatusMutation } = useTasksQueries(task.projectId);

  const statusOptionArray = [
    "Before working",
    "Working on it",
    "Check",
    "Done",
    "Stuck",
  ].filter((status) => status !== task.status);

  const statusOptionOnClickHandler = (status: string) => {
    updateTaskStatusMutation.mutate({
      taskId: task.taskId,
      status,
    });
    setStatusOptionOn(false);
  };

  const getStatusBackgroundColor = (status: string): string => {
    switch (status) {
      case "Before working":
        return "#E3E3E3";
      case "Working on it":
        return "#FFC579";
      case "Check":
        return "#83B4FE";
      case "Done":
        return "#7AD4A9";
      case "Stuck":
        return "#FD9DAE";
      default:
        return "#E3E3E3";
    }
  };

  useEffect(() => {
    const backgroundColor = getStatusBackgroundColor(task.status);
    setBackgroundColor(backgroundColor);
  }, [task.status]);

  return (
    <S.TaskDetailBoxWrapper width="23%">
      <S.TaskDetailBox
        onClick={statusDivOnClickHandler}
        backgroundColor={backgroundColor}
        cursor={userRole === "freelancer" ? "pointer" : null}
      >
        {task.status}
      </S.TaskDetailBox>

      {statusOptionOn
        ? statusOptionArray.map((status) => {
            const backgroundColor = getStatusBackgroundColor(status);

            return (
              <S.TaskDetailBox
                key={status} /**key 추가했습니다 */
                backgroundColor={backgroundColor}
                onClick={() => statusOptionOnClickHandler(status)}
              >
                {status}
              </S.TaskDetailBox>
            );
          })
        : null}
    </S.TaskDetailBoxWrapper>
  );
};

export default TaskStatus;
