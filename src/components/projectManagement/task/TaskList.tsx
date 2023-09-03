import TaskCard from "./TaskCard";
import S from "./TaskStyles";
import useTasksQueries from "../../../hooks/useTasksQueries";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { MdAddCircle } from "react-icons/md";
import { Task } from "../../../Types";
import { useUserStore } from "../../../zustand/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { CommonS } from "src/components/common/button/commonButton";
import React from "react";
import { RiAddBoxLine } from "react-icons/ri";

const TaskList = () => {
  const { userId, userRole } = useUserStore();
  const [projectId, setProjectId] = useState("");
  const {
    ongoingProjectsOfClient,
    ongoingProjectsOfFreelancer,
    updateProjectMutation,
  } = useProjectsQueries({
    currentUserId: userId,
  });

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

  const terminateProjectButtonHandler = () => {
    const isConfirmed = window.confirm(
      "프로젝트가 종료되면 진행 상태를 확인할 수 없습니다. \n프로젝트를 종료하시겠습니까?"
    );
    if (isConfirmed) {
      updateProjectMutation.mutate({
        projectId,
        newProject: { status: "진행 완료" },
      });
      setProjectId("");
    }
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
        <div>
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
            style={{
              width: "300px",
              border: "1.8px solid var(--main-blue)",
              borderRadius: "7px",
            }}
          />
        </div>
        {userRole === "freelancer" ? (
          <S.TaskAddButton onClick={addTaskButtonHandler}>
            <S.TaskAddSpan>
              <RiAddBoxLine size="17" color="white" />
              타임라인 추가하기
            </S.TaskAddSpan>
          </S.TaskAddButton>
        ) : (
          projectId && (
            <S.TaskAddButton onClick={terminateProjectButtonHandler}>
              <S.TaskAddSpan>프로젝트 종료하기</S.TaskAddSpan>
            </S.TaskAddButton>
          )
        )}
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
                    <S.ColumnLabel
                      width={200}
                    >{`${month}월 타임라인`}</S.ColumnLabel>
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
