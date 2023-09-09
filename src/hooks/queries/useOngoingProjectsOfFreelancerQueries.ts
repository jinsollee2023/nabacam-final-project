import { useQuery } from "@tanstack/react-query";
import { getOngoingProjectsOfFreelancer } from "src/api/Project";
import {Project} from "../../Types";

interface useOngoingProjectsOfFreelancerQueriesProps {
  currentUserId: string;
}

const useOngoingProjectsOfFreelancerQueries = ({
  currentUserId,
}: useOngoingProjectsOfFreelancerQueriesProps) => {
  const { data: ongoingProjectsOfFreelancer } = useQuery<Project[]>(
    ["projects"],
    async () => {
      const projectsData = await getOngoingProjectsOfFreelancer(currentUserId as string);
      return projectsData;
    },
    {
      enabled: !!currentUserId,
    }
  );
  return { ongoingProjectsOfFreelancer };
};

export default useOngoingProjectsOfFreelancerQueries;
