import { useInfiniteQuery } from "@tanstack/react-query";
import { IInpiniteProject } from "src/Types";
import { getProjectOfFreelancerBySort } from "src/api/Project";

interface useProjectOfFreelancerBySortQueriesProps {
  currentUserId: string;
  sortLabel?: string;
}

const useProjectOfFreelancerBySortQueries = ({
  currentUserId,
  sortLabel,
}: useProjectOfFreelancerBySortQueriesProps) => {
  // 프리랜서로 로그인시 프로젝트 탐색에서 선택한 sortLabel을 기준으로 프로젝트 리스트를 불러온다..
  const {
    data: projectsListBySort,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProject, Error>(
    ["projectsListBySort", sortLabel],
    async ({ pageParam = 1 }) => {
      const projectList = await getProjectOfFreelancerBySort(sortLabel as string, pageParam);

      const projects = [];

      for (const project of projectList.projects) {
        projects.push({ ...project });
      }

      return {
        projects: projects,
        total_count: projectList.total_count,
      };
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    }
  );

  return {
    projectsListBySort,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  };
};

export default useProjectOfFreelancerBySortQueries;
