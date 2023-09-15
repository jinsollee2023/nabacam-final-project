import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { User } from "../../Types";
import { getClientByProject, updateUser } from "../../api/User";

interface useClientsQueriesProps {
  userId: string;
}

const useClientsQueries = ({ userId }: useClientsQueriesProps) => {
  const {
    data: client,
    isError: clientDataError,
    isLoading: clientDataLoading,
  } = useQuery(
    ["clients", userId],
    async () => {
      const clientData = await getClientByProject(userId);
      return clientData;
    },
    {
      enabled: !!userId,
    }
  );

  const clientMembersMutation = useMutation(
    ({
      updatedData,
      userId,
      setUser,
    }: {
      updatedData: object;
      userId: string;
      setUser: (user: User) => void;
    }) => updateUser({ updatedData, userId, setUser }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients", userId]);
      },
    }
  );

  const updateUserMutation = useMutation(
    ({
      updatedData,
      setUser,
      userId,
    }: {
      updatedData: {
        name: string;
        workField: {
          workField: string;
          workSmallField: string;
        };
        contact: {
          email: string;
          phone: string;
        };
        photoURL: string;
      };
      setUser: (user: User) => void;
      userId: string;
    }) =>
      updateUser({
        userId,
        updatedData,
        setUser,
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  return {
    client,
    clientDataError,
    clientDataLoading,
    clientMembersMutation,
    updateUserMutation,
  };
};

export default useClientsQueries;
