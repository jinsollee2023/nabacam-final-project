import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "src/App";
import { IInpiniteProject, Project } from "src/Types";
import { addProject, getProjectOfClientBySort } from "src/api/Project";

interface useProjectOfClientBySortQueriesProps {
  currentUserId?: string;
  sortLabel?: string;
}

const useProjectOfClientBySortQueries = ({
  currentUserId,
  sortLabel,
}: useProjectOfClientBySortQueriesProps) => {
  // 선택한 sortLabel을 기준으로 프로젝트 리스트 불러오기
  const {
    data: projectsOfClient,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteProject, Error, IInpiniteProject>(
    ["projects", sortLabel],
    async ({ pageParam = 1 }) =>
      getProjectOfClientBySort(currentUserId as string, sortLabel as string, pageParam),
    {
      enabled: !!currentUserId,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 15);
        const nextPage = allPages.length + 1;
        return nextPage < maxPage ? nextPage : null;
      },
    }
  );

  const addProjectMutation = useMutation((newProject: Project) => addProject(newProject), {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  return { projectsOfClient, error, fetchNextPage, hasNextPage, status, addProjectMutation };
};

export default useProjectOfClientBySortQueries;
