import { Project, User } from "src/Types";
import FreelancerProfile from "src/components/modal/freelancerInfo/FreelancerProfile";

import { S } from "./oneTouchModal.styles";
import { useState } from "react";
import { useSelectProjectStore } from "src/zustand/useSelectProjectStore";

interface ApplicantResumeModalProps {
  user: User;
  projectLists: Project[];
}

const OneTouchModal = ({ user, projectLists }: ApplicantResumeModalProps) => {
  const [selectedProjectItem, setSelectedProjectItem] =
    useState<Project | null>();
  const { setSelectedProjectId } = useSelectProjectStore();
  const { setSelectedProjectTitle } = useSelectProjectStore();

  const handleProjectItemClick = (project: Project) => {
    if (selectedProjectItem === project) {
      setSelectedProjectTitle(null);
      setSelectedProjectId(null);
      setSelectedProjectItem(null);
    } else {
      setSelectedProjectTitle(project.title);
      setSelectedProjectId(project.projectId!);
      setSelectedProjectItem(project);
    }
  };

  return (
    <S.ModalContainer>
      <S.ModalTitle>
        {user.name}님에게
        <br />
        어떤 프로젝트를 제안하시겠어요?
      </S.ModalTitle>
      <FreelancerProfile user={user} />

      <S.ProjectListWrapper>
        {projectLists && projectLists.length > 0 ? (
          projectLists?.map((projectItem) => {
            return (
              <S.ProjectItem
                key={projectItem.projectId}
                onClick={() => handleProjectItemClick(projectItem)}
                isSelected={selectedProjectItem === projectItem}
              >
                <S.ProjectItemTitle>{projectItem.title}</S.ProjectItemTitle>
                <S.ProjectItemDeadLine>
                  목표 기간 : {String(projectItem.deadLine)}
                </S.ProjectItemDeadLine>
              </S.ProjectItem>
            );
          })
        ) : (
          <div>제안 할 수 있는 프로젝트가 없습니다.</div>
        )}
      </S.ProjectListWrapper>
    </S.ModalContainer>
  );
};

export default OneTouchModal;
