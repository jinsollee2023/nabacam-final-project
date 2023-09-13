import React from "react";
import { Project, User } from "../../../../../Types";
import FreelancerPortfolio from "../../../myProfile/freelancerInfoModal/FreelancerPortfolio";
import FreelancerResume from "../../../myProfile/freelancerInfoModal/FreelancerResume";
import { S } from "../freelancerInfoModalByStatus.style";
import dayjs from "dayjs";
import FreelancerProfile from "src/components/myPage/myProfile/freelancerInfoModal/FreelancerProfile";

interface OngoingFreelancerInfoModalProps {
  user: User;
  project: Project;
}

const OngoingFreelancerInfoModal = ({ user, project }: OngoingFreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>현재 진행 중인 {user.name}님의 프로필</S.ModalTitle>
      <FreelancerProfile user={user} />
      <S.ProjectTitleContents>진행중인 프로젝트</S.ProjectTitleContents>
      <S.ProjectWarp>
        <S.ProjectBox>
          <S.ProjectTitle>{project.title}</S.ProjectTitle>
          <S.ProjectDate>{dayjs(project.date?.startDate).format("YYMMDD")} ~</S.ProjectDate>
        </S.ProjectBox>
      </S.ProjectWarp>
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};

export default OngoingFreelancerInfoModal;
