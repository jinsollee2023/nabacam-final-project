import React from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";

const Room = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const { selectedRoom, setSelectedRoom } = useRoomStore();

  const selectedRoomId = selectedRoom?.room_id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { error } = await supabase
        .from("messages")
        .insert({ content: message, room_id: selectedRoomId, user_id: userId });

      if (error) toast.error("에러가 발생했습니다");
    }
  };

  return (
    <S.RightDMRoomContainer>
      <S.DMWrapper>
        <S.DMHeader>
          <S.DMHeaderBackButton onClick={() => setSelectedRoom(null)}>
            <IoIosArrowBack />
          </S.DMHeaderBackButton>
          <S.DMRoomName>{selectedRoom?.roomname}</S.DMRoomName>
        </S.DMHeader>

        {selectedRoomId && <Messages room_id={selectedRoomId} />}

        <S.DMForm onSubmit={handleSubmit}>
          <S.DMInput type="text" name="message" autoComplete="off" />
          <S.DMSubmitButton>전송</S.DMSubmitButton>
        </S.DMForm>
      </S.DMWrapper>
    </S.RightDMRoomContainer>
  );
};

export default Room;
