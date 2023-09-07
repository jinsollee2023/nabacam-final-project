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
  getTerminationedProjects,
  updateApprovalFreelancer,
  deleteVolunteerAndPendingFreelancer,
  deletePendingFreelancer,
  getTerminationedProjectsWithFreelancer,
  getOngoingProjectsOfFreelancer,
  getOngoingProjectsOfClient,
} from "../api/Project";
import { IProjectWithFreelancer, Project } from "../Types";
import { addProjectIdToUser, getUser } from "../api/User";
import { updatePendingFreelancer } from "../api/Project";

interface useProjectsQueriesProps {
  currentUserId: string;
  sortLabel?: string;
  freelancerId?: string;
  selectedProject?: Project | null;
}

// 선택한 sortLabel을 기준으로 프로젝트 리스트 불러오기
const useProjectsQueries = ({
  currentUserId,
  sortLabel,
  freelancerId,
  selectedProject,
}: useProjectsQueriesProps) => {
  const { data: projectsOfClient } = useQuery(
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

  const { data: ongoingProjectsOfFreelancer } = useQuery(
    ["projects"],
    async () => {
      const projectsData = await getOngoingProjectsOfFreelancer(
        currentUserId as string
      );
      return projectsData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  const { data: ongoingProjectsOfClient } = useQuery(
    ["ongoingProjectsOfClient"],
    async () => {
      const ongoingProjectsOfClientData = await getOngoingProjectsOfClient(
        currentUserId as string
      );
      return ongoingProjectsOfClientData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  // 현재 로그인한 유저가 지원한 프로젝트 확인에 사용
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

  const {
    data: allProjectList,
    isError: allProjectListIsError,
    isLoading: allProjectListIsLoading,
  } = useQuery(
    ["allprojectList"],
    async () => {
      const projectsData = await getProjects(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  // 제안 받은 프로젝트 리스트 불러오기에 사용
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
        queryClient.fetchInfiniteQuery(["freelancersWithOngoingProjects"]);
        queryClient.fetchInfiniteQuery(["freelancersWithTerminatedProjects"]);
      },
    }
  );

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
        queryClient.fetchInfiniteQuery(["freelancersWithOngoingProjects"]);
        queryClient.fetchInfiniteQuery(["freelancersWithTerminatedProjects"]);
      },
    }
  );

  // 현재 로그인한 클라이언트의 프로젝트 중에서
  // 상태가 진행 전인 프로젝트들을 불러온 후
  // 해당 프로젝트들의 SuggestedFreelancers값에
  // 프리랜서 마켓에서 선택한 프리랜서의 id가 없는 프로젝트만 가져오기
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

  // 새롭게 제안한 프리랜서를 해당 프로젝트에 업데이트 해주기..
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
        queryClient.invalidateQueries(["currentClientprojectLists"]);
      },
    }
  );

  // 프리랜서로 로그인시 프로젝트 탐색에서 선택한 sortLabel을 기준으로 프로젝트 리스트를 불러온다..
  const {
    data: projectsListBySort,
    error: projectListIsError,
    isLoading: projectListIsLoading,
  } = useQuery(["projectsListBySort", sortLabel], async () => {
    const projectList = await getProjectOfFreelancerBySort(sortLabel as string);
    return projectList;
  });

  // 현재 로그인한 클라이언트의 프로젝트에 지원한 프리랜서 목록
  const { data: freelancersAppliedToTheProjects } = useQuery(
    ["freelancersAppliedToTheProjects"],
    async () => {
      const freelancersAppliedToTheProjectsData =
        await getProjectOfClientBySort(currentUserId as string, "최신순");

      let resultData = [];
      let volunteerUser = [];

      for (const info of freelancersAppliedToTheProjectsData) {
        volunteerUser = [];
        if (!info.volunteer) info.volunteer = [];
        for (const data of info.volunteer) {
          volunteerUser.push(await getUser(data));
        }
        resultData.push({ ...info, volunteerUser });
      }

      return resultData;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!currentUserId,
    }
  );

  // 현재 로그인한 클라이언트의 프로젝트에 지원했으나 보류한 프리랜서 목록
  const { data: pendingFreelancersToTheProjects } = useQuery(
    ["pendingFreelancersToTheProjects"],
    async () => {
      const freelancersAppliedToTheProjectsData =
        await getProjectOfClientBySort(currentUserId as string, "최신순");

      let resultData = [];
      let pendingFreelancerUser = [];

      for (const info of freelancersAppliedToTheProjectsData) {
        pendingFreelancerUser = [];
        if (!info.pendingFreelancer) info.pendingFreelancer = [];
        for (const data of info.pendingFreelancer) {
          pendingFreelancerUser.push(await getUser(data));
        }
        resultData.push({ ...info, pendingFreelancerUser });
      }

      return resultData;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!currentUserId,
    }
  );

  // 보류한 프리랜서 목록 업데이트
  const updatePendingFreelancerMutation = useMutation(
    ({
      projectId,
      updateVolunteer,
      pendingFreelancer,
    }: {
      projectId: string;
      updateVolunteer: string[];
      pendingFreelancer: string[];
    }) =>
      updatePendingFreelancer(projectId, updateVolunteer, pendingFreelancer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]);
        queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]);
      },
    }
  );

  // 프리랜서 계약 시 업데이트
  const updateFreelancerApprovalMutation = useMutation(
    ({
      userId,
      projectId,
      endDate,
    }: {
      userId: string;
      projectId: string;
      endDate: string;
    }) => updateApprovalFreelancer(userId, projectId, endDate),
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]),
          queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]),
          queryClient.fetchInfiniteQuery(["freelancersWithOngoingProjects"]),
          queryClient.fetchInfiniteQuery(["freelancersWithTerminatedProjects"]),
          queryClient.invalidateQueries(["projects"]),
        ]);
      },
    }
  );

  // 프리랜서 계약 시 users 테이블에 projectId 추가
  const addProjectIdToUserMutation = useMutation(
    ({ userId, projectIds }: { userId: string; projectIds: string[] }) =>
      addProjectIdToUser(userId, projectIds),
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]),
          queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]),
          queryClient.fetchInfiniteQuery(["freelancersWithOngoingProjects"]),
          queryClient.fetchInfiniteQuery(["freelancersWithTerminatedProjects"]),
        ]);
      },
    }
  );

  // 보류한 프리랜서 삭제
  const deletePendingFreelancerMutation = useMutation(
    ({
      projectId,
      updatePendingFreelancer,
    }: {
      projectId: string;
      updatePendingFreelancer: string[];
    }) => deletePendingFreelancer(projectId, updatePendingFreelancer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]);
      },
    }
  );

  // 계약된 프리랜서 지원한/보류한 프리랜서 목록에서 삭제
  const deleteVolunteerAndPendingFreelancerMutation = useMutation(
    ({
      projectId,
      updateVolunteer,
      updatePendingFreelancer,
    }: {
      projectId: string;
      updateVolunteer: string[];
      updatePendingFreelancer: string[];
    }) =>
      deleteVolunteerAndPendingFreelancer(
        projectId,
        updateVolunteer,
        updatePendingFreelancer
      ),
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]),
          queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]),
          queryClient.fetchInfiniteQuery(["freelancersWithOngoingProjects"]),
          queryClient.fetchInfiniteQuery(["freelancersWithTerminatedProjects"]),
        ]);
      },
    }
  );

  // 진행중인 프리랜서 목록
  const { data: freelancersWithOngoingProjects } = useQuery<
    IProjectWithFreelancer[]
  >(
    ["freelancersWithOngoingProjects"],
    async () => {
      const ongoingProjectsData = await getOngoingProjectsOfClient(
        currentUserId as string
      );
      const ongoingProjectsWithPromise = ongoingProjectsData.map((info) => ({
        ...info,
        freelancerPromise: getUser(info.freelancerId as string),
      }));
      const freelancersWithOngoingProjects = await Promise.all(
        ongoingProjectsWithPromise.map(async (project) => ({
          ...project,
          freelancer: await project.freelancerPromise,
        }))
      );
      return freelancersWithOngoingProjects;
    },
    {
      enabled: !!currentUserId && !!freelancerId,
    }
  );

  // 계약이 끝난 프리랜서 목록
  const { data: freelancersWithTerminatedProjects } = useQuery<
    IProjectWithFreelancer[]
  >(
    ["freelancersWithTerminatedProjects"],
    async () => {
      const terminationedProjectsData = await getTerminationedProjects(
        currentUserId as string
      );
      const terminationedProjectsArray = [];

      for (const info of terminationedProjectsData) {
        terminationedProjectsArray.push({
          ...info,
          freelancer: await getUser(info.freelancerId as string),
        });
      }

      return terminationedProjectsArray.filter(
        (info) => info.freelancer !== null
      );
    },
    {
      enabled: !!currentUserId && !!freelancerId,
    }
  );

  // 계약이 끝난 프로젝트 중 프리랜서 아이디가 동일한 데이터 목록
  const { data: matchingCompletedProjectsData } = useQuery(
    ["matchingCompletedProjectsData"],
    async () => {
      const terminationedProjects =
        await getTerminationedProjectsWithFreelancer(
          currentUserId as string,
          freelancerId as string
        );
      if (!terminationedProjects) {
        return [];
      }
      return terminationedProjects;
    },
    {
      enabled: !!currentUserId && !!freelancerId,
    }
  );

  return {
    projectsOfClient,
    ongoingProjectsOfClient,
    ongoingProjectsOfFreelancer,
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
    freelancersAppliedToTheProjects,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    pendingFreelancersToTheProjects,
    freelancersWithOngoingProjects,
    freelancersWithTerminatedProjects,
    updatePendingFreelancerMutation,
    deletePendingFreelancerMutation,
    allProjectList,
    matchingCompletedProjectsData,
    addProjectIdToUserMutation,
  };
};

export default useProjectsQueries;
