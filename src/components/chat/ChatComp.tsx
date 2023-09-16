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
import useChatCompQueries from "../../hooks/queries/useChatCompQueries";

const ChatComp = () => {
  const communicationMenu = ["커뮤니케이션"];

  // const [exitResult, setExitResult] = useState(null)
  const { user } = useUserStore();
  const currentuserid = user.userId;
  console.log(`📍${user.role}로 ${currentuserid}님이 로그인하셨습니다.`);

  const {
    selectedRoom,
    createdRoomId,
    setSelectedRoom,
    setExitResult,
    exitResult,
  } = useRoomStore();
  const { existData } = useChatCompQueries({
    createdRoomId,
    exitResult,
    currentuserid,
  }); // 2. exit_id가 null인 data만 리턴
  console.log(existData);

  // useEffect(() => {
  //   const getWholeData = async () => {
  //     // 2 existentRoomsData 업데이트 (exit_id가 null인 data만 리턴)
  //     const { data: existentRoomsData, error } = await supabase.rpc(
  //       "get_whole"
  //     );
  //     if (error) toast.error(error.message);

  //     if (existentRoomsData) setWholeData(existentRoomsData);
  //   };
  //   getWholeData();
  // }, [createdRoomId, exitResult]);

  const handleRoomClick = (room: TRoom) => {
    setSelectedRoom(room);
  };

  const exitChat = async ({ room_id }: { room_id: string }) => {
    const exitConfirmed = window.confirm(
      "채팅방에서 나가시겠습니까? 나가기를 하면 대화내용이 모두 삭제됩니다."
    );

    if (exitConfirmed) {
      // 테이블의 exit_id 컬럼에 값이 있는지 확인
      const { data: result } = await supabase
        .from("room_participants")
        .select("exit_id")
        .eq("room_id", room_id)
        .single();
      console.log(result);

      // dB
      // 값이 없으면 user_id 집어넣음  // 1
      if (result?.exit_id === null) {
        // dB
        const { error } = await supabase
          .from("room_participants")
          .update({ exit_id: [currentuserid] })
          .eq("room_id", room_id);
        if (error) {
          toast.error(error.message);
          return;
        }

        // 상태관리
        setExitResult("no exit result");
        setSelectedRoom(null);
      } else if (result?.exit_id) {
        console.log(room_id);
        console.log(result.exit_id);

        const { error: rpdeleteError } = await supabase
          .from("room_participants")
          .delete()
          .match({ room_id: room_id });
        if (rpdeleteError) console.log(rpdeleteError);

        console.log("방", room_id);
        const { error: rdeleteError } = await supabase
          .from("rooms")
          .delete()
          .match({ room_id: room_id });

        if (rdeleteError) console.log(rdeleteError);
        console.log("here");

        // 상태관리
        setExitResult("deleted row");
        setSelectedRoom(null);
      }
    }
  };

  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
        {/* ============================================================================== */}
        <S.LeftRoomListContainer>
          <S.RoomListWrapper>
            {_.chain(existData)
              .flatten()
              .filter((room) => room.userId !== currentuserid)
              .map((room) => (
                <S.RoomBox
                  key={room.room_id}
                  isSelected={room.room_id === selectedRoom?.room_id}
                  onClick={() => handleRoomClick(room)}
                >
                  <S.RoomListImg src={room.photoURL} alt="Messagesender" />

                  <S.RoomListTextColumnWrapper>
                    <S.RoomListTextFlexWrapper>
                      <S.RoomListSenderName>{room.name}</S.RoomListSenderName>
                      <CommonS.CenterizeBox>
                        {user.role === "client" ? (
                          <S.RoomListSenderWorkField>
                            {room.workField.workField}&nbsp;
                            {room.workField.workSmallField}
                          </S.RoomListSenderWorkField>
                        ) : (
                          <S.RoomListSenderWorkField>
                            {}
                          </S.RoomListSenderWorkField>
                        )}
                      </CommonS.CenterizeBox>
                    </S.RoomListTextFlexWrapper>
                    <S.RoomListSenderLatestTextContent>
                      최근 메세지
                    </S.RoomListSenderLatestTextContent>
                  </S.RoomListTextColumnWrapper>
                  {/* ============================================================================== */}
                  <S.RoomListExitButton
                    onClick={() => exitChat({ room_id: room.room_id })}
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
