import { useQuery } from "@tanstack/react-query";
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
    error: projectListIsError,
    isLoading: projectListIsLoading,
  } = useQuery(["projectsListBySort", sortLabel], async () => {
    const projectList = await getProjectOfFreelancerBySort(sortLabel as string);
    return projectList;
  });

  return {
    projectsListBySort,
    projectListIsError,
    projectListIsLoading,
  };
};

export default useProjectOfFreelancerBySortQueries;
