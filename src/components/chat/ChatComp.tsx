import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Messages from "../../components/chat/Messages";
import supabase from "../../config/supabaseClient";
import { toast } from "react-toastify";
import Room, { TRoom } from "src/components/chat/Room";
import { useUserStore } from "../../store/useUserStore";
import MenuTabBarComp from "../common/MenuTabBarComp";
import { CommonS } from "../common/button/commonButton";
import { S } from "./chat.styles";
import { useRoomStore } from "../../store/useRoomStore";

const ChatComp = () => {
  const communicationMenu = ["커뮤니케이션"];

  const { user } = useUserStore();
  const userId = user.userId; // users테이블의 userId를 user_id컬럼에 삽입, rpc에도 삽입
  const [rooms, setRooms] = useState<TRoom[]>([]);

  const {
    roomName,
    selectedRoom,
    createdRoomId,
    setSelectedRoom,
    setCreatedRoomId,
  } = useRoomStore();

  console.log("second", { createdRoomId, selectedRoom });

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false }); // 가장 최신순 맨 위에
      console.log(data);
      if (data) setRooms(data);
    };
    getRooms();
  }, [createdRoomId, roomName]);

  const handleCreateRoom = async () => {
    const { data, error } = await supabase.rpc("create_room", {
      roomname: "방이름",
      user_id: userId,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      // console.log("yo", data);
      const room_id = data.room_id;
      setCreatedRoomId(room_id);
      setSelectedRoom(data);
    }
  };

  const handleRoomClick = (room: TRoom) => {
    setSelectedRoom(room);
  };
  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
        <S.LeftRoomListContainer>
          {/* <CommonS.RightEndBox
            style={{
              marginRight: "5px",
              height: "16px",
              padding: "3px",
            }}
          >
            <S.CreateRoomBtn onClick={handleCreateRoom}>+</S.CreateRoomBtn>
          </CommonS.RightEndBox> */}
          <S.RoomListWrapper>
            {rooms?.map((room) => (
              <S.RoomBox key={room.room_id}>
                <p>
                  <span
                    onClick={() => handleRoomClick(room)} // 클릭 시 해당 채팅방 정보를 선택
                  >
                    {room.roomname ?? "Untitled"}
                  </span>
                </p>
              </S.RoomBox>
            ))}
          </S.RoomListWrapper>
        </S.LeftRoomListContainer>
        {/* ============================================================================== */}
        <>
          {selectedRoom ? (
            <Room />
          ) : (
            <p>채팅 내역이 없습니다. 채팅을 보내보세요!</p>
          )}
        </>
      </S.Container>
    </MenuTabBarComp>
  );
};

export default ChatComp;
