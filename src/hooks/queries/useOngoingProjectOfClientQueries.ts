import { useQuery } from "@tanstack/react-query";
import {getOngoingProjectsOfClient} from "src/api/Project";

interface useOngoingProjectsOfClientProps {
  currentUserId: string;
  freelancerId?: string;
  page?: number;
}

const useOngoingProjectOfClientQueries = ({
  currentUserId,
  freelancerId,
  page,
}: useOngoingProjectsOfClientProps) => {
  const { data: ongoingProjectsOfClient } = useQuery(
    ["ongoingProjectsOfClient"],
    async () => {
      const ongoingProjectsOfClientData = await getOngoingProjectsOfClient(
        currentUserId as string
      );
      return ongoingProjectsOfClientData;
    },
    {
      enabled: !!currentUserId,
    }
  );


  return {
    ongoingProjectsOfClient,
  };
};

export default useOngoingProjectOfClientQueries;
