import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { S } from "./freelancerInfo.style";
import { IUser } from "../../../Types";
import { toast } from "react-toastify";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/store/useUserStore";
import useProjectOfFreelancerBySortQueries from "src/hooks/queries/useProjectOfFreelancerBySortQueries";

interface FreelancerProfileProps {
  user: IUser;
}

const FreelancerProfile = ({ user }: FreelancerProfileProps) => {
  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const { userId } = useUserStore();

  const { projectsListBySort } = useProjectOfFreelancerBySortQueries({
    currentUserId: userId,
  });

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  const projectItem = projectsListBySort
    ?.filter((projectItem) => {
      return projectItem.clientId === userId;
    })
    .filter((checkItem) => {
      return checkItem.freelancerId === user.userId;
    });
  const check = projectItem?.length;

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
            {check !== 0 && (
              <S.Contacts
                onClick={() => handleCopyClipBoard(`${user.contact.phone}`)}
              >
                <FiPhoneCall size={18} /> {user.contact.phone}
              </S.Contacts>
            )}
          </S.ContactBox>
          <S.ContactBox>
            {check !== 0 && (
              <S.Contacts
                onClick={() => handleCopyClipBoard(`${user.contact.email}`)}
              >
                <FiMail size={18} /> {user.contact.email}
              </S.Contacts>
            )}
          </S.ContactBox>
        </S.UserBox>
      </S.UserInfoBox>
      <S.UnderLine />
    </>
  );
};

export default FreelancerProfile;
