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
  console.log(rooms);
  const {
    roomName,
    selectedRoom,
    createdRoomId,
    setSelectedRoom,
    freelancerReceiver,
  } = useRoomStore();

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*, participantId: room_participants(user_id, receiver_id) ")
        // .select("*, receiverProfile: users(photoURL, name)")
        .order("created_at", { ascending: false }); // 가장 최신순 맨 위에

      //  if(data) {
      //   const initialRooms: TRoom[] = data;
      //   const  initialRooms.receiverProfile.
      //   await supabase.from("users").select("photoURL, name").match({userId: })}

      console.log("31", data);

      if (data) setRooms(data);
    };
    getRooms();
  }, [createdRoomId, roomName]);

  // const getLatestMessage = async () => {

  // }

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("schema-db-changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "messages",
  //         filter: `room_id=eq.${room_id}`, // 끄면 다른 방에도 메세지가 다 들어가게 됨
  //       },
  //       (payload) => {
  //         // console.log("payload", payload);
  //         getLatestMessage();
  //         setLatestMessage((current) => [...current, payload.new as Message]);

  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [room_id]);

  // const handleCreateRoom = async () => {
  //   const { data, error } = await supabase.rpc("create_room", {
  //     roomname: "방이름",
  //     user_id: userId,
  //   });
  //   if (error) {
  //     toast.error(error.message);
  //     return;
  //   }
  //   if (data) {
  //     // console.log("yo", data);
  //     const room_id = data.room_id;
  //     setCreatedRoomId(room_id);
  //     setSelectedRoom(data);
  //   }
  // };

  const handleRoomClick = (room: TRoom) => {
    setSelectedRoom(room);
  };
  return (
    <MenuTabBarComp menu={communicationMenu}>
      <S.Container>
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
                {/* <span>{room.roomname ?? "Untitled"}</span> */}
                <S.RoomListImg
                  // src={room.participantProfile?.receiver_id}
                  src="https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users/defaultProfileImage/defaultProfileImage.jpeg"
                  alt="Messagesender"
                />
                <S.RoomListTextColumnWrapper>
                  <S.RoomListTextFlexWrapper>
                    <S.RoomListSenderName>
                      {freelancerReceiver.freelancerReceiverName}
                    </S.RoomListSenderName>
                    <CommonS.CenterizeBox>
                      <S.RoomListSenderWorkField>
                        디자인
                      </S.RoomListSenderWorkField>
                    </CommonS.CenterizeBox>
                  </S.RoomListTextFlexWrapper>
                  <S.RoomListSenderLatestTextContent>
                    확인 가능할까요?
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
