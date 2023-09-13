import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "src/App";
import { IInpiniteProjectWithFreelancer, IProjectWithFreelancer } from "src/Types";
import {
  deletePendingFreelancer,
  deleteVolunteerAndPendingFreelancer,
  getApplicantFreelancersToTheProjects,
  updateApprovalFreelancer,
} from "src/api/Project";
import { addProjectIdToUser, getUser } from "src/api/User";

interface useProjectOfClientQueriesProps {
  currentUserId: string;
}

const useProjectOfClientQueries = ({ currentUserId }: useProjectOfClientQueriesProps) => {
  // 현재 로그인한 클라이언트의 프로젝트에 지원한 프리랜서 목록
  const {
    data: freelancersAppliedToTheProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProjectWithFreelancer, Error, IInpiniteProjectWithFreelancer>(
    ["freelancersAppliedToTheProjects"],
    async ({ pageParam = 1 }) => {
      const freelancersAppliedToTheProjectsData = await getApplicantFreelancersToTheProjects(
        currentUserId as string,
        "최신순",
        pageParam
      );

      const resultData = [];

      for (const info of freelancersAppliedToTheProjectsData.projects) {
        const volunteerUser = [];

        if (!info.volunteer) info.volunteer = [];
        for (const data of info.volunteer) {
          volunteerUser.push(await getUser(data));
        }
        resultData.push({ ...info, volunteerUser });
      }

      return {
        projects: resultData as IProjectWithFreelancer[],
        total_count: freelancersAppliedToTheProjectsData.total_count as number,
      };
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!currentUserId,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        console.log("maxPage", maxPage);
        console.log("nextPage", nextPage);
        return nextPage <= maxPage ? nextPage : null;
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
    error,
    fetchNextPage,
    hasNextPage,
    status,
    updateFreelancerApprovalMutation,
    addProjectIdToUserMutation,
    deletePendingFreelancerMutation,
    deleteVolunteerAndPendingFreelancerMutation,
  };
};

export default useProjectOfClientQueries;
