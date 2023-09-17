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
  console.log({ createdRoomId, exitResult, currentuserid });

  const { data: existData } = useQuery(
    ["existData", exitResult, createdRoomId],
    async () => getWhole(currentuserid as string),
    { enabled: true || !!exitResult || !!createdRoomId }
  );

  // const { data: existDataWhenProject } = useQuery(
  //   ["existDataWhenProject", exitResult, createdRoomId],
  //   async () => getWholeWhenProject(currentuserid as string),
  //   { enabled: true || !!exitResult || !!createdRoomId }
  // );

  return {
    existData,
    // existDataWhenProject,
  };
};

export default useChatCompQueries;
