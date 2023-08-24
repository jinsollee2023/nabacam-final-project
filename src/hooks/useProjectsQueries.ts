import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectByClient,
  getProjectByClientWithBeforeProgress,
  updateProject,
} from "src/api/Project";
import { Project } from "src/Types";

interface useProjectsQueriesProps {
  userId?: string;
  freelancerId?: string;
}

const useProjectsQueries = ({
  userId,
  freelancerId,
}: useProjectsQueriesProps) => {
  const { data: projects } = useQuery(
    ["projects"],
    async () => {
      const projectsData = await getProjectByClient(userId as string);
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

  const {
    data: projectDataForSuggestions,
    isLoading: projectDataForSuggestionsIsLoading,
    isError: projectDataForSuggestionsIsError,
    refetch: refetchprojectDataForSuggestions,
  } = useQuery(
    ["currentClientprojectLists", freelancerId],
    () => getProjectByClientWithBeforeProgress(userId as string),
    {
      enabled: !!userId,
      select: (projectLists) =>
        projectLists?.filter(
          (projectList) =>
            !projectList.SuggestedFreelancers?.includes(freelancerId as string)
        ),
    }
  );

  return {
    projects,
    addProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
  };
};

export default useProjectsQueries;
