import { useQuery } from "@tanstack/react-query";
import { getTerminationedProjects } from "src/api/Project";
import { getUser } from "src/api/User";

interface useTerminationedProjectsQueriesProps {
  currentUserId: string;
  freelancerId?: string;
}

const useTerminationedProjectsQueries = ({
  currentUserId,
  freelancerId,
}: useTerminationedProjectsQueriesProps) => {
  // 계약이 끝난 프리랜서 목록
  const {
    data: freelancersWithTerminatedProjects,
    isLoading: freelancersWithTerminatedProjectsIsLoading,
    isError: freelancersWithTerminatedProjectsIsError,
  } = useQuery(
    ["freelancersWithTerminatedProjects"],
    async () => {
      const terminationedProjectsData = await getTerminationedProjects(currentUserId as string);
      const terminationedProjectsArray = [];

      for (const info of terminationedProjectsData) {
        terminationedProjectsArray.push({
          ...info,
          freelancer: await getUser(info.freelancerId as string),
        });
      }

      return terminationedProjectsArray.filter((info) => info.freelancer !== null);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    freelancersWithTerminatedProjects,
    freelancersWithTerminatedProjectsIsLoading,
    freelancersWithTerminatedProjectsIsError,
  };
};

export default useTerminationedProjectsQueries;
