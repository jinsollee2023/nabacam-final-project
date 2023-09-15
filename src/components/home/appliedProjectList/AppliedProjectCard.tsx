import { toast } from "react-toastify";
import { Project } from "../../../Types";
import useClientsQueries from "../../../hooks/queries/useClientsQueries";
import useProjectsQueries from "../../../hooks/queries/useProjectsQueries";
import { S } from "./appliedProjectList.styles";
import Modal from "src/components/modal/Modal";
import ProjectDetailModal from "src/components/projectManagement/projectList/ProjectDetailModal";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { calculateDaysAgo } from "src/components/common/commonFunc";
import { CommonS } from "src/components/common/button/commonButton";

interface AppliedProjectCardProps {
  projectItem: Project;
  userId: string;
}

const AppliedProjectCard = ({
  projectItem,
  userId,
}: AppliedProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { client } = useClientsQueries({ userId: projectItem.clientId });
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  const handleCancelApplyButtonClick = () => {
    const updatedProject = {
      ...projectItem,
      volunteer: projectItem.volunteer?.filter((item) => item !== userId),
    };

    // 프리랜서가 지원을 취소하면 해당 프리랜서를 제외한 프로젝트 정보를 업데이트 해준다.
    try {
      updateProjectMutation.mutate({
        projectId: projectItem.projectId as string,
        newProject: updatedProject,
      });
    } catch (error) {
      toast.error("지원을 취소하던 중 오류가 발생하였습니다.");
    }
  };

  const handleConfirm = () => {
    handleCancelApplyButtonClick();
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>{`${projectItem.title}에 대한 지원을 취소하시겠습니까?`}</CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleCancel}>
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

  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

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
              ) : (
                <S.Button type="primary" block onClick={showConfirmation}>
                  프로젝트 지원 취소하기
                </S.Button>
              )}
            </>
          }
        >
          <ProjectDetailModal
            project={projectItem}
            companyName={client?.name}
          />
        </Modal>
      )}
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
          <div>
            <S.ProjectName>
              <span>
                {projectItem.title} · {projectItem.category}
              </span>
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
          <div>
            <>
              <S.DetailModalOpenButton
                onClick={() => setIsDetailModalOpen(true)}
              >
                자세히 보기
              </S.DetailModalOpenButton>
            </>
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
