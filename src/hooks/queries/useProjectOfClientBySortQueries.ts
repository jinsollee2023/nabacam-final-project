import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "src/App";
import {
  deletePendingFreelancer,
  deleteVolunteerAndPendingFreelancer,
  getProjectOfClientBySort,
  updateApprovalFreelancer,
  updatePendingFreelancer,
} from "src/api/Project";
import { addProjectIdToUser, getUser } from "src/api/User";

interface useProjectOfClientBySortQueriesProps {
  currentUserId: string;
}

const useProjectOfClientBySortQueries = ({
  currentUserId,
}: useProjectOfClientBySortQueriesProps) => {
  // 현재 로그인한 클라이언트의 프로젝트에 지원한 프리랜서 목록
  const {
    data: freelancersAppliedToTheProjects,
    isLoading: freelancersAppliedToTheProjectsIsLoading,
    isError: freelancersAppliedToTheProjectsIsError,
  } = useQuery(
    ["freelancersAppliedToTheProjects"],
    async () => {
      const freelancersAppliedToTheProjectsData = await getProjectOfClientBySort(
        currentUserId as string,
        "최신순"
      );

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
  const {
    data: pendingFreelancersToTheProjects,
    isLoading: pendingFreelancersToTheProjectsIsLoading,
    isError: pendingFreelancersToTheProjectsIsError,
  } = useQuery(
    ["pendingFreelancersToTheProjects"],
    async () => {
      const freelancersAppliedToTheProjectsData = await getProjectOfClientBySort(
        currentUserId as string,
        "최신순"
      );

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
    }) => updatePendingFreelancer(projectId, updateVolunteer, pendingFreelancer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]);
        queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]);
      },
    }
  );

  // 프리랜서 계약 시 업데이트
  const updateFreelancerApprovalMutation = useMutation(
    ({ userId, projectId, endDate }: { userId: string; projectId: string; endDate: string }) =>
      updateApprovalFreelancer(userId, projectId, endDate),
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]),
          queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]),
          queryClient.invalidateQueries(["freelancersWithOngoingProjects"]),
          queryClient.invalidateQueries(["freelancersWithTerminatedProjects"]),
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
          queryClient.invalidateQueries(["freelancersWithOngoingProjects"]),
          queryClient.invalidateQueries(["freelancersWithTerminatedProjects"]),
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
    }) => deleteVolunteerAndPendingFreelancer(projectId, updateVolunteer, updatePendingFreelancer),
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(["freelancersAppliedToTheProjects"]),
          queryClient.invalidateQueries(["pendingFreelancersToTheProjects"]),
          queryClient.invalidateQueries(["freelancersWithOngoingProjects"]),
          queryClient.invalidateQueries(["freelancersWithTerminatedProjects"]),
        ]);
      },
    }
  );
  return {
    freelancersAppliedToTheProjects,
    freelancersAppliedToTheProjectsIsLoading,
    freelancersAppliedToTheProjectsIsError,
    pendingFreelancersToTheProjects,
    pendingFreelancersToTheProjectsIsLoading,
    pendingFreelancersToTheProjectsIsError,
    updatePendingFreelancerMutation,
    updateFreelancerApprovalMutation,
    addProjectIdToUserMutation,
    deletePendingFreelancerMutation,
    deleteVolunteerAndPendingFreelancerMutation,
  };
};

export default useProjectOfClientBySortQueries;
