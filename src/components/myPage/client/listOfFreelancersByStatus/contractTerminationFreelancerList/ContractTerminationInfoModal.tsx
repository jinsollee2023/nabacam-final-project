import React from "react";
import { Project, User } from "src/Types";
import FreelancerProfile from "src/components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "src/components/modal/freelancerInfo/FreelancerResume";
import FreelancerPortfolio from "src/components/modal/freelancerInfo/FreelancerPortfolio";
import { S } from "../freelancerInfoModalByStatusStyle";
import dayjs from "dayjs";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useUserStore } from "src/zustand/useUserStore";

interface ContractTerminationInfoModalProps {
  user: User;
  project: Project;
}

const ContractTerminationInfoModal = ({ user, project }: ContractTerminationInfoModalProps) => {
  const { userId } = useUserStore();
  const { matchingCompletedProjectsData } = useProjectsQueries({
    currentUserId: userId,
    freelancerId: user.userId,
  });
  console.log("ddd", user);
  return (
    <>
      <S.ModalTitle>이전에 함께 작업했던 {user.name}님의 프로필이에요.</S.ModalTitle>
      <FreelancerProfile user={user} />
      <hr />
      <div>진행했던 프로젝트</div>
      <div>
        {matchingCompletedProjectsData?.map((project) => (
          <div key={project.projectId}>
            <span>{project.title}</span>
            <span>
              {dayjs(project.date.startDate).format("YYMMDD")}{" "}
              <S.DateInnerText>부터</S.DateInnerText> {dayjs(project.date.endDate).format("YYMMDD")}
            </span>
          </div>
        ))}
      </div>
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};

export default ContractTerminationInfoModal;
