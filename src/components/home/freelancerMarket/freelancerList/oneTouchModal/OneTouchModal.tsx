import { Project, User } from "src/Types";
import FreelancerProfile from "src/components/modal/freelancerInfo/FreelancerProfile";
import { S } from "./oneTouchModal.styles";
import { useProjectStore } from "src/zustand/useProjectStore";

interface OneTouchModalProps {
  user: User;
  projectLists: Project[];
}

const OneTouchModal = ({ user, projectLists }: OneTouchModalProps) => {
  const { selectedProject, setSelectedProject } = useProjectStore();

  const handleProjectItemClick = (project: Project) => {
    if (selectedProject === project) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
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
                isselected={selectedProject === projectItem}
              >
                <S.ProjectItemTitle>{projectItem.title}</S.ProjectItemTitle>
                <S.ProjectItemDeadLine>
                  목표 기간 : {String(projectItem.date.endDate)}
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
