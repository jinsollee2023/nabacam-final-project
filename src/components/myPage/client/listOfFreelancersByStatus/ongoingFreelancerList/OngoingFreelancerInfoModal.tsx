import React from "react";
import { Project, User } from "../../../../../Types";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import FreelancerPortfolio from "../../../myProfile/freelancerInfoModal/FreelancerPortfolio";
import FreelancerResume from "../../../myProfile/freelancerInfoModal/FreelancerResume";
import { S } from "../freelancerInfoModalByStatus.style";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface OngoingFreelancerInfoModalProps {
  user: User;
  project: Project;
}

const OngoingFreelancerInfoModal = ({
  user,
  project,
}: OngoingFreelancerInfoModalProps) => {
  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <S.ModalTitle>지금 현재 진행중인 프리랜서의 프로필입니다.</S.ModalTitle>
      <S.ProfileInfo>
        <S.ImgBox>
          <S.Img src={user.photoURL} alt="profileImg" />
        </S.ImgBox>

        <S.Info>
          <S.ContentTitle>{user.name}</S.ContentTitle>
          <S.WorkField>{user.workField?.workField}</S.WorkField>
          <S.WorkExp>
            {user.workField?.workSmallField} {user.workExp}년차
          </S.WorkExp>
          <S.Contact>
            <S.Contacts
              onClick={() => handleCopyClipBoard(`${user.contact.phone}`)}
            >
              <FiPhoneCall size={18} /> {user.contact.phone}
            </S.Contacts>
          </S.Contact>
          <S.Contact>
            <S.Contacts
              onClick={() => handleCopyClipBoard(`${user.contact.email}`)}
            >
              <FiMail size={18} /> {user.contact.email}
            </S.Contacts>
          </S.Contact>
        </S.Info>

        <S.ProjectInfo>
          <S.ContentTitle>진행중인 프로젝트</S.ContentTitle>
          <S.ProjectContents>
            <S.OngoingProjectTitle>{project.title}</S.OngoingProjectTitle>
            <S.OngoingProjectDate>
              {dayjs(project.date?.startDate).format("YYMMDD")}{" "}
              <S.DateInnerText>부터</S.DateInnerText>{" "}
              {dayjs(project.date?.endDate).format("YYMMDD")}
            </S.OngoingProjectDate>
          </S.ProjectContents>
        </S.ProjectInfo>
      </S.ProfileInfo>
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};

export default OngoingFreelancerInfoModal;
