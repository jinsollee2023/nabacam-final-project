import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../store/useUserStore";
import { S } from "./chat.styles";
import { TMessage, UsersProfile, UsersProfileCache } from "src/Types";

interface MessagesProps {
  room_id: string;
}

const Message = ({
  message,
  usersProfile,
  setUsersProfileCache,
}: {
  message: TMessage;
  usersProfile?: UsersProfile;
  setUsersProfileCache: React.Dispatch<React.SetStateAction<UsersProfileCache>>;
}) => {
  const { user } = useUserStore();
  const userId = user.userId;

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
      <S.ParticipantProfileImageBox isMessageUser={message.user_id === userId}>
        <img src={`${usersProfile?.photoURL}`} alt="messageUser" />
      </S.ParticipantProfileImageBox>

      <S.ParticipantContentWrapper isMessageUser={message.user_id === userId}>
        <S.ParticipantProfileName>
          {usersProfile?.name ?? "Loading..."}
        </S.ParticipantProfileName>
        <S.MessageContentWrapper>
          <S.MessageContent isMessageUser={message.user_id === userId}>
            {message.content}
          </S.MessageContent>
        </S.MessageContentWrapper>
      </S.ParticipantContentWrapper>
    </S.MessageLi>
  );
};

const Messages = ({ room_id }: MessagesProps) => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [usersProfileCache, setUsersProfileCache] = useState<UsersProfileCache>(
    {}
  );

  const getData = async () => {
    try {
      const { data } = await supabase
        .from("messages")
        .select("*, usersProfile: users(userId, name, photoURL)")
        .match({ room_id: room_id })
        .order("created_at");

      if (!data) {
        toast.error("에러가 발생했습니다");
        return;
      }

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
      toast.error("에러가 발생했습니다");
    }
  };

  useEffect(() => {
    getData();
  }, [room_id]);

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${room_id}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as TMessage]);

          if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room_id]);

  return (
    <S.MessageWrapper ref={messagesRef}>
      <S.MessageUl>
        {messages?.map((message) => (
          <Message
            message={message}
            usersProfile={usersProfileCache[message.user_id]}
            setUsersProfileCache={setUsersProfileCache}
          />
        ))}
      </S.MessageUl>
    </S.MessageWrapper>
  );
};

export default Messages;
