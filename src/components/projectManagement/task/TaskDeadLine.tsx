import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import S from "./TaskStyles";
import { Task } from "../../../Types";
import useTasksQueries from "../../../hooks/useTasksQueries";
import React from "react";

interface TaskTitleProps {
  task: Task;
  userRole: string;
}
const TaskDeadLine = ({ task, userRole }: TaskTitleProps) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { updateTaskDeadLineMutation } = useTasksQueries(task.projectId);

  const handleChange = (date: Date) => {
    setIsCalenderOpen(!isCalenderOpen);
    updateTaskDeadLineMutation.mutate({
      taskId: task.taskId,
      deadLine: date,
    });
  };

  const handleOnClick = () => {
    if (userRole === "freelancer") setIsCalenderOpen(!isCalenderOpen);
  };

  return (
    <S.TaskDetailBoxWrapper width="30%">
      <S.TaskDetailBox
        onClick={handleOnClick}
        cursor={userRole === "freelancer" ? "pointer" : null}
      >
        {task.deadLine.toLocaleString().slice(0, 10)}
      </S.TaskDetailBox>
      {isCalenderOpen && (
        <DatePicker
          selected={new Date(task.deadLine)}
          onChange={handleChange}
          inline
        />
      )}
    </S.TaskDetailBoxWrapper>
  );
};

export default TaskDeadLine;
