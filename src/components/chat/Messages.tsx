import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";

interface Message {
  messageId: string;
  content: string;
  userId: string;
}

interface Payload {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: string;
  new: {
    content: string;
    created_at: string;
    messageId: string;
    userId: string;
  };
}

const Messages = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*");
      if (!data) {
        toast.error("no data");
        return;
      }
      setMessages(data);
    };
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
        },
        (payload: any) => {
          console.log(payload);
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <ul className="flex flex-1 flex-col justify-end p-4 space-y-1.5">
      {messages?.map((message) => (
        <li
          key={message.messageId}
          className={
            message.userId === userId
              ? "self-start rounded bg-blue-400 p-1.5 text-gray-600"
              : "self-end rounded bg-gray-100 p-1.5 text-gray-600"
          }
        >
          {message.content}
        </li>
      ))}
    </ul>
  );
};

export default Messages;
