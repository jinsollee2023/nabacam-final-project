import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import Room, { TRoom } from "src/components/chat/Room";
import MenuTabBarComp from "../common/MenuTabBarComp";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";
import { CommonS } from "../common/button/commonButton";

const ChatComp = () => {
  const communicationMenu = ["커뮤니케이션"];
  const [rooms, setRooms] = useState<TRoom[]>([]);
  const { roomName, selectedRoom, createdRoomId, setSelectedRoom } =
    useRoomStore();

  useEffect(() => {
    const getRooms = async () => {
      const { data, error } = await supabase.rpc("get_user_data_for_rooms");
      if (data) setRooms(data);
    };
    getRooms();
  }, [createdRoomId, roomName]);

  // const getLatestMessage = async () => {

  // }

  const handleRoomClick = (room: TRoom) => {
    setSelectedRoom(room);
  };
  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
        {/* ============================================================================== */}
        <S.LeftRoomListContainer>
          <S.RoomListWrapper>
            {rooms?.map((room) => (
              <S.RoomBox
                key={room.room_id}
                isSelected={
                  selectedRoom !== null && room.room_id === selectedRoom.room_id
                }
                onClick={() => handleRoomClick(room)}
              >
                <S.RoomListImg src={room.photoURL} alt="Messagesender" />

                <S.RoomListTextColumnWrapper>
                  <S.RoomListTextFlexWrapper>
                    <S.RoomListSenderName>{room.name}</S.RoomListSenderName>
                    <CommonS.CenterizeBox>
                      <S.RoomListSenderWorkField>
                        {room.workField.workSmallField}
                      </S.RoomListSenderWorkField>
                    </CommonS.CenterizeBox>
                  </S.RoomListTextFlexWrapper>
                  <S.RoomListSenderLatestTextContent>
                    최근 메세지
                  </S.RoomListSenderLatestTextContent>
                </S.RoomListTextColumnWrapper>
              </S.RoomBox>
            ))}
          </S.RoomListWrapper>
        </S.LeftRoomListContainer>
        {/* ============================================================================== */}
        {selectedRoom ? <Room /> : null}
      </S.Container>
    </MenuTabBarComp>
  );
};

export default ChatComp;
