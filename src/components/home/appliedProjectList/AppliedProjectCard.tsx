import React from "react";
import { Project } from "src/Types";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";
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
    const isConfirmed = window.confirm("지원을 취소하시겠습니까?");
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
      <S.CardContainer>
        <div>
          <span>{client?.name}</span>
        </div>
        <div>
          <span>
            {projectItem.title} · {projectItem.category}
          </span>
        </div>
        <div>
          <span>프로젝트 마감 날짜</span>
          <span>{projectItem.date.endDate}</span>
        </div>
        <div>
          {projectItem.volunteer?.includes(userId) ? (
            <>
              <span>지원</span>
              <button onClick={handleCancelApplyButtonClick}>
                지원 취소하기
              </button>
            </>
          ) : (
            <span>보류</span>
          )}
        </div>
      </S.CardContainer>
    </>
  );
};

export default AppliedProjectCard;
