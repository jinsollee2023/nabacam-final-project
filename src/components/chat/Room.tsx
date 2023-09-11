import React, { useEffect, useState } from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export interface Room {
  room_id: string;
  created_at: string;
  roomname: string | null;
}

const Room = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const { room_id } = useParams();
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getRoomName = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("roomname")
        .match({ room_id: room_id })
        .single();
      setRoomName(data?.roomname ?? "Untitled");
    };
    if (room_id) getRoomName();
  }, [room_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { data, error } = await supabase
        .from("messages")
        .insert({ content: message, room_id: room_id, user_id: userId });

      if (error) toast.error(error.message);
    }
  };

  const handleInvite = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 입력값
      const target = e.currentTarget;
      // 입력값 -> find matching user in users
      const { data } = await supabase
        .from("users")
        .select("userId")
        .match({ name: target.value })
        .single();
      console.log(data);
      if (!data) return toast.error("No User found");

      // matching user -> room_participants
      const { error } = await supabase
        .from("room_participants")
        .insert({ user_id: data.userId, room_id: room_id });

      //   .upsert({ user_id: data.userId }) // policy
      //   .eq("roomd_id", room_id)
      //   .select();
      // console.log(room_participants_data);
      if (error) return toast.error(error.message);
      toast.success(`${target.value}님이 초대되셨습니다!`);
      target.value = "";
    }
  };

  const handleRoomRename = async () => {
    const newRoomName = prompt("What would you like to rename to?");
    const oldName = roomName; // for optimistic update
    if (!newRoomName) return;
    setRoomName(newRoomName);

    const { error } = await supabase
      .from("rooms")
      .update({ roomname: newRoomName })
      .match({ room_id: room_id })
      .select();

    if (error) {
      setRoomName(oldName); // for optimistic update
      toast.error(error.message);
    }
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full flex-1 flex-col items-stretch py-10 px-20 text-gray-800">
        {/* 제목 */}
        <div className="bg-yellow-100 px-4 py-2 flex justify-between">
          <button onClick={() => navigate("/chat")}>
            <IoIosArrowBack />
          </button>
          <button className="text-2xl" onClick={handleRoomRename}>
            {roomName}
          </button>
          {/*  */}
          <input type="text" onKeyPress={handleInvite} />
        </div>

        {/* 본문 */}
        {room_id && <Messages room_id={room_id} />}
        {/* 창 */}
        <form onSubmit={handleSubmit} className="w-full bg-gray-100 p-1">
          <input
            type="text"
            name="message"
            className="w-full border-none bg-neutral-500"
          />
        </form>
      </div>
    </section>
  );
};

export default Room;
