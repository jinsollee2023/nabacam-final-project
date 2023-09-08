import { useEffect, useState } from "react";
import { Project } from "src/Types";
import Modal from "src/components/modal/Modal";
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
import { toast } from "react-toastify";

interface ProjectCardProps {
  projectItem: Project;
  userId: string;
  clientName?: string;
}

const ProjectCard = ({ projectItem, userId }: ProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 해당 프로젝트의 clientId를 통해 client name를 가져왔다
  const { client } = useClientsQueries({ userId: projectItem.clientId });

  // 프리랜서가 프로젝트에 지원했을 경우 해당 프로젝트에 업데이트하기 위해..
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  useEffect(() => {
    queryClient.invalidateQueries([client]);
  }, [projectItem]);

  // 마감 날짜 구하기.. (이거는 진행 완료인 애들만 띄워주던가 없애던가 해야할듯 합니다요!)
  const dayOfWeek = getDayOfWeek(new Date(projectItem.expectedStartDate));

  // 프로젝트 등록일이 오늘로부터 몇 일 전인지..
  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const handleProjectApplyButtonClick = () => {
    const updatedProject = {
      ...projectItem,
      volunteer: [...(projectItem.volunteer || []), userId],
    };

    // 프리랜서가 프로젝트에 지원했을 경우 updatedProject 값을 반영해주기 위해 업데이트..
    try {
      updateProjectMutation.mutate({
        projectId: projectItem.projectId as string,
        newProject: updatedProject,
      });
      setIsDetailModalOpen(false);
    } catch (error) {
      toast.error("프로젝트 지원 중 오류가 발생하였습니다.");
    }
  };

  const handleConfirm = () => {
    handleProjectApplyButtonClick();
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.

    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <div>
        <p>{`${projectItem.title}에 지원하시겠습니까?`}</p>
        <button onClick={handleConfirm}>확인</button>
        <button onClick={handleCancel}>취소</button>
      </div>,
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
                <S.Button type="primary" block onClick={showConfirmation}>
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
