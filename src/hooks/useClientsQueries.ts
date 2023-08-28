import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "src/App";
import { getClientByProject, updateUser } from "src/api/User";

const useClientsQueries = (clientId: string) => {
  const { data: client } = useQuery(
    ["clients", clientId],
    async () => {
      const clientsData = await getClientByProject(clientId);
      return clientsData;
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
        queryClient.invalidateQueries(["clients", clientId]);
      },
    }
  );

  return {
    client,
    clientMembersMutation,
  };
};

export default useClientsQueries;
