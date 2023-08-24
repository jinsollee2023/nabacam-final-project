import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectByClient,
  updateProject,
} from "src/api/Project";
import { Project } from "src/Types";

const useProjectsQueries = (userId: string) => {
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

  const addProjectMutation = useMutation(
    (newProject: Project) => addProject(newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const deleteProjectMutation = useMutation(
    (projectId: string) => deleteProject(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const updateProjectMutation = useMutation(
    ({ projectId, newProject }: { projectId: string; newProject: Project }) =>
      updateProject(projectId, newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  return {
    projects,
    addProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
  };
};

export default useProjectsQueries;
