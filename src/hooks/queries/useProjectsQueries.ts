import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import {
  addProject,
  deleteProject,
  updateProject,
  getProjects,
} from "../../api/Project";
import { Project } from "../../Types";

interface useProjectsQueriesProps {
  currentUserId: string;
  sortLabel?: string;
}

const useProjectsQueries = ({ currentUserId }: useProjectsQueriesProps) => {
  // 1번 사용 : ContractInfoTab.tsx
  const {
    data: allProjectList,
    isError: allProjectListIsError,
    isLoading: allProjectListIsLoading,
  } = useQuery(
    ["allprojectList"],
    async () => {
      const projectsData = await getProjects();
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
        queryClient.invalidateQueries(["freelancersWithOngoingProjects"]);
        queryClient.invalidateQueries(["freelancersWithTerminatedProjects"]);
      },
    }
  );

  // 5번 사용 : AppliedProjectCard.tsx, ProjectCard.tsx, SuggestedProjectCard.tsx, ProjectCard.tsx, TaskList.tsx
  // 프로젝트에 대한 변경사항이 있을 시 업데이트해준다..
  // 한별 : 프리랜서의 프로젝트 지원 취소 후 프로젝트 volunteer 업데이트를 위해 사용..
  // 한별2 : 프리랜서가 프로젝트 지원할 경우 프로젝트 volunteer 업데이트를 위해 사용..
  // 한별3 : 프리랜서가 제안받은 프로젝트 수락 및 거절 시 SuggestedFreelancers 값에서 삭제하고
  //         추가로 수락 시에는 freelancerId에 해당 프리랜서 id를 넣어주기 위해 사용..
  const updateProjectMutation = useMutation(
    ({
      projectId,
      newProject,
    }: {
      projectId: string;
      newProject: {
        title?: string;
        desc?: string;
        clientId?: string;
        expectedStartDate?: string;
        pay?: {
          min: number | string;
          max: number | string;
        };
        date?: { startDate: string; endDate: string };
        volunteer?: string[];
        status?: string;
        SuggestedFreelancers?: string[];
        qualification?: number;
      };
    }) => updateProject(projectId, newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["projectsListBySort"]);
        queryClient.invalidateQueries(["projectList"]);
        queryClient.invalidateQueries(["ongoingProjectsOfClient"]);
        queryClient.invalidateQueries(["freelancersWithOngoingProjects"]);
        queryClient.invalidateQueries(["freelancersWithTerminatedProjects"]);
      },
    }
  );

  return {
    addProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
    allProjectList,
    allProjectListIsError,
    allProjectListIsLoading,
  };
};

export default useProjectsQueries;
