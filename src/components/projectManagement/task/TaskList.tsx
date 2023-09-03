import TaskCard from "./TaskCard";
import S from "./TaskStyles";
import useTasksQueries from "../../../hooks/useTasksQueries";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { MdAddCircle } from "react-icons/md";
import { Task } from "../../../Types";
import { useUserStore } from "../../../zustand/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import React from "react";

const TaskList = () => {
  const { userId, userRole } = useUserStore();
  const { ongoingProjectsOfClient, ongoingProjectsOfFreelancer } =
    useProjectsQueries({
      currentUserId: userId,
    });
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (
      userRole === "client" &&
      ongoingProjectsOfClient &&
      ongoingProjectsOfClient.length > 0
    ) {
      setProjectId(ongoingProjectsOfClient[0].projectId!);
    } else if (
      userRole === "freelancer" &&
      ongoingProjectsOfFreelancer &&
      ongoingProjectsOfFreelancer.length > 0
    ) {
      setProjectId(ongoingProjectsOfFreelancer[0].projectId!);
    }
  }, [ongoingProjectsOfClient, ongoingProjectsOfFreelancer]);

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
          disabled={
            userRole === "client"
              ? ongoingProjectsOfClient && ongoingProjectsOfClient?.length > 0
                ? false
                : true
              : ongoingProjectsOfFreelancer &&
                ongoingProjectsOfFreelancer?.length > 0
              ? false
              : true
          }
          placeholder="Select a project"
          optionFilterProp="children"
          onChange={onChange}
          value={projectId}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            userRole === "client"
              ? ongoingProjectsOfClient &&
                ongoingProjectsOfClient.map((project) => {
                  return {
                    value: project.projectId,
                    label: project.title,
                  };
                })
              : ongoingProjectsOfFreelancer &&
                ongoingProjectsOfFreelancer.map((project) => {
                  return {
                    value: project.projectId,
                    label: project.title,
                  };
                })
          }
          style={{ width: "200px" }}
        />

        {userRole === "freelancer" ? (
          <S.TaskAddButton onClick={addTaskButtonHandler}>
            <MdAddCircle size="20" />
          </S.TaskAddButton>
        ) : null}
      </S.SelectAddButtonContainer>
      {tasks && tasks.length > 0 ? (
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
                      <TaskCard
                        key={task.taskId}
                        task={task}
                        userRole={userRole}
                      />
                    ))}
                  </div>
                </>
              );
            }
          )}
        </div>
      ) : (ongoingProjectsOfClient && ongoingProjectsOfClient.length > 0) ||
        (ongoingProjectsOfFreelancer &&
          ongoingProjectsOfFreelancer.length > 0) ? (
        <div>진행중인 업무가 없습니다.</div>
      ) : (
        <div>진행중인 프로젝트가 없습니다.</div>
      )}
    </>
  );
};

export default TaskList;
