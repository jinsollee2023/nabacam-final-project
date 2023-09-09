import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";

interface MessagesProps {
  room_id: string;
}

export interface Message {
  message_id: string;
  content: string;
  user_id: string;
  room_id: string;
  // other table
  messageUserProfile: {
    name: string;
    userId: string;
  };
}

// let profileCache: { [key: string]: any } = {};

const Messages = ({ room_id }: MessagesProps) => {
  const { user } = useUserStore();
  const userId = user.userId;
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    try {
      const { data } = await supabase
        .from("messages")
        .select("*, messageUserProfile: users(userId, name)")
        .match({ room_id: room_id })
        .order("created_at");

      if (!data) {
        toast.error("no data");
        return;
      }

      // data
      //   .map((message) => message.messageUserProfile)
      //   .forEach((profile) => {
      //     profileCache[profile.userId] = profile;
      //   });

      setMessages(data);
      // 스크롤 밑으로 오도록
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
          table: "messages", // 내가 있는 방만
        },
        () => {
          getData();
          // setMessages((current) => [...current, {...payload.new, messageUserProfile: profileCache[payload.new.userId]}])
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    /** 부모요소에 스크롤 있어야 */
    <div className="overflow-y-scroll flex-1 bg-red-200 p-2" ref={messagesRef}>
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
              {message.messageUserProfile.name}
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
