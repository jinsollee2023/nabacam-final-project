import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import S from "./TaskStyles";
import { Task } from "../../Types";
import useTasksQueries from "../../hooks/useTasksQueries";

interface TaskTitleProps {
  task: Task;
}
const TaskDeadLine = ({ task }: TaskTitleProps) => {
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
    setIsCalenderOpen(!isCalenderOpen);
  };

  return (
    <div>
      <S.TaskDetailBox width={240} onClick={handleOnClick}>
        {task.deadLine.toLocaleString().slice(0, 10)}
      </S.TaskDetailBox>
      {isCalenderOpen && (
        <DatePicker
          selected={new Date(task.deadLine)}
          onChange={handleChange}
          inline
        />
      )}
    </div>
  );
};

export default TaskDeadLine;
