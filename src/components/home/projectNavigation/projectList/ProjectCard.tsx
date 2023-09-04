import { useEffect, useState } from "react";
import { Project } from "src/Types";
import Modal from "src/components/modal/Modal";
import ApplyForProjectModal from "./applyForProjectModal/ApplyForProjectModal";
import { S } from "./projectList.styles";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import {
  calculateDaysAgo,
  getDayOfWeek,
} from "src/components/common/commonFunc";
import { queryClient } from "src/App";
import { FiUsers } from "react-icons/fi";
import ProjectDetailModal from "src/components/projectManagement/projectList/ProjectDetailModal";

interface ProjectCardProps {
  projectItem: Project;
  userId: string;
  clientName?: string;
}

const ProjectCard = ({ projectItem, userId }: ProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { client } = useClientsQueries({ userId: projectItem.clientId });
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  useEffect(() => {
    queryClient.invalidateQueries([client]);
  }, [projectItem]);

  const dayOfWeek = getDayOfWeek(new Date(projectItem.expectedStartDate));

  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const handleProjectApplyButtonClick = () => {
    const isConfirmed = window.confirm(
      `${projectItem.title}에 지원하시겠습니까?`
    );
    if (isConfirmed) {
      const updatedProject = {
        ...projectItem,
        volunteer: [...(projectItem.volunteer || []), userId],
      };

      try {
        updateProjectMutation.mutate({
          projectId: projectItem.projectId as string,
          newProject: updatedProject,
        });
        setIsDetailModalOpen(false);
      } catch (error) {
        console.error("프로젝트 지원 중 오류가 발생하였습니다.\n", error);
      }
    }
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              {projectItem.freelancerId ? (
                <S.Button type="primary" block disabled>
                  모집이 완료된 프로젝트입니다.
                </S.Button>
              ) : projectItem.volunteer?.includes(userId) ||
                projectItem.pendingFreelancer?.includes(userId) ? (
                <S.Button type="primary" block disabled>
                  이미 지원한 프로젝트입니다.
                </S.Button>
              ) : projectItem.SuggestedFreelancers!.includes(userId) ? (
                <S.Button type="primary" block disabled>
                  이미 제안 받은 프로젝트입니다.
                </S.Button>
              ) : (
                <S.Button
                  type="primary"
                  block
                  onClick={handleProjectApplyButtonClick}
                >
                  프로젝트 지원하기
                </S.Button>
              )}
            </>
          }
        >
          <ProjectDetailModal project={projectItem} />
        </Modal>
      )}
      <S.ProejctCardContainer>
        <S.ProejctContentLeftWrapper>
          <S.ProjectStatus
            recruitmentCompleted={projectItem.status === "진행 전"}
          >
            {projectItem.status === "진행 중" ||
            projectItem.status === "진행 완료"
              ? "모집 완료"
              : "모집 중"}
          </S.ProjectStatus>
          <S.ClientName>{client?.name}</S.ClientName>
          <div>
            <S.ProjectName>
              {projectItem.title} · {projectItem.category}
            </S.ProjectName>
            {projectItem.qualification > 0 ? (
              <span>{projectItem.qualification}년차 이상</span>
            ) : (
              <span>신입 가능</span>
            )}
          </div>
          <S.AppliedFreelancersCountBox>
            <FiUsers />
            <span>{projectItem.volunteer?.length}명 지원 중</span>
          </S.AppliedFreelancersCountBox>
        </S.ProejctContentLeftWrapper>

        <div>
          <S.ProejctContentRightWrapper>
            <S.DetailModalOpenButton onClick={() => setIsDetailModalOpen(true)}>
              자세히 보기
            </S.DetailModalOpenButton>

            <S.ProejctContentRightTextWrapper>
              <span>
                ~{projectItem.date?.endDate.slice(5, 7)}/
                {projectItem.date?.endDate.slice(8, 10)} ({dayOfWeek})
              </span>
              <S.ProjectRegistrationDate>
                {daysAgo} 등록
              </S.ProjectRegistrationDate>
            </S.ProejctContentRightTextWrapper>
          </S.ProejctContentRightWrapper>
        </div>
      </S.ProejctCardContainer>
    </>
  );
};

export default ProjectCard;
