import { User } from "../../../../Types";
import { S } from "../../../myPage/myProfile/freelancerInfoModal/freelancerInfo.style";
import FreelancerPortfolio from "../../../myPage/myProfile/freelancerInfoModal/FreelancerPortfolio";
import FreelancerProfile from "../../../myPage/myProfile/freelancerInfoModal/FreelancerProfile";
import FreelancerResume from "../../../myPage/myProfile/freelancerInfoModal/FreelancerResume";

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
