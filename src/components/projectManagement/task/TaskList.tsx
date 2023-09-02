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
  // const { user } = useUserStore();
  // const userId = user.userId;
  // const userRole = user.role;
  const { projects } = useProjectsQueries({ currentUserId: userId }); // 초기값: 참여중인 첫번째 프로젝트
  const [projectId, setProjectId] = useState("");
  console.log(projects);
  console.log("projectId", projectId);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setProjectId(projects[0].projectId!);
    }
  }, [projects]);

  console.log("projectId2", projectId); // 기업일 경우에만 들어옴

  const { tasks, addTaskMutation } = useTasksQueries(projectId);

  const onChange = (value: string) => {
    setProjectId(value);
  };

  // 프리랜서의 경우에만 task 추가 가능
  const addTaskButtonHandler = () => {
    addTaskMutation.mutate();
  };

  const monthlyTaskData: Map<string, Task[]> = new Map(); // 월별로 업무를 그룹화 // (key, value) = (문자열, Task [])

  tasks?.forEach((task) => {
    const month = `${new Date(task.taskDate).getMonth() + 1}`; // 각 작업의 taskDate 속성을 가져와서 해당 작업의 월을 계산
    if (!monthlyTaskData.has(month)) {
      monthlyTaskData.set(month, []);
    }
    monthlyTaskData.get(month)?.push(task);
  });

  // 선택된 프로젝트에 대한 업무 목록을 월별로 그룹화
  // 각 월에 대한 업무목록을 정렬 = TaskCard
  return (
    <>
      <S.SelectAddButtonContainer>
        <Select
          showSearch
          disabled={projects && projects?.length > 0 ? false : true}
          placeholder="Select a project"
          optionFilterProp="children" // 옵션 검색에 사용될 속성을 설정
          onChange={onChange}
          value={projectId}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={
            // 프로젝트 목록을 반복하여 드롭다운의 옵션으로 생성
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

        {userRole === "freelancer" ? (
          <S.TaskAddButton onClick={addTaskButtonHandler}>
            <MdAddCircle size="20" />
          </S.TaskAddButton>
        ) : null}
      </S.SelectAddButtonContainer>
      {tasks && tasks.length > 0 ? (
        <div>
          {Array.from(monthlyTaskData.entries()).map(
            // Map 객체의 엔트리를 배열로 변환
            // [month, tasks]: [string, Task[]] 형태로 배열 항목을 분해
            ([month, tasks]: [string, Task[]]) => {
              const sortByMonthTasks = tasks.sort((a, b) => {
                const dateA = new Date(a.deadLine).getTime(); // tasks 배열을 deadLine 속성을 기준으로 오름차순으로 정렬
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
                  {/* Task 카드 랜더링 부분 */}
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
      ) : projects && projects.length > 0 ? (
        <div>진행중인 업무가 없습니다.</div>
      ) : (
        <div>진행중인 프로젝트가 없습니다.</div>
      )}
    </>
  );
};

export default TaskList;
