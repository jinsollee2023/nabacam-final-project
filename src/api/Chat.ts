import { TRoom } from "../Types";
import supabase from "../config/supabaseClient";

export const getWhole = async (currentuserid: string): Promise<TRoom[]> => {
  const { data: existData, error } = await supabase.rpc("get_whole", {
    currentuserid: currentuserid,
  });

  return existData as TRoom[];
};

export const getRoomName = async (selectedRoomId: string) => {
  const { data: roomNameData } = await supabase
    .from("rooms")
    .select("roomname")
    .match({ room_id: selectedRoomId })
    .single();
  return roomNameData;
};
