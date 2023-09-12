import { useQuery } from "@tanstack/react-query";
import { getTerminationedProjectsWithFreelancer } from "src/api/Project";

interface useTerminationedProjectsWithFreelancerQueriesProps {
  currentUserId: string;
  freelancerId: string;
}

const useTerminationedProjectsWithFreelancerQueries = ({
  currentUserId,
  freelancerId,
}: useTerminationedProjectsWithFreelancerQueriesProps) => {
  // 계약이 끝난 프로젝트 중 프리랜서 아이디가 동일한 데이터 목록
  const { data: matchingCompletedProjectsData } = useQuery(
    ["matchingCompletedProjectsData"],
    async () => {
      const terminationedProjects = await getTerminationedProjectsWithFreelancer(
        currentUserId as string,
        freelancerId as string
      );
      if (!terminationedProjects) {
        return [];
      }
      return terminationedProjects;
    },
    {
      enabled: !!currentUserId && !!freelancerId,
    }
  );

  return {matchingCompletedProjectsData};
};

export default useTerminationedProjectsWithFreelancerQueries;
