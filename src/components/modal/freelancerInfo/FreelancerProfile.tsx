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
    <>
      <S.UserInfoBox>
        <S.ProfileImgBox>
          <S.ProfileImg alt="profileImg" src={user.photoURL}></S.ProfileImg>
        </S.ProfileImgBox>
        <S.UserBox>
          <S.UserName>{user.name}</S.UserName>
          <S.WorkField>{user.workField?.workField}</S.WorkField>
          <S.WorkSmallFieldAndWorkExp>
            <span>{user.workField?.workSmallField}</span>
            <span>{user.workExp}년차</span>
          </S.WorkSmallFieldAndWorkExp>
          <S.ContactBox>
            <FiPhoneCall size={18} />
            <S.Contacts>{user.contact.phone}</S.Contacts>
          </S.ContactBox>
          <S.ContactBox>
            <FiMail size={18} />
            <S.Contacts>{user.contact.email}</S.Contacts>
          </S.ContactBox>
        </S.UserBox>
      </S.UserInfoBox>
      <S.UnderLine />
    </>
  );
};

export default FreelancerProfile;
