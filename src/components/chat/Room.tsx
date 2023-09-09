import React, { useEffect, useRef, useState } from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface Message {
  messageId: string;
  content: string;
  userId: string;
  messageUser: {
    name: string /**타입 재정의 */;
  };
}

const Room = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const { room_id } = useParams();

  console.log({ room_id });
  const [messages, setMessages] = useState<Message[]>([]); // 메시지 상태 추가
  const messagesRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    try {
      const { data } = await supabase
        .from("messages")
        .select("*, messageUser: users(name)")
        .match({ room_id: room_id })
        .order("created_at");

      if (!data) {
        toast.error("no data");
        return;
      }
      console.log(data);
      setMessages(data);
      // 스크롤이 밑으로 따라오도록
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: "room_id=eq.room_id",
        },
        () => {
          /**payload */
          getData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { data, error } = await supabase
        .from("messages")
        .insert({ content: message, room_id: room_id, userId: userId });
      console.log("here", data);

      if (error) toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full w-full flex-1 flex-col items-stretch py-10 px-20 text-gray-800">
        {/* 제목 */}
        <h1 className="bg-yellow-100 px-4 py-2 text-4xl">00 Room</h1>
        {/* 본문 */}
        {/* {room_id && <Messages room_id={room_id} messages={messages} />} */}
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
