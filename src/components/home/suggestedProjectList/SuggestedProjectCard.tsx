import { useState } from "react";
import { Project } from "../../../Types";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { S } from "./suggestedProjectList.styles";
import Modal from "../../../components/modal/Modal";
import { Button } from "antd";
import {
  calculateDaysAgo,
  getDayOfWeek,
} from "../../../components/common/commonFunc";
import { FiUsers } from "react-icons/fi";
import ProjectDetailModal from "src/components/projectManagement/projectList/ProjectDetailModal";

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

  // 프리랜서가 제안받은 프로젝트를 수락하거나 거절할 시 해당 프로젝트를 업데이트 해주기 위해..
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  // 마감 날짜 구하기.. (이거는 진행 완료인 애들만 띄워주던가 없애던가 해야할듯 합니다요!)
  const dayOfWeek = getDayOfWeek(new Date(projectItem.expectedStartDate));

  // 프로젝트 등록일이 오늘로부터 몇 일 전인지..
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

        // 프로젝트 제안 거절시 현재 로그인한 프리랜서의 아이디를 해당 프로젝트의 제안한 프리랜서 배열에서 제거
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
    } else if (action === "accept") {
      const isAcceptConfirmed = window.confirm(
        `${projectItem.title}에 대한 제안을 수락하시겠습니까?`
      );
      if (isAcceptConfirmed) {
        // 프로젝트 제안 수락 시 현재 로그인한 프리랜서 아이디를 프로젝트의 freelancerId값으로 추가
        const updatedProject = {
          ...projectItem,
          freelancerId: userId,
          status: "진행 중",
          date: {
            ...projectItem.date,
            startDate: new Date().toISOString().split("T")[0],
            endDate: "",
          },
        };

        // 프로젝트 수락 후 바뀐 프로젝트 값(updatedProject)을 업데이트..
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
          <ProjectDetailModal project={projectItem} />
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
              ~{projectItem.expectedStartDate.slice(5, 7)}/
              {projectItem.expectedStartDate.slice(8, 10)} ({dayOfWeek})
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
