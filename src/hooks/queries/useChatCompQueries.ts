import { useQuery } from "@tanstack/react-query";
import { getWhole } from "src/api/Chat";

const useChatCompQueries = ({
  createdRoomId,
  exitResult,
  currentuserid,
}: {
  createdRoomId: string;
  exitResult: null | string;
  currentuserid?: string;
}) => {
  const { data: existData } = useQuery(
    ["existData", exitResult, createdRoomId],
    async () => getWhole(currentuserid as string),
    { enabled: true || !!exitResult || !!createdRoomId }
  );

  return {
    existData,
  };
};

export default useChatCompQueries;
