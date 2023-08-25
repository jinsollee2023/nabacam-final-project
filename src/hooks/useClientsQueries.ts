import { useQuery } from "@tanstack/react-query";
import { getClientByProject } from "src/api/User";

const useClientsQueries = (clientId: string) => {
  const { data: client } = useQuery(
    ["clients"],
    async () => {
      const clientsData = await getClientByProject(clientId);
      return clientsData;
    },
    {
      enabled: !!clientId,
    }
  );

  return {
    client,
  };
};

export default useClientsQueries;
