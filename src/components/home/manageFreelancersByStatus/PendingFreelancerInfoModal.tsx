import React from "react";
import { Project, User } from "../../../Types";
import { S } from "./freelancersByStatusInfoModal.styles";
import FreelancerProfile from "../../myPage/myProfile/freelancerInfoModal/FreelancerProfile";
import FreelancerResume from "../../myPage/myProfile/freelancerInfoModal/FreelancerResume";
import FreelancerPortfolio from "../../myPage/myProfile/freelancerInfoModal/FreelancerPortfolio";

interface PendingFreelancerInfoModalProps {
  user: User;
  project: Project;
}

const PendingFreelancerInfoModal = ({
  user,
  project,
}: PendingFreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>{user.name}님의 이력서와 포르폴리오</S.ModalTitle>
      <FreelancerProfile user={user} />
      <div>
        <FreelancerResume user={user} />
        <FreelancerPortfolio user={user} />
      </div>
    </>
  );
};

export default PendingFreelancerInfoModal;
