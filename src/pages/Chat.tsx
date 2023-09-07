import React from "react";
import { Link } from "react-router-dom";
import Messages from "../components/chat/Messages";
import supabase from "../config/supabaseClient";
import { useUserStore } from "../zustand/useUserStore";
import { styled } from "styled-components";
import { toast } from "react-toastify";

//커뮤니케이션 플랫폼: 프리랜서와 클라이언트 간의 메시지, 미팅, 파일 공유를 지원
const Chat = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { data, error } = await supabase
        .from("messages")
        .insert({ content: message, userId: userId });

      if (error) toast.error(error.message);
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <head>
        <title>WorkWave Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="flex h-full w-full flex-1 flex-col items-stretch bg-blue-400 py-10 px-20 text-gray-800">
        <h1 className="bg-green-200 px-4 py-2 text-4xl">
          <a>WorkWave Chat</a>
          <button className="ml-4 rounded border bg-red-200 p-2 text-xs">
            New room
          </button>
        </h1>
        <div className="bg-red-200 p-2">
          <Messages />
          <form onSubmit={handleSubmit}>
            <input type="text" name="message" />
          </form>
        </div>

        {/* <div className="flex-1 bg-pink-200 p-4">
          {rooms.map((room) => (
            <div key={room.id}>
              <Link href={`/rooms/${room.id}`}>
                <a>{room.name ?? "Untitled"}</a>
              </Link>
            </div>
          ))}
        </div> */}
      </main>
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
