import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../store/useUserStore";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";

interface MessagesProps {
  room_id: string;
}
interface UsersProfile {
  userId: string;
  name: string;
  photoURL: string;
}
export interface Message {
  message_id: string;
  content: string;
  user_id: string;
  room_id: string;
  // other table
  // usersProfileCache for user +) new user
  usersProfile: UsersProfile;
}

interface UsersProfileCache {
  [userId: string]: UsersProfile;
}

//===============================================================================================//
const Message = ({
  message,
  usersProfile,
  setUsersProfileCache,
}: {
  message: Message;
  usersProfile?: UsersProfile;
  setUsersProfileCache: React.Dispatch<React.SetStateAction<UsersProfileCache>>;
}) => {
  const { user } = useUserStore();
  const userId = user.userId;

  // usersProfile 없을시 확인후 fetch
  useEffect(() => {
    const fetchUsersProfile = async () => {
      const { data } = await supabase
        .from("users")
        .select("userId, name, photoURL")
        .match({ userId: message.user_id })
        .single();

      if (data) {
        setUsersProfileCache((current) => ({
          ...current,
          [data.userId]: data,
        }));
      }
    };
    if (!usersProfile) fetchUsersProfile();
  }, [usersProfile, message.user_id]);

  return (
    <S.MessageLi
      key={message.message_id}
      isMessageUser={message.user_id === userId}
    >
      {/* 이미지 */}
      <S.ParticipantProfileImageBox isMessageUser={message.user_id === userId}>
        <img src={`${usersProfile?.photoURL}`} alt="messageUser" />
      </S.ParticipantProfileImageBox>
      {/* 이름+말풍선 */}
      <S.ParticipantContentWrapper isMessageUser={message.user_id === userId}>
        <S.ParticipantProfileName>
          {usersProfile?.name ?? "Loading..."}
        </S.ParticipantProfileName>
        <S.MessageContent isMessageUser={message.user_id === userId}>
          {message.content}
        </S.MessageContent>
      </S.ParticipantContentWrapper>
    </S.MessageLi>
  );
};
//===============================================================================================//

const Messages = ({ room_id }: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [usersProfileCache, setUsersProfileCache] = useState<UsersProfileCache>(
    {}
  );

  const getData = async () => {
    try {
      const { data } = await supabase
        .from("messages")
        .select("*, usersProfile: users(userId, name, photoURL)") // 이제부터 data(messages)에 users테이블의 usersProfile 끼어서 들어오게 됨
        .match({ room_id: room_id })
        .order("created_at");

      if (!data) {
        toast.error("no data");
        return;
      }

      // 복수
      const newUsersProfiles = Object.fromEntries(
        data
          .map((message) => message.usersProfile)
          .filter(Boolean)
          .map((profile) => [profile!.userId, profile!])
      );

      setUsersProfileCache((current) => ({
        ...current,
        ...newUsersProfiles,
      }));

      setMessages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  // 1.initial fetch
  useEffect(() => {
    getData();
  }, [room_id]);

  // 2.realtime initial stream
  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${room_id}`, // 끄면 다른 방에도 메세지가 다 들어가게 됨
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);

          // 메시지가 추가될 때마다 스크롤 아래로 이동
          if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room_id]); // 수신자 발신자 sync

  return (
    /** 부모요소에 스크롤 있어야 */
    <S.MessageWrapper ref={messagesRef}>
      <ul
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "1.5rem",
        }}
      >
        {messages?.map((message) => (
          <Message
            message={message}
            usersProfile={usersProfileCache[message.user_id]}
            setUsersProfileCache={setUsersProfileCache}
          />
        ))}
      </ul>
    </S.MessageWrapper>
  );
};

export default Messages;
