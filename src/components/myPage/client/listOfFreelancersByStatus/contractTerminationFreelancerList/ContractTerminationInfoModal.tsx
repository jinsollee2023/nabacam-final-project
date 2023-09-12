import React from "react";
import { Project, User } from "../../../../../Types";
import FreelancerProfile from "../../../myProfile/freelancerInfoModal/FreelancerProfile";
import FreelancerResume from "../../../myProfile/freelancerInfoModal/FreelancerResume";
import FreelancerPortfolio from "../../../myProfile/freelancerInfoModal/FreelancerPortfolio";
import { S } from "../freelancerInfoModalByStatus.style";
import dayjs from "dayjs";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../../../store/useUserStore";
import useTerminationedProjectsWithFreelancerQueries from "src/hooks/queries/useTerminationedProjectsWithFreelancerQueries";
import useClientsQueries from "src/hooks/useClientsQueries";

interface ContractTerminationInfoModalProps {
  user: User;
  project: Project;
}

const ContractTerminationInfoModal = ({
  user,
  project,
}: ContractTerminationInfoModalProps) => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { matchingCompletedProjectsData } =
    useTerminationedProjectsWithFreelancerQueries({
      currentUserId: userId,
      freelancerId: user.userId,
    });

  return (
    <>
      <S.ModalTitle>
        이전에 함께 작업했던 {user.name}님의 프로필이에요.
      </S.ModalTitle>
      <FreelancerProfile user={user} />
      <S.ProjectTitleContents>진행했던 프로젝트</S.ProjectTitleContents>
      <S.ProjectWarp>
        {matchingCompletedProjectsData?.map((project) => (
          <S.ProjectBox key={project.projectId}>
            <S.ProjectTitle>{project.title}</S.ProjectTitle>
            <S.ProjectDate>
              {dayjs(project.date?.startDate).format("YYMMDD")}{" "}
              <S.DateInnerText>부터</S.DateInnerText>{" "}
              {dayjs(project.date?.endDate).format("YYMMDD")}
            </S.ProjectDate>
          </S.ProjectBox>
        ))}
      </S.ProjectWarp>
      <FreelancerResume user={user} />
      <FreelancerPortfolio user={user} />
    </>
  );
};

export default ContractTerminationInfoModal;
