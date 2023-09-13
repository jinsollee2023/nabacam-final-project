import { useInfiniteQuery } from "@tanstack/react-query";
import { IInpiniteProjectWithFreelancer, IProjectWithFreelancer } from "src/Types";
import { getTerminationedProjects } from "src/api/Project";
import { getUser } from "src/api/User";

interface useTerminationedProjectsQueriesProps {
  currentUserId: string;
  freelancerId?: string;
  page?: number;
}

const useTerminationedProjectsQueries = ({
  currentUserId,
  freelancerId,
  page,
}: useTerminationedProjectsQueriesProps) => {
  // 계약이 끝난 프리랜서 목록
  const {
    data: freelancersWithTerminatedProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProjectWithFreelancer, Error, IInpiniteProjectWithFreelancer>(
    ["freelancersWithTerminatedProjects"],
    async ({ pageParam = 1 }) => {
      const terminationedProjectsData = await getTerminationedProjects(
        currentUserId as string,
        pageParam
      );

      const projects: IProjectWithFreelancer[] = [];

      for (const project of terminationedProjectsData.projects) {
        projects.push({ ...project, freelancer: await getUser(project.freelancerId as string) });
      }

      const resultProjects = {
        projects,
        total_count: terminationedProjectsData.total_count,
      };
      return resultProjects;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    }
  );
  return {
    freelancersWithTerminatedProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  };
};

export default useTerminationedProjectsQueries;
