import React from "react";
import { Project, User } from "src/Types";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import FreelancerPortfolio from "src/components/modal/freelancerInfo/FreelancerPortfolio";
import FreelancerResume from "src/components/modal/freelancerInfo/FreelancerResume";
import { S } from "../freelancerInfoModalByStatusStyle";
import dayjs from "dayjs";

interface OngoingFreelancerInfoModalProps {
  user: User;
  project: Project;
  modalTitle?: React.ReactNode;
}

const OngoingFreelancerInfoModal = ({
  user,
  project,
  modalTitle = "지금 현재 진행중인 프리랜서의 프로필입니다.",
}: OngoingFreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>{modalTitle}</S.ModalTitle>
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
            <S.Contacts>
              <BsTelephoneFill />
              <span>{user.contact.phone}</span>
            </S.Contacts>
            <S.Contacts>
              <MdEmail />
              <span>{user.contact.email}</span>
            </S.Contacts>
          </S.Contact>
        </S.Info>

        <S.ProjectInfo>
          <S.ContentTitle>진행중인 프로젝트</S.ContentTitle>
          <S.ProjectContents>
            <span>{project.title}</span>
            <span>
              {dayjs(project.date.startDate).format("YYMMDD")}{" "}
              <S.DateInnerText>부터</S.DateInnerText> {dayjs(project.date.endDate).format("YYMMDD")}
            </span>
          </S.ProjectContents>
        </S.ProjectInfo>
      </S.ProfileInfo>
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};

export default OngoingFreelancerInfoModal;
