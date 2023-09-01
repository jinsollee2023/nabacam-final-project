import { useState } from "react";
import { Project } from "../../../Types";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { S } from "./suggestedProjectList.styles";
import Modal from "../../../components/modal/Modal";
import { Button } from "antd";
import ApplyForProjectModal from "../projectNavigation/projectList/applyForProjectModal/ApplyForProjectModal";
import {
  calculateDaysAgo,
  getDayOfWeek,
} from "../../../components/common/commonFunc";
import { FiUsers } from "react-icons/fi";

interface SuggestedProjectCardProps {
  projectItem: Project;
  userId: string;
  userName: string;
}

const SuggestedProjectCard = ({
  projectItem,
  userId,
  userName,
}: SuggestedProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { client } = useClientsQueries({ userId: projectItem.clientId });
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  const dayOfWeek = getDayOfWeek(new Date(projectItem.date.endDate));

  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const handleButtonClick = (action: string) => {
    if (action === "reject") {
      const isRejectConfirmed = window.confirm(
        `${projectItem.title}에 대한 제안을 거절하시겠습니까?`
      );
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
      // setIsDetailModalOpen(false);
    } else if (action === "accept") {
      const isAcceptConfirmed = window.confirm(
        `${projectItem.title}에 대한 제안을 수락하시겠습니까?`
      );
      if (isAcceptConfirmed) {
        const updatedProject = {
          ...projectItem,
          freelancerId: userId,
          status: "진행 중",
          // volunteer: [],
          // pendingFreelancer: [],
          // SuggestedFreelancers: [],
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
      // setIsDetailModalOpen(false);
    }
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            projectItem.status === "진행 전" ? (
              <>
                <S.DeclineButton
                  type="primary"
                  block
                  onClick={() => handleButtonClick("reject")}
                >
                  거절하기
                </S.DeclineButton>
                <S.AcceptButton
                  type="primary"
                  block
                  onClick={() => handleButtonClick("accept")}
                >
                  수락하기
                </S.AcceptButton>
              </>
            ) : (
              <>
                {projectItem.freelancerId === userId ? (
                  <Button type="primary" block disabled>
                    {userName}님이 수락한 프로젝트입니다.
                  </Button>
                ) : (
                  <Button type="primary" block disabled>
                    모집 완료 된 프로젝트입니다.
                  </Button>
                )}
              </>
            )
          }
        >
          <ApplyForProjectModal
            projectItem={projectItem}
            clientName={client?.name!}
          />
        </Modal>
      )}

      <S.CardContainer>
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
        <S.ProejctContentRightWrapper>
          <S.DetailModalOpenButton onClick={() => setIsDetailModalOpen(true)}>
            자세히 보기
          </S.DetailModalOpenButton>

          <S.ProejctContentRightTextWrapper>
            <span>
              ~{projectItem.date.endDate.slice(5, 7)}/
              {projectItem.date.endDate.slice(8, 10)} ({dayOfWeek})
            </span>
            <S.ProjectRegistrationDate>
              {daysAgo} 등록
            </S.ProjectRegistrationDate>
          </S.ProejctContentRightTextWrapper>
        </S.ProejctContentRightWrapper>
      </S.CardContainer>
    </>
  );
};

export default SuggestedProjectCard;
