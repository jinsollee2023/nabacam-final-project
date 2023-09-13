import React from "react";
import { Project, User } from "../../../../../Types";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import FreelancerPortfolio from "../../../myProfile/freelancerInfoModal/FreelancerPortfolio";
import FreelancerResume from "../../../myProfile/freelancerInfoModal/FreelancerResume";
import { S } from "../freelancerInfoModalByStatus.style";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import FreelancerProfile from "src/components/myPage/myProfile/freelancerInfoModal/FreelancerProfile";

interface OngoingFreelancerInfoModalProps {
  user: User;
  project: Project;
}

const OngoingFreelancerInfoModal = ({ user, project }: OngoingFreelancerInfoModalProps) => {
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
