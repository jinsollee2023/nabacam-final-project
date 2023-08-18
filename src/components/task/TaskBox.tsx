import TaskCard from "./TaskCard";
import { styled } from "styled-components";
import useTasksQueries from "../../hooks/useTasksQueries";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/Project";
import { Select } from "antd";

const TaskBox = () => {
  const { data: projects } = useQuery(["projects"], async () => {
    const tasksData = await getProjects();
    return tasksData;
  });

  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (projects && projects.length > 0) {
      setProjectId(projects[0].projectId);
    }
  }, [projects]);

  const { tasks, addTaskMutation } = useTasksQueries(projectId);

  const onChange = (value: string) => {
    setProjectId(value);
  };

  const addTaskButtonHandler = () => {
    addTaskMutation.mutate();
  };

  return (
    <S.TaskBoxContainer>
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
      />
      {tasks &&
        tasks.map((task) => {
          return <TaskCard task={task} key={task.taskId} />;
        })}
      <button onClick={addTaskButtonHandler}>추가</button>
    </S.TaskBoxContainer>
  );
};

export default TaskBox;

const S = {
  TaskBoxContainer: styled.div``,
};
