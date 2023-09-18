import React, { useEffect } from "react";
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

  const { user } = useUserStore();
  const currentuserid = user.userId;

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
  });

  const filteredData = _.chain(existData)
    .flatten()
    .filter((room) => room.userId !== currentuserid)
    .filter((room) => room.exit_id !== currentuserid)
    .value();

  useEffect(() => {
    setSelectedRoom(selectedRoom ? selectedRoom : filteredData[0]);
  }, []);

  const handleRoomClick = (room: TRoom) => {
    setSelectedRoom(room);
  };

  const exitChat = async ({ room_id }: { room_id: string }) => {
    const exitConfirmed = window.confirm(
      "채팅방에서 나가시겠습니까? 나가기를 하면 대화내용이 모두 삭제됩니다."
    );

    if (exitConfirmed) {
      const { data: result } = await supabase
        .from("room_participants")
        .select("exit_id")
        .eq("room_id", room_id)
        .single();

      if (result?.exit_id === null) {
        const { error } = await supabase
          .from("room_participants")
          .update({ exit_id: currentuserid })
          .eq("room_id", room_id);
        if (error) {
          toast.error(error.message);
          return;
        }

        setExitResult("no exit result");
        setSelectedRoom(null);
      } else if (result?.exit_id) {
        const { error: rpdeleteError } = await supabase
          .from("room_participants")
          .delete()
          .match({ room_id: room_id });
        if (rpdeleteError) {
          toast.error(rpdeleteError.message);
          return;
        }

        const { error: rdeleteError } = await supabase
          .from("rooms")
          .delete()
          .match({ room_id: room_id });

        if (rdeleteError) {
          toast.error(rdeleteError.message);
          return;
        }

        setExitResult("deleted row");
        setSelectedRoom(null);
      }
    }
  };

  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
        <S.LeftRoomListContainer>
          <S.RoomListWrapper>
            {filteredData.length === 0 ? (
              <p>채팅내역이 없습니다.</p>
            ) : (
              filteredData.map((room) => (
                <S.RoomBox
                  key={room.room_id}
                  isSelected={room.room_id === selectedRoom?.room_id}
                  onClick={() => handleRoomClick(room)}
                >
                  <S.RoomListImageBox>
                    <img src={room.photoURL} alt="Messagesender" />
                  </S.RoomListImageBox>

                  <S.RoomListTextColumnWrapper>
                    <S.RoomListTextFlexWrapper>
                      <S.RoomListSenderName>{room.name}</S.RoomListSenderName>
                    </S.RoomListTextFlexWrapper>
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
                    <S.RoomListSenderLatestTextContent></S.RoomListSenderLatestTextContent>
                  </S.RoomListTextColumnWrapper>
                  <S.RoomListExitButton
                    onClick={() => exitChat({ room_id: room.room_id })}
                  >
                    <TbLogout />
                  </S.RoomListExitButton>
                </S.RoomBox>
              ))
            )}
          </S.RoomListWrapper>
        </S.LeftRoomListContainer>
        {selectedRoom ? <Room /> : null}
      </S.Container>
    </MenuTabBarComp>
  );
};

export default ChatComp;
