import React from "react";

import { HiOutlinePaperAirplane } from "react-icons/hi";
import { S } from "./freelancerInfo.style";
import { IUser } from "../../../../Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../config/supabaseClient";
import { useUserStore } from "../../../../store/useUserStore";
import { useRoomStore } from "../../../../store/useRoomStore";

interface FreelancerProfileProps {
  user: IUser;
}

const FreelancerProfile = ({ user: freelancer }: FreelancerProfileProps) => {
  // sender (client)
  const { user: client } = useUserStore();
  const { setSelectedRoom, setCreatedRoomId, createdRoomId } = useRoomStore();
  const clientId = client.userId;
  const clientName = client.name;

  // receiver (freelancer)
  const freelancerId = freelancer?.userId;
  const freelancerName = freelancer.name;

  const navigate = useNavigate();

  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRoom = async () => {
    // 방 생성 + 구성원 집어넣음
    const { data, error } = await supabase.rpc("create_room2", {
      roomname: `${clientName}, ${freelancerName}`,
      user_id: clientId,
      receiver_id: freelancerId,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      const room_id = data.room_id;
      // ChatComp dependency array
      setCreatedRoomId(room_id);
      setSelectedRoom(data);
    }
  };

  const checkDuplicateRoomId = async () => {
    const { data } = await supabase
      .from("room_participants")
      .select("room_id")
      .match({ receiver_id: freelancerId })
      .single();
    console.log("67", data);
    return data ? data.room_id : null;
  };

  // 클릭 시 해당 프리랜서에게 DM 전송
  const sendDM = async () => {
    // 중복 방 여부 확인
    const result = await checkDuplicateRoomId();
    // console.log("75", result);

    if (result !== null) {
      console.log(
        "이미 생성된 방이 있습니다. 해당 채팅방으로 이동은 구현중입니다."
      );

      navigate("/chat");
      return;
    }

    // 중복 없을 경우 새로운 방 생성
    console.log("채팅 내역이 없습니다.");
    handleCreateRoom();
    navigate("/chat");
  };
  return (
    <>
      <S.UserInfoBox>
        <S.ProfileImgBox>
          <S.ProfileImg
            alt="profileImg"
            src={freelancer.photoURL}
          ></S.ProfileImg>
        </S.ProfileImgBox>
        <S.UserBox>
          <div>
            <S.UserName>{freelancer.name}</S.UserName>
            <S.Contacts onClick={() => sendDM()}>
              <HiOutlinePaperAirplane
                size={17}
                style={{ transform: "rotate(45deg)" }}
              />
            </S.Contacts>
          </div>
          <S.WorkField>{freelancer.workField?.workField}</S.WorkField>
          <S.WorkSmallFieldAndWorkExp>
            <span>{freelancer.workField?.workSmallField}</span>
            <span>{freelancer.workExp}년차</span>
          </S.WorkSmallFieldAndWorkExp>
          <S.ContactBox>
            {/* <S.Contacts
              onClick={() => handleCopyClipBoard(`${user.contact.phone}`)}
            > */}
          </S.ContactBox>
          <S.ContactBox>
            {/* <S.Contacts
              onClick={() => handleCopyClipBoard(`${user.contact.email}`)}
            ></S.Contacts> */}
          </S.ContactBox>
          {/* =============================================================== */}
        </S.UserBox>
      </S.UserInfoBox>
      <S.UnderLine />
    </>
  );
};

export default FreelancerProfile;
