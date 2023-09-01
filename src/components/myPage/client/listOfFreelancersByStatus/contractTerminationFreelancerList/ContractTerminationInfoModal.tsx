import React from "react";
import { Project, User } from "../../../../../Types";
import FreelancerProfile from "../../../../../components/modal/freelancerInfo/FreelancerProfile";
import FreelancerResume from "../../../../../components/modal/freelancerInfo/FreelancerResume";
import FreelancerPortfolio from "../../../../../components/modal/freelancerInfo/FreelancerPortfolio";
import { S } from "../freelancerInfoModalByStatusStyle";
import dayjs from "dayjs";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../../../zustand/useUserStore";

interface ContractTerminationInfoModalProps {
  user: User;
  project: Project;
}

const ContractTerminationInfoModal = ({
  user,
  project,
}: ContractTerminationInfoModalProps) => {
  const { userId } = useUserStore();
  const { matchingCompletedProjectsData } = useProjectsQueries({
    currentUserId: userId,
    freelancerId: user.userId,
  });

  return (
    <>
      <S.ModalTitle>
        이전에 함께 작업했던 {user.name}님의 프로필이에요.
      </S.ModalTitle>
      <FreelancerProfile user={user} />
      <div>진행했던 프로젝트</div>
      <div>
        {matchingCompletedProjectsData?.map((project) => (
          <div key={project.projectId}>
            <span>{project.title}</span>
            <span>
              {dayjs(project.date?.startDate).format("YYMMDD")}{" "}
              <S.DateInnerText>부터</S.DateInnerText>{" "}
              {dayjs(project.date?.endDate).format("YYMMDD")}
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
