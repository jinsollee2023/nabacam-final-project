import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";
import { Message } from "./Room";

interface MessagesProps {
  room_id: string;
}

const Messages = ({ room_id }: MessagesProps) => {
  const { user } = useUserStore();
  const userId = user.userId;
  const [messages, setMessages] = useState<Message[]>([]);

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
          table: "messages", // 내가 있는 방만
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

  return (
    /** 부모요소에 스크롤 있어야 */
    <div className="overflow-y-scroll flex-1 bg-red-200 p-2">
      <ul className="flex flex-1 flex-col justify-end p-4 space-y-1.5">
        {messages?.map((message) => (
          <li
            key={message.message_id}
            className={
              message.user_id === userId
                ? "self-start rounded bg-blue-400 p-1.5 text-gray-600"
                : "self-end rounded bg-gray-100 p-1.5 text-gray-600"
            }
          >
            <span className="block text-xs text-gray-500">
              {message.messageUser.name}
            </span>
            <span className="">{message.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;

// 커밋용
