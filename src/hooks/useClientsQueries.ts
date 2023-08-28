import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "src/App";
import { getClientByProject, getClients, updateUser } from "src/api/User";

const useClientsQueries = (clientId: string) => {
  const { data: client } = useQuery(
    ["client"],
    async () => {
      const clientData = await getClientByProject(clientId);
      return clientData;
    },
    {
      enabled: !!clientId,
    }
  );

  const clientMembersMutation = useMutation(
    ({ updatedData, userId }: { updatedData: object; userId: string }) =>
      updateUser({ updatedData, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients"]);
      },
    }
  );

  return {
    client,
    clientMembersMutation,
  };
};

export default useClientsQueries;
