import { useState } from "react";
import { Project } from "../../../Types";
import useClientsQueries from "../../../hooks/queries/useClientsQueries";
import useProjectsQueries from "../../../hooks/queries/useProjectsQueries";
import { S } from "./suggestedProjectList.styles";
import Modal from "../../../components/modal/Modal";
import { Button } from "antd";
import {
  calculateDaysAgo,
  getDayOfWeek,
} from "../../../components/common/commonFunc";
import { FiUsers } from "react-icons/fi";
import ProjectDetailModal from "src/components/projectManagement/projectList/ProjectDetailModal";
import { toast } from "react-toastify";
import { CommonS } from "src/components/common/button/commonButton";

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

  // 프로젝트 등록일이 오늘로부터 몇 일 전인지 확인
  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const handleButtonClick = (action: string) => {
    if (action === "reject") {
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
    } else if (action === "accept") {
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
  };

  const handleAcceptConfirm = () => {
    handleButtonClick("accept");
    setIsDetailModalOpen(false);
    toast.dismiss();
  };

  const handleAcceptCancel = () => {
    setIsDetailModalOpen(false);
    toast.dismiss();
  };

  const showAcceptConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>{`${projectItem.title}에 대한 제안을 수락하시겠습니까?`}</CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleAcceptConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleAcceptCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleRejectConfirm = () => {
    handleButtonClick("reject");
    toast.dismiss();
  };

  const handleRejectCancel = () => {
    toast.dismiss();
  };
  const showRejectConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>{`${projectItem.title}에 대한 제안을 거절하시겠습니까?`}</CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleRejectConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleRejectCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            projectItem.status === "진행 전" ? (
              <>
                <S.DeclineButton onClick={showRejectConfirmation}>
                  거절하기
                </S.DeclineButton>
                <S.AcceptButton onClick={showAcceptConfirmation}>
                  수락하기
                </S.AcceptButton>
                <S.AcceptButton>문의하기</S.AcceptButton>
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
          <ProjectDetailModal
            project={projectItem}
            companyName={client?.name}
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
          <S.ProjectRegistrationDate>{daysAgo} 등록</S.ProjectRegistrationDate>
        </S.ProejctContentLeftWrapper>
        <S.ProejctContentRightWrapper>
          <S.DetailModalOpenButton onClick={() => setIsDetailModalOpen(true)}>
            자세히 보기
          </S.DetailModalOpenButton>

          <S.ProejctContentRightTextWrapper>
            <span>프로젝트 시작 예정일 </span>
            <span>{projectItem.expectedStartDate}</span>
          </S.ProejctContentRightTextWrapper>
        </S.ProejctContentRightWrapper>
      </S.CardContainer>
    </>
  );
};

export default SuggestedProjectCard;
