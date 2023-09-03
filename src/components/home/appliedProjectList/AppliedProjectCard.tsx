import { Project } from "../../../Types";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { S } from "./appliedProjectList.styles";

interface AppliedProjectCardProps {
  projectItem: Project;
  userId: string;
}

const AppliedProjectCard = ({
  projectItem,
  userId,
}: AppliedProjectCardProps) => {
  const { client } = useClientsQueries({ userId: projectItem.clientId });
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  const handleCancelApplyButtonClick = () => {
    const isConfirmed = window.confirm(
      `${projectItem.title}에 대한 지원을 취소하시겠습니까?`
    );
    if (isConfirmed) {
      const updatedProject = {
        ...projectItem,
        volunteer: projectItem.volunteer?.filter((item) => item !== userId),
      };

      try {
        updateProjectMutation.mutate({
          projectId: projectItem.projectId as string,
          newProject: updatedProject,
        });
      } catch (error) {
        console.error("지원을 취소하던 중 오류가 발생하였습니다.\n", error);
      }
    }
  };

  return (
    <>
      <S.ProjectCardContainer>
        <S.ProejctContentLeftWrapper>
          <S.ProjectStatus
            recruitmentCompleted={projectItem.status === "진행 전"}
          >
            {projectItem.status === "진행 중" ||
            projectItem.status === "진행 완료"
              ? "모집 완료"
              : "모집 중"}
          </S.ProjectStatus>
          <S.ClientName>
            <span>{client?.name}</span>
          </S.ClientName>
          <S.ProjectName>
            <span>
              {projectItem.title} · {projectItem.category}
            </span>
          </S.ProjectName>
        </S.ProejctContentLeftWrapper>
        <S.ProejctContentRightWrapper>
          <div>
            {projectItem.volunteer?.includes(userId) ? (
              <>
                {projectItem.status === "진행 전" ? (
                  <S.AppliedCancleButton onClick={handleCancelApplyButtonClick}>
                    지원 취소
                  </S.AppliedCancleButton>
                ) : null}
                <span>지원</span>
              </>
            ) : (
              <>
                {projectItem.status === "진행 전" ? (
                  <S.AppliedCancleButton onClick={handleCancelApplyButtonClick}>
                    지원 취소
                  </S.AppliedCancleButton>
                ) : null}
                <span>보류</span>
              </>
            )}
          </div>
          <S.ProejctContentRightTextWrapper>
            <span>프로젝트 시작 예정일 </span>
            <span>{projectItem.expectedStartDate}</span>
          </S.ProejctContentRightTextWrapper>
        </S.ProejctContentRightWrapper>
      </S.ProjectCardContainer>
    </>
  );
};

export default AppliedProjectCard;
