import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "src/App";
import {
  IInpiniteProjectWithFreelancer,
  IProjectWithFreelancer,
} from "src/Types";
import {
  getPendingFreelancersToTheProjects,
  updatePendingFreelancer,
} from "src/api/Project";
import { getUser } from "src/api/User";

interface usePengFreelancersToTheProjectsQueriesProps {
  currentUserId: string;
}

const usePengFreelancersToTheProjectsQueries = ({
  currentUserId,
}: usePengFreelancersToTheProjectsQueriesProps) => {
  // 현재 로그인한 클라이언트의 프로젝트에 지원했으나 보류한 프리랜서 목록
  const {
    data: pendingFreelancersToTheProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<
    IInpiniteProjectWithFreelancer,
    Error,
    IInpiniteProjectWithFreelancer
  >(
    ["pendingFreelancersToTheProjects"],
    async ({ pageParam = 1 }) => {
      const freelancersPendingToTheProjectsData =
        await getPendingFreelancersToTheProjects(
          currentUserId as string,
          "최신순",
          pageParam
        );

      const resultData = [];

      for (const info of freelancersPendingToTheProjectsData.projects) {
        const pendingFreelancerUser = [];

        if (!info.pendingFreelancer) info.pendingFreelancer = [];
        for (const data of info.pendingFreelancer) {
          pendingFreelancerUser.push(await getUser(data));
        }
        resultData.push({ ...info, pendingFreelancerUser });
      }

      return {
        projects: resultData as IProjectWithFreelancer[],
        total_count: freelancersPendingToTheProjectsData.total_count as number,
      };
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!currentUserId,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
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
  return {
    pendingFreelancersToTheProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    updatePendingFreelancerMutation,
  };
};

export default usePengFreelancersToTheProjectsQueries;
