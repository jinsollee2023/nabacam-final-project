import { useInfiniteQuery } from "@tanstack/react-query";
import { IInpiniteProject } from "src/Types";
import { getSuggestedProjects, updateProject } from "src/api/Project";

interface useSuggestedProjectQueriesProps {
  currentUserId: string;
}

const useSuggestedProjectQueries = ({ currentUserId }: useSuggestedProjectQueriesProps) => {
  // 제안 받은 프로젝트 리스트 불러오기에 사용
  const {
    data: suggestedProjectList,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProject, Error, IInpiniteProject>(
    ["projectList", updateProject],
    async ({ pageParam = 1 }) => getSuggestedProjects(currentUserId as string, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        return nextPage < maxPage ? nextPage : null;
      },
    }
  );

  return { suggestedProjectList, error, fetchNextPage, hasNextPage, status };
};

export default useSuggestedProjectQueries;
