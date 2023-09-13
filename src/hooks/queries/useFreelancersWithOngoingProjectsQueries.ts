import { useInfiniteQuery } from "@tanstack/react-query";
import { IInpiniteProjectWithFreelancer } from "../../Types";
import { getFreelancersWithOngoingProjects } from "../../api/Project";
import { getUser } from "../../api/User";

interface freelancersWithOngoingProjectsProps {
  currentUserId: string;
  freelancerId?: string;
  page?: number;
}

const useFreelancersWithOngoingProjectsQueries = ({
  currentUserId,
  freelancerId,
}: freelancersWithOngoingProjectsProps) => {
  // 진행중인 프리랜서 목록
  const {
    data: freelancersWithOngoingProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProjectWithFreelancer, Error, IInpiniteProjectWithFreelancer>(
    ["freelancersWithOngoingProjects"],
    async ({ pageParam = 1 }) => {
      const ongoingProjectsData = await getFreelancersWithOngoingProjects(
        currentUserId as string,
        pageParam
      );

      const projects = [];

      for (const project of ongoingProjectsData.projects) {
        projects.push({ ...project, freelancer: await getUser(project.freelancerId as string) });
      }

      const resultProjects = {
        projects,
        total_count: ongoingProjectsData.total_count,
      };

      return resultProjects;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        console.log("maxPage", maxPage);
        console.log("nextPage", nextPage);
        return nextPage <= maxPage ? nextPage : null;
      },
    }
  );
  return {
    freelancersWithOngoingProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  };
};

export default useFreelancersWithOngoingProjectsQueries;
