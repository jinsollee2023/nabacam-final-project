import { Project, User } from "../../../../../Types";
import FreelancerProfile from "../../../myProfile/freelancerInfoModal/FreelancerProfile";
import FreelancerResume from "../../../myProfile/freelancerInfoModal/FreelancerResume";
import FreelancerPortfolio from "../../../myProfile/freelancerInfoModal/FreelancerPortfolio";
import { S } from "../freelancerInfoModalByStatus.style";
import dayjs from "dayjs";
import { useUserStore } from "../../../../../store/useUserStore";
import useTerminationedProjectsWithFreelancerQueries from "src/hooks/queries/useTerminationedProjectsWithFreelancerQueries";

interface ContractTerminationInfoModalProps {
  user: User;
  project: Project;
}

const ContractTerminationInfoModal = ({
  user,
  project,
}: ContractTerminationInfoModalProps) => {
  const { userId } = useUserStore();
  const { matchingCompletedProjectsData } =
    useTerminationedProjectsWithFreelancerQueries({
      currentUserId: userId,
      freelancerId: user.userId,
    });

  return (
    <>
      <S.ModalTitle>함께 작업했던 {user.name}님의 프로필</S.ModalTitle>
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
