import { useQuery } from "@tanstack/react-query";
import { Project } from "src/Types";
import { getProjectByClientWithBeforeProgress } from "src/api/Project";

interface useProjectByClientWithBeforeProgressQueriesProps {
  currentUserId: string;
  freelancerId: string;
  selectedProject?: Project | null;
}

const useProjectByClientWithBeforeProgressQueries = ({
  currentUserId,
  freelancerId,
}: useProjectByClientWithBeforeProgressQueriesProps) => {
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
          (projectList: Project) =>
            !projectList.SuggestedFreelancers?.includes(freelancerId) &&
            !projectList.volunteer?.includes(freelancerId) &&
            !projectList.pendingFreelancer?.includes(freelancerId)
        ),
    }
  );
  return {
    projectDataForSuggestions,
    projectDataForSuggestionsIsLoading,
    projectDataForSuggestionsIsError,
    refetchprojectDataForSuggestions,
  };
};

export default useProjectByClientWithBeforeProgressQueries;
