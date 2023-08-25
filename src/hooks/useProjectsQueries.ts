import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectOfClientBySort,
  getProjectByClientWithBeforeProgress,
  updateProject,
  getSuggestedFreelancers,
} from "src/api/Project";
import { Project } from "src/Types";

interface useProjectsQueriesProps {
  currentUserId: string;
  sortLabel?: string;
  freelancerId?: string;
  selectedProject?: Project | null;
}

const useProjectsQueries = ({
  currentUserId,
  sortLabel,
  freelancerId,
  selectedProject,
}: useProjectsQueriesProps) => {
  const { data: projects } = useQuery(
    ["projects", sortLabel],
    async () => {
      const projectsData = await getProjectOfClientBySort(
        currentUserId as string,
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

  const {
    data: projectDataForSuggestions,
    isLoading: projectDataForSuggestionsIsLoading,
    isError: projectDataForSuggestionsIsError,
    refetch: refetchprojectDataForSuggestions,
  } = useQuery(
    ["currentClientprojectLists"],
    () => getProjectByClientWithBeforeProgress(currentUserId as string),
    {
      enabled: !!currentUserId,
      select: (projectLists) =>
        projectLists?.filter(
          (projectList) =>
            !projectList.SuggestedFreelancers?.includes(freelancerId as string)
        ),
    }
  );

  const {
    data: suggestedFreelancersData,
    isLoading: suggestedFreelancersDataIsLoading,
    isError: suggestedFreelancersDataIsError,
  } = useQuery(["suggestedFreelancersData"], () =>
    getSuggestedFreelancers(selectedProject as Project)
  );

  const updateSuggestedFreelancersDataMutation = useMutation(
    ({
      projectId,
      updatedSuggestedFreelancers,
    }: {
      projectId: string;
      updatedSuggestedFreelancers: string[];
    }) =>
      updateProject(projectId, {
        SuggestedFreelancers: updatedSuggestedFreelancers,
      }),
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
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
    suggestedFreelancersData,
    suggestedFreelancersDataIsLoading,
    suggestedFreelancersDataIsError,
    updateSuggestedFreelancersDataMutation,
  };
};

export default useProjectsQueries;
