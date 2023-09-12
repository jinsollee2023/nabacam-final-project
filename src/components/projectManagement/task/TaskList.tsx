import TaskCard from "./TaskCard";
import S from "./TaskStyles";
import useTasksQueries from "../../../hooks/useTasksQueries";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useUserStore } from "../../../store/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { CommonS } from "src/components/common/button/commonButton";
import React from "react";
import { RiAddBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";
import useOngoingProjectOfClientQueries from "src/hooks/queries/useOngoingProjectOfClientQueries";
import useOngoingProjectsOfFreelancerQueries from "src/hooks/queries/useOngoingProjectsOfFreelancerQueries";
import { Task } from "src/Types";

const TaskList = () => {
  const { userId, userRole } = useUserStore();
  const [projectId, setProjectId] = useState("");
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });
  const { ongoingProjectsOfFreelancer } = useOngoingProjectsOfFreelancerQueries(
    {
      currentUserId: userId,
    }
  );
  const { ongoingProjectsOfClient } = useOngoingProjectOfClientQueries({
    currentUserId: userId,
  });

  useEffect(() => {
    if (
      userRole === "client" &&
      ongoingProjectsOfClient &&
      ongoingProjectsOfClient.length > 0
    ) {
      setProjectId(ongoingProjectsOfClient[0].projectId as string);
    } else if (
      userRole === "freelancer" &&
      ongoingProjectsOfFreelancer &&
      ongoingProjectsOfFreelancer.length > 0
    ) {
      setProjectId(ongoingProjectsOfFreelancer[0].projectId as string);
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
    const projectList =
      userRole === "freelancer"
        ? ongoingProjectsOfFreelancer
        : ongoingProjectsOfClient;

    const selectedProject = projectList?.find(
      (project) => project.projectId === projectId
    );

    updateProjectMutation.mutate({
      projectId,
      newProject: {
        status: "진행 완료",
        date: {
          startDate: selectedProject?.date?.startDate as string,
          endDate: new Date().toISOString().slice(0, 10),
        },
      },
    });
    setProjectId("");
  };

  const monthlyTaskData: Map<string, Task[]> = new Map();

  tasks?.forEach((task) => {
    const month = `${new Date(task.taskDate).getMonth() + 1}`;
    if (!monthlyTaskData.has(month)) {
      monthlyTaskData.set(month, []);
    }
    monthlyTaskData.get(month)?.push(task);
  });

  const handleTerminateConfirm = () => {
    terminateProjectButtonHandler();
    toast.dismiss();
  };

  const handleTerminateCancel = () => {
    toast.dismiss();
  };

  const showTerminateConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>
          "프로젝트가 종료되면 진행 상태를 확인할 수 없습니다. 프로젝트를
          종료하시겠습니까?"
        </CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleTerminateConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleTerminateCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };
  return (
    <>
      <S.SelectAddButtonContainer>
        <div>
          {(ongoingProjectsOfClient && ongoingProjectsOfClient?.length > 0) ||
          (ongoingProjectsOfFreelancer &&
            ongoingProjectsOfFreelancer?.length > 0) ? (
            <Select
              showSearch
              disabled={
                userRole === "client"
                  ? ongoingProjectsOfClient &&
                    ongoingProjectsOfClient?.length > 0
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
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
          ) : (
            <p>진행 중인 프로젝트가 없습니다.</p>
          )}
        </div>
        {userRole === "freelancer"
          ? projectId && (
              <S.TaskAddButton onClick={addTaskButtonHandler}>
                <S.TaskAddSpan>
                  <RiAddBoxLine
                    size="17"
                    color="white"
                    style={{ marginRight: "5px" }}
                  />
                  타임라인 추가하기
                </S.TaskAddSpan>
              </S.TaskAddButton>
            )
          : projectId && (
              <S.TaskAddButton onClick={showTerminateConfirmation}>
                <S.TaskAddSpan>프로젝트 종료하기</S.TaskAddSpan>
              </S.TaskAddButton>
            )}
      </S.SelectAddButtonContainer>
      <S.TimelineContainer>
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
                      <S.ColumnLabel width="25%">{`${month}월`}</S.ColumnLabel>
                      <S.ColumnLabel width="18%">진행 상황</S.ColumnLabel>
                      <S.ColumnLabel width="29%">마감 기한</S.ColumnLabel>
                      <S.ColumnLabel width="25%">중요도</S.ColumnLabel>
                    </S.ColumnLabelWrapper>
                    <div>
                      {sortByMonthTasks.map((task: Task) => (
                        <TaskCard
                          key={task.taskId}
                          task={task}
                          userRole={userRole}
                          month={month}
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
        ) : null}
      </S.TimelineContainer>
    </>
  );
};

export default TaskList;
