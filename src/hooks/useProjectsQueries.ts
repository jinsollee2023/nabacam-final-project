import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import {
  addProject,
  deleteProject,
  getProjectOfClientBySort,
  getProjectByClientWithBeforeProgress,
  updateProject,
  getSuggestedFreelancers,
  getProjectOfFreelancerBySort,
  getProjects,
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

  // 지원한 프로젝트 확인에 사용
  const {
    data: appliedProjectList,
    isError: appliedProjectListIsError,
    isLoading: appliedProjectListIsLoading,
  } = useQuery(
    ["projectList"],
    async () => {
      const projectsData = await getProjects(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
      select: (allProjectList) =>
        allProjectList?.filter(
          (project) =>
            project.volunteer?.includes(currentUserId) ||
            project.pendingFreelancer?.includes(currentUserId)
        ),
    }
  );

  // 제안 받은 프로젝트 확인에 사용
  const {
    data: suggestedProjectList,
    isError: suggestedProjectListIsError,
    isLoading: suggestedProjectListIsLoading,
  } = useQuery(
    ["projectList", updateProject],
    async () => {
      const projectsData = await getProjects(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
      select: (allProjectList) =>
        allProjectList?.filter((project) =>
          project.SuggestedFreelancers?.includes(currentUserId)
        ),
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
        queryClient.invalidateQueries(["projectsListBySort"]);
        queryClient.invalidateQueries(["projectList"]);
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
  } = useQuery(
    ["suggestedFreelancersData"],
    () => getSuggestedFreelancers(selectedProject as Project),
    {
      enabled: !!selectedProject,
    }
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
        queryClient.invalidateQueries(["suggestedFreelancersData"]);
      },
    }
  );

  const {
    data: projectsListBySort,
    error: projectListIsError,
    isLoading: projectListIsLoading,
  } = useQuery(["projectsListBySort", sortLabel], async () => {
    const projectList = await getProjectOfFreelancerBySort(sortLabel as string);
    return projectList;
  });

  return {
    projects,
    appliedProjectList,
    appliedProjectListIsError,
    appliedProjectListIsLoading,
    suggestedProjectList,
    suggestedProjectListIsError,
    suggestedProjectListIsLoading,
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
    projectsListBySort,
    projectListIsError,
    projectListIsLoading,
  };
};

export default useProjectsQueries;
