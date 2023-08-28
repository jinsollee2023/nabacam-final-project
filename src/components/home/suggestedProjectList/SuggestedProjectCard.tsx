import { useState } from "react";
import { Project } from "src/Types";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { S } from "./suggestedProjectList.styles";
import Modal from "src/components/modal/Modal";
import { Button } from "antd";
import ApplyForProjectModal from "../projectNavigation/projectList/applyForProjectModal/ApplyForProjectModal";
import {
  calculateDaysAgo,
  getDayOfWeek,
} from "src/components/common/commonFunc";

interface SuggestedProjectCardProps {
  projectItem: Project;
  userId: string;
}

const SuggestedProjectCard = ({
  projectItem,
  userId,
}: SuggestedProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { client } = useClientsQueries(projectItem.clientId);
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  const dayOfWeek = getDayOfWeek(new Date(projectItem.date.endDate));

  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const handleButtonClick = (action: string) => {
    if (action === "reject") {
      const isRejectConfirmed = window.confirm("제안을 거절하시겠습니까?");
      if (isRejectConfirmed) {
        const updatedProject = {
          ...projectItem,
          SuggestedFreelancers: projectItem.SuggestedFreelancers?.filter(
            (item) => item !== userId
          ),
        };

        try {
          updateProjectMutation.mutate({
            projectId: projectItem.projectId as string,
            newProject: updatedProject,
          });
        } catch (error) {
          console.error(
            "거절에 대한 처리를 진행하던 중 오류가 발생하였습니다.\n",
            error
          );
        }
      }
      setIsDetailModalOpen(false);
    } else if (action === "accept") {
      const isAcceptConfirmed = window.confirm("제안을 수락하시겠습니까?");
      if (isAcceptConfirmed) {
        const updatedProject = {
          ...projectItem,
          freelancerId: userId,
          status: "진행 중",
          volunteer: [],
          pendingFreelancer: [],
          SuggestedFreelancers: [],
          date: {
            ...projectItem.date,
            startDate: new Date().toISOString().split("T")[0],
          },
        };

        try {
          updateProjectMutation.mutate({
            projectId: projectItem.projectId as string,
            newProject: updatedProject,
          });
        } catch (error) {
          console.error(
            "수락에 대한 처리를 진행하던 중 오류가 발생하였습니다.\n",
            error
          );
        }
      }
      setIsDetailModalOpen(false);
    }
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              <Button
                type="primary"
                block
                onClick={() => handleButtonClick("reject")}
              >
                거절하기
              </Button>
              <Button
                type="primary"
                block
                onClick={() => handleButtonClick("accept")}
              >
                수락하기
              </Button>
            </>
          }
        >
          <ApplyForProjectModal
            projectItem={projectItem}
            clientName={client?.name!}
          />
        </Modal>
      )}

      <S.CardContainer>
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
      </S.CardContainer>
    </>
  );
};

export default SuggestedProjectCard;
