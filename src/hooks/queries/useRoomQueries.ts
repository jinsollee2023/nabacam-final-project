import { useQuery } from "@tanstack/react-query";
import { getRoomName } from "src/api/Chat";
import { TRoom } from "src/components/chat/Room";

const useRoomQueries = ({
  selectedRoomId,
  selectedRoom,
}: {
  selectedRoomId: string;
  selectedRoom: TRoom | null;
}) => {
  const { data: roomNameData } = useQuery(
    ["roomNameData"],
    async () => getRoomName(selectedRoomId),
    { enabled: !!selectedRoomId || !!selectedRoom }
  );

  return { roomNameData };
};

export default useRoomQueries;
