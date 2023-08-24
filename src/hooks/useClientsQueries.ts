import { useQuery } from "@tanstack/react-query";
import { Project } from "src/Types";
import { getClientByProject } from "src/api/User";

const useClientsQueries = (project: Project) => {
  const { data: client } = useQuery(
    ["clients"],
    async () => {
      const clientsData = await getClientByProject(project.clientId);
      return clientsData;
    },
    {
      enabled: !!project,
    }
  );

  return {
    client,
  };
};

export default useClientsQueries;
