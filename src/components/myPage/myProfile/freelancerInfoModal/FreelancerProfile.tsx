import React from "react";
import { S } from "./freelancerInfo.style";
import { IUser } from "../../../../Types";
import { toast } from "react-toastify";
import { useUserStore } from "../../../../store/useUserStore";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import useProjectsQueries from "src/hooks/queries/useProjectsQueries";

interface FreelancerProfileProps {
  user: IUser;
}

const FreelancerProfile = ({ user: freelancer }: FreelancerProfileProps) => {
  const { userId } = useUserStore();
  const { allProjectList } = useProjectsQueries({ currentUserId: userId });

  const projectItem = allProjectList
    ?.filter((project) => project.clientId === userId)
    .find((item) => {
      return item.freelancerId === freelancer.userId;
    });

  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
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
          </div>
          <S.WorkField>{freelancer.workField?.workField}</S.WorkField>
          <S.WorkSmallFieldAndWorkExp>
            <span>{freelancer.workField?.workSmallField}</span>
            <span>{freelancer.workExp}년차</span>
          </S.WorkSmallFieldAndWorkExp>
          {projectItem && (
            <>
              <S.ContactBox>
                <S.Contacts
                  onClick={() =>
                    handleCopyClipBoard(`${freelancer.contact.phone}`)
                  }
                >
                  <FiPhoneCall size={13} style={{ marginRight: "5px" }} />{" "}
                  {freelancer.contact.phone}
                </S.Contacts>
              </S.ContactBox>
              <S.ContactBox>
                <S.Contacts
                  onClick={() =>
                    handleCopyClipBoard(`${freelancer.contact.email}`)
                  }
                >
                  <FiMail size={13} style={{ marginRight: "5px" }} />
                  {freelancer.contact.email}
                </S.Contacts>
              </S.ContactBox>
            </>
          )}
        </S.UserBox>
      </S.UserInfoBox>
      <S.UnderLine />
    </>
  );
};

export default FreelancerProfile;
