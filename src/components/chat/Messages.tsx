import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../zustand/useUserStore";

interface Message {
  messageId: string;
  content: string;
  userId: string;
  messageUser: {
    name: string /**타입 재정의 */;
  };
}

const Messages = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const [messages, setMessages] = useState<Message[]>([]);

  const getData = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*, messageUser: users(name)"); /** users테이블도 같이 */
    if (!data) {
      toast.error("no data");
      return;
    }
    setMessages(data);
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

  console.log({ messages });

  return (
    /** 부모요소에 스크롤 있어야 */
    <div className="overflow-y-scroll flex-1 bg-red-200 p-2">
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
