import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
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
        <div
          style={{
            display: "flex",
            gap: "5px",
            color: "gray",
            fontSize: "14px",
          }}
        >
          <p>
            <BsTelephoneFill color="black" /> {user.contact.phone}
          </p>
          <p style={{ marginLeft: "10px" }}>
            <MdEmail color="black" /> {user.contact.email}
          </p>
        </div>
      </S.UserBox>
    </S.UserInfoBox>
  );
};

export default FreelancerProfile;