import { useInfiniteQuery } from "@tanstack/react-query";
import { IInpiniteProject } from "src/Types";

import { getAppliedProjects } from "src/api/Project";

interface useAppliedProjectQueriesProps {
  currentUserId: string;
}

const useAppliedProjectQueries = ({ currentUserId }: useAppliedProjectQueriesProps) => {
  // 현재 로그인한 유저가 지원한 프로젝트 확인에 사용
  const {
    data: appliedProjectList,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProject, Error, IInpiniteProject>(
    ["projectList"],
    async ({ pageParam = 1 }) => getAppliedProjects(currentUserId as string, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    }
  );
  return { appliedProjectList, error, fetchNextPage, hasNextPage, status };
};

export default useAppliedProjectQueries;
