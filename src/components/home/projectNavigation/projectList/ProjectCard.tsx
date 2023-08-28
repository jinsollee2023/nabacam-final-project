import { Button } from "antd";
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

interface ProjectCardProps {
  projectItem: Project;
  userId: string;
  clientName?: string;
}

const ProjectCard = ({ projectItem, userId }: ProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { client } = useClientsQueries(projectItem.clientId);
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  useEffect(() => {
    queryClient.invalidateQueries([client]);
  }, [projectItem]);

  const dayOfWeek = getDayOfWeek(new Date(projectItem.date.endDate));

  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const handleProjectApplyButtonClick = () => {
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
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              {projectItem.volunteer?.includes(userId) ||
              projectItem.pendingFreelancer?.includes(userId) ? (
                <Button type="primary" block disabled>
                  이미 지원한 프로젝트입니다.
                </Button>
              ) : projectItem.SuggestedFreelancers!.includes(userId) ? (
                <Button type="primary" block disabled>
                  이미 제안 받은 프로젝트입니다.
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  onClick={handleProjectApplyButtonClick}
                >
                  프로젝트 지원하기
                </Button>
              )}
            </>
          }
        >
          <ApplyForProjectModal
            projectItem={projectItem}
            clientName={client?.name!}
          />
        </Modal>
      )}
      <S.ProejctCardContainer>
        <div id="clientName">{client?.name}</div>
        <div>
          <span>
            {projectItem.title} · {projectItem.category}
          </span>
          {projectItem.qualification > 0 ? (
            <span>{projectItem.qualification}년차 이상</span>
          ) : (
            <span>신입 가능</span>
          )}
        </div>
        <div id="buttonAndDeadLineAndCreatAt">
          <button onClick={() => setIsDetailModalOpen(true)}>
            자세히 보기
          </button>
          <span>{projectItem.volunteer?.length}명 지원 중</span>
          <div>
            <span>
              ~{projectItem.date.endDate.slice(5, 7)}/
              {projectItem.date.endDate.slice(8, 10)} ({dayOfWeek})
            </span>
            <span>{daysAgo} 등록</span>
          </div>
        </div>
      </S.ProejctCardContainer>
    </>
  );
};

export default ProjectCard;
