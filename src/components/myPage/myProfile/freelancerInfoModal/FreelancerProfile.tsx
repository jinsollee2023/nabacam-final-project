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
  const clientId = client.userId;

  // receiver (freelancer)
  const freelancerId = freelancer?.userId;

  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const checkDuplicateRoomId = async () => {
    // 수신자 f, 발신자 c id인 room_id 찾기
    const { data, error } = await supabase
      .from("room_participants")
      .select("room_id")
      .match({ receiver_id: freelancerId, user_id: clientId })
      .single();
    console.log("67", data);
    return data ? data.room_id : null;
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
