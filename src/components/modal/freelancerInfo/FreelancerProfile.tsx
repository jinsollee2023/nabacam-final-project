import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { S } from "./freelancerInfo.style";
import { IUser } from "../../../Types";
import { toast } from "react-toastify";
import { CommonS } from "../../../components/common/button/commonButton";
import { useNavigate } from "react-router-dom";
import { TRoom } from "../../../components/chat/Room";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "../../../store/useUserStore";
import { useRoomStore } from "../../../store/useRoomStore";

interface FreelancerProfileProps {
  user: IUser;
}

const FreelancerProfile = ({ user: freelancer }: FreelancerProfileProps) => {
  const { user: client } = useUserStore();
  console.log(client);

  const {
    userId: clientId,
    name: clientName,
    photoURL: clientPhotoURL,
  } = client;

  const freelancerId = freelancer?.userId; // receiver
  const freelancerName = freelancer.name;
  const navigate = useNavigate();
  const { setSelectedRoom, setCreatedRoomId } = useRoomStore();

  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateRoom = async ({
    clientName,
    freelancerName,
  }: {
    clientName: string;
    freelancerName: string;
  }) => {
    console.log("parameter2", { clientName, freelancerName });
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
      console.log("yo", data);
      const room_id = data.room_id;
      setCreatedRoomId(room_id);
      setSelectedRoom(data);
    }
  };

  // 클릭 시 해당 프리랜서에게 DM 전송
  const sendDM = async ({
    clientName,
    freelancerName,
  }: {
    clientName: string;
    freelancerName: string;
  }) => {
    console.log("parameter", { clientName, freelancerName });
    // dm방 생성 -> sender, receiver 모두 자동으로 들어가도록 create_room2, is_room_participant2 설정함
    handleCreateRoom({ clientName, freelancerName });
    // 채팅방으로 이동
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
          <S.UserName>{freelancer.name}</S.UserName>
          <S.WorkField>{freelancer.workField?.workField}</S.WorkField>
          <S.WorkSmallFieldAndWorkExp>
            <span>{freelancer.workField?.workSmallField}</span>
            <span>{freelancer.workExp}년차</span>
          </S.WorkSmallFieldAndWorkExp>
          {/* =============================================================== */}
          <S.ContactBox>
            {/* <S.Contacts
              onClick={() => handleCopyClipBoard(`${user.contact.phone}`)}
            > */}
            <S.Contacts onClick={() => sendDM({ clientName, freelancerName })}>
              <HiOutlinePaperAirplane
                size={17}
                style={{ transform: "rotate(45deg)" }}
              />
              <CommonS.CenterizeBox style={{ paddingTop: "4px" }}>
                메세지 보내기
              </CommonS.CenterizeBox>
            </S.Contacts>
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
