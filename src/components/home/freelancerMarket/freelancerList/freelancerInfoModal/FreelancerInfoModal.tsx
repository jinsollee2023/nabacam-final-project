import { User } from "../../../../../Types";
import { S } from "../../../../../components/modal/freelancerInfo/freelancerInfoStyle";
import FreelancerPortfolio from "../../../../../components/modal/freelancerInfo/FreelancerPortfolio";
import FreelancerProfile from "../../../../../components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "../../../../../components/modal/freelancerInfo/FreelancerResume";

interface FreelancerInfoModalProps {
  user: User;
}

const FreelancerInfoModal = ({ user }: FreelancerInfoModalProps) => {
  return (
    <>
      <S.ModalTitle>{user.name}님의 이력서와 포트폴리오</S.ModalTitle>
      <FreelancerProfile user={user} />
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};
export default FreelancerInfoModal;
