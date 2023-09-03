import React from "react";
import { Project, User } from "../../../Types";
import { S } from "./freelancersByStatusInfoModalStyle";
import FreelancerProfile from "../../../components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "../../../components/modal/freelancerInfo/FreelancerResume";
import FreelancerPortfolio from "../../../components/modal/freelancerInfo/FreelancerPortfolio";

interface ApplicantFreelancerInfoModalProps {
  user: User;
  project: Project;
}

const ApplicantFreelancerInfoModal = ({ user, project }: ApplicantFreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>{user.name}님의 이력서와 포트폴리오</S.ModalTitle>
      <FreelancerProfile user={user} />
      <div>
        <FreelancerResume user={user} />
        <FreelancerPortfolio user={user} />
      </div>
    </>
  );
};

export default ApplicantFreelancerInfoModal;
