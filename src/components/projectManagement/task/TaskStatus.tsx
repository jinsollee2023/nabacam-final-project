import React, { useEffect, useState } from "react";
import S from "./TaskStyles";
import { Task } from "../../../Types";
import useTasksQueries from "../../../hooks/useTasksQueries";

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
        return "#FD3F78";
      case "Working on it":
        return "#FDAB3F";
      case "Check":
        return "#4252E3";
      case "Done":
        return "#16C671";
      case "Stuck":
        return "#E3425F";
      default:
        return "#d3d3d3";
    }
  };

  useEffect(() => {
    const backgroundColor = getStatusBackgroundColor(task.status);
    setBackgroundColor(backgroundColor);
  }, [task.status]);

  return (
    <>
      <div>
        <S.TaskDetailBox
          width={150}
          onClick={statusDivOnClickHandler}
          backgroundColor={backgroundColor}
        >
          {task.status}
        </S.TaskDetailBox>

        {statusOptionOn
          ? statusOptionArray.map((status) => {
              const backgroundColor = getStatusBackgroundColor(status);

              return (
                <S.TaskDetailBox
                  key={status} /**key 추가했습니다 */
                  width={150}
                  backgroundColor={backgroundColor}
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
