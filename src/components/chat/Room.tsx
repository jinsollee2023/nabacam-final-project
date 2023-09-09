import React, { useEffect, useState } from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface Room {
  room_id: string;
  created_at: string;
  roomname: string | null;
}

const Room = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const { room_id } = useParams();

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

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full flex-1 flex-col items-stretch py-10 px-20 text-gray-800">
        {/* 제목 */}
        <h1 className="bg-yellow-100 px-4 py-2 text-4xl">00 Room</h1>
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
    </div>
  );
};

export default Room;
