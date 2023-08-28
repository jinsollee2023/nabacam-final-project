import { useState } from "react";
import { Task } from "../../../Types";
import S from "./TaskStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTasksQueries from "../../../hooks/useTasksQueries";
import { format } from "date-fns";

interface TaskMonthProps {
  task: Task;
  userRole: string;
}

const TaskMonth = ({ task, userRole }: TaskMonthProps) => {
  const [monthOptionOn, setMonthOptionOn] = useState(false);
  const { updateTaskMonthMutation } = useTasksQueries(task.projectId);

  const handleChange = (date: Date) => {
    setMonthOptionOn(!monthOptionOn);
    updateTaskMonthMutation.mutate({
      taskId: task.taskId,
      taskDate: date,
    });
  };

  const monthOptionOnclickHandler = () => {
    if (userRole === "freelancer") setMonthOptionOn(!monthOptionOn);
  };

  return (
    <>
      <S.TaskDetailBox
        width={5}
        backgroundColor="red"
        onClick={monthOptionOnclickHandler}
        style={{ marginRight: "5px", borderRadius: "0" }}
      ></S.TaskDetailBox>
      {monthOptionOn && (
        <DatePicker
          selected={new Date(task.taskDate)}
          showMonthYearPicker
          dateFormat="yyyy-MM-dd HH:mm:ss"
          onChange={handleChange}
          inline
        />
      )}
    </>
  );
};

export default TaskMonth;
