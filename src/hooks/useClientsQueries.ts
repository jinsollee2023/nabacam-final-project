import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "src/App";
import { User } from "src/Types";
import {
  getClientByProject,
  getFreelancersBySort,
  updateUser,
} from "src/api/User";

interface useClientsQueriesProps {
  userId: string;
}

const useClientsQueries = ({ userId }: useClientsQueriesProps) => {
  const { data: client } = useQuery(["clients", userId], async () => {
    const clientData = await getClientByProject(userId);
    return clientData;
  });

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
      photoURL,
      setUser,
      userId,
    }: {
      photoURL: string;
      setUser: (user: User) => void;
      userId: string;
    }) =>
      updateUser({
        userId,
        updatedData: {
          photoURL: `${photoURL}?updated=${new Date().getTime()}`,
        },
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
    clientMembersMutation,
    updateUserMutation,
  };
};

export default useClientsQueries;
