import React from "react";
import { User } from "src/Types";
import { S } from "src/components/modal/freelancerInfo/freelancerInfoStyle";
import FreelancerPortfolio from "src/components/modal/freelancerInfo/FreelancerPortfolio";
import FreelancerProfile from "src/components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "src/components/modal/freelancerInfo/FreelancerResume";

interface FreelancerInfoModalProps {
  user: User;
}

const FreelancerInfoModal = ({ user }: FreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>{user.name}님의 이력서와 포트폴리오</S.ModalTitle>
      <FreelancerProfile user={user} />
      <hr />
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};
export default FreelancerInfoModal;
