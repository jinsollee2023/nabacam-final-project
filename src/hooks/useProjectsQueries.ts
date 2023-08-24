import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectOfClientBySort,
  updateProject,
} from "src/api/Project";
import { Project } from "src/Types";

interface useProjectQueriesProps {
  currentUserId: string;
  sortLabel?: string;
}

const useProjectsQueries = ({
  currentUserId,
  sortLabel,
}: useProjectQueriesProps) => {
  const { data: projects } = useQuery(
    ["projects", sortLabel],
    async () => {
      const projectsData = await getProjectOfClientBySort(
        currentUserId,
        sortLabel as string
      );
      return projectsData;
    },
    {
      enabled: !!currentUserId,
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
