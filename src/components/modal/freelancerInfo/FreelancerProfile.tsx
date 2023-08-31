import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { S } from "./freelancerInfoStyle";
import { IUser } from "../../../Types";

interface FreelancerProfileProps {
  user: IUser;
}

const FreelancerProfile = ({ user }: FreelancerProfileProps) => {
  return (
    <S.UserInfoBox>
      <S.ProfileImgBox>
        <S.ProfileImg alt="profileImg" src={user.photoURL}></S.ProfileImg>
      </S.ProfileImgBox>
      <S.UserBox>
        <p style={{ display: "flex" }}>{user.name}</p>
        <div style={{ display: "flex", gap: "5px", color: "gray", fontSize: "13px" }}>
          <S.UserWorkField>{user.workField?.workField}</S.UserWorkField>
          <p>{user.workExp}년차</p>
        </div>
        <S.Contact>
          <S.Contacts>
            <FiPhoneCall color="black" /> {user.contact.phone}
          </S.Contacts>
          <S.Contacts>
            <FiMail color="black" /> {user.contact.email}
          </S.Contacts>
        </S.Contact>
      </S.UserBox>
    </S.UserInfoBox>
  );
};

export default FreelancerProfile;
