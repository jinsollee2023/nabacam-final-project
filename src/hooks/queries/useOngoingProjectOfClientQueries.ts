import { useQuery } from "@tanstack/react-query";
import { IProjectWithFreelancer } from "src/Types";
import { getOngoingProjectsOfClient } from "src/api/Project";
import { getUser } from "src/api/User";

interface useOngoingProjectsOfClientProps {
  currentUserId: string;
  freelancerId?: string;
  // page?: number;
}

const useOngoingProjectOfClientQueries = ({
  currentUserId,
  freelancerId,
}: // page,
useOngoingProjectsOfClientProps) => {
  const { data: ongoingProjectsOfClient } = useQuery(
    ["ongoingProjectsOfClient"],
    async () => {
      const ongoingProjectsOfClientData = await getOngoingProjectsOfClient(
        currentUserId as string
        // page as number
      );
      return ongoingProjectsOfClientData;
    },
    {
      enabled: !!currentUserId,
    }
  );

  // 진행중인 프리랜서 목록
  const {
    data: freelancersWithOngoingProjects,
    isLoading: freelancersWithOngoingProjectsIsLoading,
    isError: freelancersWithOngoingProjectsIsError,
  } = useQuery<IProjectWithFreelancer[]>(
    ["freelancersWithOngoingProjects"],
    async () => {
      const ongoingProjectsData = await getOngoingProjectsOfClient(
        currentUserId as string
        // page as number
      );

      const ongoingProjectsWithPromise = ongoingProjectsData.map((info) => ({
        ...info,
        freelancerPromise: getUser(info.freelancerId as string),
      }));

      const freelancersWithOngoingProjects = await Promise.all(
        ongoingProjectsWithPromise.map(async (project) => ({
          ...project,
          freelancer: await project.freelancerPromise,
        }))
      );
      return freelancersWithOngoingProjects;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    ongoingProjectsOfClient,
    freelancersWithOngoingProjects,
    freelancersWithOngoingProjectsIsLoading,
    freelancersWithOngoingProjectsIsError,
  };
};

export default useOngoingProjectOfClientQueries;
