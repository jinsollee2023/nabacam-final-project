import React, { useEffect, useState } from "react";
import Messages from "../chat/Messages";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";
import { CommonS } from "../common/button/commonButton";
import Modal from "../modal/Modal";

export interface TRoom {
  room_id: string;
  created_at: string;
  roomname: string | null;
  participantProfile?: {
    user_id: string;
    receiver_id: string;
  };
}

const Room = () => {
  const { user } = useUserStore();
  const userId = user.userId;

  const { roomName, selectedRoom, setRoomName, setSelectedRoom } =
    useRoomStore();
  const room_id = selectedRoom?.room_id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getRoomName = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("roomname")
        .match({ room_id: room_id })
        .single();
      setRoomName(data?.roomname ?? "Untitled"); // ChatComp에 띄우기 위함
    };
    if (room_id) getRoomName(); // selectedRoom했을 때만 getRoomName()
  }, [room_id, roomName]);

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
          <S.DMHeaderBackButton onClick={() => setSelectedRoom(null)}>
            <IoIosArrowBack />
          </S.DMHeaderBackButton>
          <S.DMRoomName onClick={handleRoomRename}>{roomName}</S.DMRoomName>
          {/* <S.DMRoomNameInput type="text" onKeyPress={handleInvite} /> */}
          <CommonS.RightEndButtonBox>
            <S.DMHamburgerMenuButton
              style={{}}
              // onClick={() => {
              //   setIsModalOpen(true);
              // }}
            >
              <GiHamburgerMenu />
            </S.DMHamburgerMenuButton>
          </CommonS.RightEndButtonBox>
        </S.DMHeader>

        {/* 초대 모달 */}
        {isModalOpen && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            buttons={
              <>
                <S.DMRoomInviteModalButton style={{ width: "100%" }}>
                  초대하기
                </S.DMRoomInviteModalButton>
              </>
            }
          >
            <S.DMRoomNameInput
              type="text"
              onKeyPress={handleInvite}
              placeholder="초대할 멤버이름을 입력해주세요..."
            />
          </Modal>
        )}

        {/* 본문 */}
        {room_id && <Messages room_id={room_id} />}
        {/* 창 */}
        <S.DMForm onSubmit={handleSubmit}>
          <S.DMInput type="text" name="message" />
          <S.DMSubmitButton>전송</S.DMSubmitButton>
        </S.DMForm>
      </S.DMWrapper>
    </S.RightDMRoomContainer>
  );
};

export default Room;
