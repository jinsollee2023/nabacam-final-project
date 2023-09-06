import { useEffect, useState } from "react";
import { Task } from "../../../Types";
import S from "./TaskStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTasksQueries from "../../../hooks/useTasksQueries";

interface TaskMonthProps {
  task: Task;
  userRole: string;
  month: string;
}

const TaskMonth = ({ task, userRole, month }: TaskMonthProps) => {
  const [monthOptionOn, setMonthOptionOn] = useState(false);
  const [monthColor, setMonthColor] = useState("");
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

  const getMonthColor = (month: string): string => {
    switch (month) {
      case "1":
        return "#FF0000";
      case "2":
        return "#FF8000";
      case "3":
        return "#FFFF00";
      case "4":
        return "#80FF00";
      case "5":
        return "#00FF00";
      case "6":
        return "#00FF80";
      case "7":
        return "#00FFFF";
      case "8":
        return "#0080FF";
      case "9":
        return "#0000FF";
      case "10":
        return "#8000FF";
      case "11":
        return "#FF00FF";
      case "12":
        return "#FF0080";
      default:
        return "#FF0000";
    }
  };

  useEffect(() => {
    const monthColor = getMonthColor(month);
    setMonthColor(monthColor);
  }, [month]);

  return (
    <>
      <S.TaskDetailBoxWrapper width="1.2%">
        <S.TaskDetailBox
          backgroundColor={monthColor}
          onClick={monthOptionOnclickHandler}
          cursor={userRole === "freelancer" ? "pointer" : null}
          style={{ marginRight: "5px", borderRadius: "3px" }}
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
      </S.TaskDetailBoxWrapper>
      {/* <>
        {monthOptionOn && (
          <>
            <S.CustomDatePicker>
              <S.CustomDatePickerBox onClick={() => alert("1click!")}>
                <span>o</span> 1월
              </S.CustomDatePickerBox>
              <S.CustomDatePickerBox onClick={() => alert("2click!")}>
                <span>o</span> 2월
              </S.CustomDatePickerBox>
              <S.CustomDatePickerBox onClick={() => alert("3click!")}>
                <span>o</span> 3월
              </S.CustomDatePickerBox>
              <S.CustomDatePickerBox>
                <span>o</span> 4월
              </S.CustomDatePickerBox>
              <S.CustomDatePickerBox>
                <span>o</span> 5월
              </S.CustomDatePickerBox>
            </S.CustomDatePicker>
          </>
        )}
      </> */}
    </>
  );
};

export default TaskMonth;
