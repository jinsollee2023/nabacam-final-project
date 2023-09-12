import React, { useEffect, useState } from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";

export interface TRoom {
  room_id: string;
  created_at: string;
  roomname: string | null;
}

interface RoomProps {
  room_id: string;
  setSelectedRoom: React.Dispatch<React.SetStateAction<TRoom | null>>;
}

const Room = ({ room_id, setSelectedRoom }: RoomProps) => {
  const { user } = useUserStore();
  const userId = user.userId;

  // const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const { roomName, setRoomName } = useRoomStore();

  useEffect(() => {
    const getRoomName = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("roomname")
        .match({ room_id: room_id })
        .single();
      setRoomName(data?.roomname ?? "Untitled");
    };
    if (room_id) getRoomName();
  }, [room_id]);

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
        .insert({ user_id: data.userId, room_id: room_id });

      if (error) return toast.error(error.message);
      toast.success(`${target.value}님이 초대되셨습니다!`);
      target.value = "";
    }
  };

  // 방 이름 수정
  const handleRoomRename = async () => {
    const newRoomName = prompt("What would you like to rename to?");
    const oldName = roomName; // for optimistic update
    if (!newRoomName) return;
    setRoomName(newRoomName);

    const { error } = await supabase
      .from("rooms")
      .update({ roomname: newRoomName })
      .match({ room_id: room_id })
      .select();

    if (error) {
      setRoomName(oldName); // for optimistic update
      toast.error(error.message);
    }
  };

  return (
    <S.RightDMRoomContainer>
      <S.DMWrapper>
        {/* 제목 */}
        <S.DMHeader>
          <button onClick={() => setSelectedRoom(null)}>
            <IoIosArrowBack />
          </button>
          <S.DMRoomName onClick={handleRoomRename}>{roomName}</S.DMRoomName>
          <S.DMRoomNameInput type="text" onKeyPress={handleInvite} />
        </S.DMHeader>

        {/* 본문 */}
        {room_id && <Messages room_id={room_id} />}
        {/* 창 */}
        <S.DMForm onSubmit={handleSubmit}>
          <S.DMInput type="text" name="message" />
          <S.DMSubmitBtn>전송</S.DMSubmitBtn>
        </S.DMForm>
      </S.DMWrapper>
    </S.RightDMRoomContainer>
  );
};

export default Room;
