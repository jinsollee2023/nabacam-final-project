import { TRoom } from "src/components/chat/Room";
import supabase from "../config/supabaseClient";

export const getWhole = async (currentuserid: string): Promise<TRoom[]> => {
  const { data: existData, error } = await supabase.rpc("get_whole", {
    currentuserid: currentuserid,
  });

  console.log(existData);
  return existData as TRoom[];
};

// export const getWholeWhenProject = async (
//   currentuserid: string
// ): Promise<TRoom[]> => {
//   const { data: existDataWhenProject, error } = await supabase.rpc(
//     "get_whole_when_project",
//     {
//       currentuserid: currentuserid,
//     }
//   );

//   return existDataWhenProject as TRoom[];
// };

export const getRoomName = async (selectedRoomId: string) => {
  const { data: roomNameData } = await supabase
    .from("rooms")
    .select("roomname")
    .match({ room_id: selectedRoomId })
    .single();
  // console.log(roomNameData);
  return roomNameData;
};
