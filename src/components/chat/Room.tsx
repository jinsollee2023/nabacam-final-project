import React, { useEffect, useState } from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export interface Room {
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
        .insert({ user_id: data.userId, room_id: room_id }); // policy
      if (error) return toast.error(error.message);

      target.value = "";
    }
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full flex-1 flex-col items-stretch py-10 px-20 text-gray-800">
        {/* 제목 */}
        <div className="bg-yellow-100 px-4 py-2 flex justify-between">
          <h1 className="text-4xl">00 Room</h1>
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
