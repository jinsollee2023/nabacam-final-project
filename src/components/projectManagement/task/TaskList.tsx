import TaskCard from "./TaskCard";
import S from "./TaskStyles";
import useTasksQueries from "../../../hooks/useTasksQueries";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectByClient } from "../../../api/Project";
import { Select } from "antd";
import { MdAddCircle } from "react-icons/md";
import { Task } from "../../../Types";
import { useUserStore } from "src/zustand/useUserStore";

const TaskList = () => {
  const { userId } = useUserStore();

  const { data: projects } = useQuery(
    ["projects"],
    async () => {
      const projectsData = await getProjectByClient(userId);
      return projectsData;
    },
    {
      enabled: !!userId,
    }
  );

  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (projects && projects.length > 0) {
      setProjectId(projects[0].projectId!);
    }
  }, [projects]);

  const { tasks, addTaskMutation } = useTasksQueries(projectId);

  const onChange = (value: string) => {
    setProjectId(value);
  };

  const addTaskButtonHandler = () => {
    addTaskMutation.mutate();
  };

  const monthlyTaskData: Map<string, Task[]> = new Map();

  tasks?.forEach((task) => {
    const month = `${new Date(task.taskDate).getMonth() + 1}`;
    if (!monthlyTaskData.has(month)) {
      monthlyTaskData.set(month, []);
    }
    monthlyTaskData.get(month)?.push(task);
  });

  return (
    <>
      <S.SelectAddButtonContainer>
        <Select
          showSearch
          placeholder="Select a project"
          optionFilterProp="children"
          onChange={onChange}
          value={projectId}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            projects &&
            projects.map((project) => {
              return {
                value: project.projectId,
                label: project.title,
              };
            })
          }
          style={{ width: "200px" }}
        />
        <S.TaskAddButton onClick={addTaskButtonHandler}>
          <MdAddCircle size="20" />
        </S.TaskAddButton>
      </S.SelectAddButtonContainer>
      <div>
        {Array.from(monthlyTaskData.entries()).map(
          ([month, tasks]: [string, Task[]]) => {
            const sortByMonthTasks = tasks.sort((a, b) => {
              const dateA = new Date(a.deadLine).getTime();
              const dateB = new Date(b.deadLine).getTime();
              return dateA - dateB; // 오름차순 정렬
            });

            return (
              <>
                <S.ColumnLabelWrapper key={month}>
                  <S.ColumnLabel width={200}>{`${month}월`}</S.ColumnLabel>
                  <S.ColumnLabel width={150}>진행 상황</S.ColumnLabel>
                  <S.ColumnLabel width={240}>마감 기한</S.ColumnLabel>
                  <S.ColumnLabel width={200}>중요도</S.ColumnLabel>
                </S.ColumnLabelWrapper>
                <div>
                  {sortByMonthTasks.map((task: Task) => (
                    <TaskCard task={task} key={task.taskId} />
                  ))}
                </div>
              </>
            );
          }
        )}
      </div>
    </>
  );
};

export default TaskList;
