import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import Room, { TRoom } from "src/components/chat/Room";
import MenuTabBarComp from "../common/MenuTabBarComp";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";
import { CommonS } from "../common/button/commonButton";
import { TbLogout } from "react-icons/tb";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/useUserStore";
import _ from "lodash";

const ChatComp = () => {
  const communicationMenu = ["커뮤니케이션"];
  const [wholeData, setWholeData] = useState<TRoom[]>([]);
  const { selectedRoom, createdRoomId, setSelectedRoom } = useRoomStore();
  const { user } = useUserStore();
  const currentUserId = user.userId;
  console.log("currentUserId", currentUserId);

  useEffect(() => {
    const getWholeData = async () => {
      const { data, error } = await supabase.rpc("get_whole");
      if (error) toast.error(error.message);

      console.log("53", data);
      if (data) setWholeData(data);
    };
    getWholeData();
  }, [createdRoomId]);

  const handleRoomClick = (room: TRoom) => {
    setSelectedRoom(room);
  };

  const exitChat = async ({
    user_id,
    room_id,
  }: {
    user_id: string;
    room_id: string;
  }) => {
    const exitConfirmed = window.confirm(
      "채팅방에서 나가시겠습니까? 나가기를 하면 대화내용이 모두 삭제됩니다."
    );

    if (exitConfirmed) {
      // room_participants 테이블에서 제거
      const { error } = await supabase
        .from("room_participants")
        // .eq("user_id", user_id)
        // .or([{ "user_id": user_id }, { "receiver_id": receiver_id }]) // user_id 또는 receiver_id 중 하나와 일치하는 경우 삭제
        .update({ user_id: "exited" })
        // update (false -> true)
        .eq("room_id", room_id);

      if (error) {
        toast.error(error.message);
        return;
      }
    }
  };

  console.log("97", wholeData);

  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
        {/* ============================================================================== */}
        <S.LeftRoomListContainer>
          <S.RoomListWrapper>
            {_.chain(wholeData)
              .flatten()
              .filter((room) => room.userId !== currentUserId)
              .map((room) => (
                <S.RoomBox
                  key={room.room_id}
                  isSelected={
                    selectedRoom !== null &&
                    room.room_id === selectedRoom.room_id
                  }
                  onClick={() => handleRoomClick(room)}
                >
                  <S.RoomListImg src={room.photoURL} alt="Messagesender" />

                  <S.RoomListTextColumnWrapper>
                    <S.RoomListTextFlexWrapper>
                      <S.RoomListSenderName>{room.name}</S.RoomListSenderName>
                      <CommonS.CenterizeBox>
                        <S.RoomListSenderWorkField>
                          {room.workField.workField}&nbsp;
                          {room.workField.workSmallField}
                        </S.RoomListSenderWorkField>
                      </CommonS.CenterizeBox>
                    </S.RoomListTextFlexWrapper>
                    <S.RoomListSenderLatestTextContent>
                      최근 메세지
                    </S.RoomListSenderLatestTextContent>
                  </S.RoomListTextColumnWrapper>
                  {/* ============================================================================== */}
                  <S.RoomListExitButton
                    onClick={() =>
                      exitChat({ user_id: room.user_id, room_id: room.room_id })
                    }
                  >
                    <TbLogout />
                  </S.RoomListExitButton>
                  {/* ============================================================================== */}
                </S.RoomBox>
              ))
              .value()}
          </S.RoomListWrapper>
        </S.LeftRoomListContainer>
        {/* ============================================================================== */}
        {selectedRoom ? <Room /> : null}
      </S.Container>
    </MenuTabBarComp>
  );
};

export default ChatComp;
