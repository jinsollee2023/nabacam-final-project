import React from "react";
import { Link } from "react-router-dom";
import Messages from "../components/chat/Messages";
import supabase from "../config/supabaseClient";
import { useUserStore } from "../zustand/useUserStore";
import { styled } from "styled-components";
import { toast } from "react-toastify";

const Chat = () => {
  const { user } = useUserStore();
  const userId = user.userId; // users테이블의 userId를 user_id컬럼에 삽입

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      await supabase
        .from("messages")
        .insert({ content: message, user_id: userId });

      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      console.log({ data });
      if (error) toast.error(error.message);
    }
  };

  const handleCreateRoom = async () => {
    const { data, error } = await supabase.from("rooms").insert({});
    console.log({ data }); // 1:51:00

    if (error) {
      toast.error(error.message);
      return;
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full flex-1 flex-col items-stretch bg-blue-400 py-10 px-20 text-gray-800">
        {/* 제목 */}
        <h1 className="bg-green-200 px-4 py-2 text-4xl">
          <a>WorkWave Chat</a>
          <button
            onClick={handleCreateRoom}
            className="ml-4 rounded border bg-red-200 p-2 text-xs"
          >
            New room
          </button>
        </h1>
        {/* 본문 */}
        <Messages />
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

export default Chat;

const S = {
  Text: styled.div`
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
  `,
};
