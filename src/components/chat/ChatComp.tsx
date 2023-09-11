import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Messages from "../../components/chat/Messages";
import supabase from "../../config/supabaseClient";
import { toast } from "react-toastify";
import { Room } from "src/components/chat/Room";
import { useUserStore } from "../../store/useUserStore";
import MenuTabBarComp from "../common/MenuTabBarComp";
import { styled } from "styled-components";
import { CommonS } from "../common/button/commonButton";

const ChatComp = () => {
  const communicationMenu = ["커뮤니케이션"];

  const { user } = useUserStore();
  const userId = user.userId; // users테이블의 userId를 user_id컬럼에 삽입, rpc에도 삽입
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

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
  }, []);

  const handleCreateRoom = async () => {
    const { data, error } = await supabase.rpc("create_room", {
      roomname: "test name",
      user_id: userId,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      const room_id = data.room_id;
      navigate(`/chat/${room_id}`);
    }
  };
  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
        <S.RoomListContainer>
          <CommonS.RightEndBox style={{ marginRight: "5px", marginTop: "5px" }}>
            <S.CreateRoomBtn onClick={handleCreateRoom}>+</S.CreateRoomBtn>
          </CommonS.RightEndBox>
          <S.RoomListWrapper>
            {rooms.map((room) => (
              <S.RoomBox key={room.room_id} className="mt-5">
                <p>
                  <Link to={`/chat/${room.room_id}`}>
                    <a>{room.roomname ?? "Untitled"}</a>
                  </Link>
                </p>
              </S.RoomBox>
            ))}
          </S.RoomListWrapper>
        </S.RoomListContainer>
        {/* ============================================================================== */}
      </S.Container>
    </MenuTabBarComp>
  );
};

export default ChatComp;

const S = {
  Container: styled.div`
    padding-left: 30px;
    width: 100%;
    display: flex;
    background-color: aliceblue;
  `,
  RoomListContainer: styled.div`
    display: flex;
    flex-direction: column;
    border-right: solid rgba(0, 0, 0, 0.25);
  `,
  RoomListWrapper: styled.div``,
  RoomBox: styled.div`
    box-sizing: border-box;

    width: 360px;
    height: 153px;

    background: #ffffff;
    border: 1px solid #cacaca;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    margin: 8px 8px 8px 0;
  `,
  CreateRoomBtn: styled.button`
    background-color: var(--main-blue);

    padding: 5px;
    border-radius: 5px;
  `,
};
