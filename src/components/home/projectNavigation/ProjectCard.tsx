import { useEffect, useState } from "react";
import { Project, User } from "src/Types";
import Modal from "src/components/modal/Modal";
import { S } from "./projectList.styles";
import useClientsQueries from "src/hooks/queries/useClientsQueries";
import useProjectsQueries from "src/hooks/queries/useProjectsQueries";
import { calculateDaysAgo, sendDM } from "src/components/common/commonFunc";
import { queryClient } from "src/App";
import { FiUsers } from "react-icons/fi";
import ProjectDetailModal from "src/components/projectManagement/projectList/ProjectDetailModal";
import { toast } from "react-toastify";
import { CommonS } from "src/components/common/button/commonButton";
import { useUserStore } from "src/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "src/store/useRoomStore";
import ProjectCardContents from "../ProjectCardContents";

interface ProjectCardProps {
  projectItem: Project;
  userId: string;
  clientName?: string;
}

const ProjectCard = ({ projectItem, userId }: ProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { client } = useClientsQueries({ userId: projectItem.clientId });
  const { user } = useUserStore();

  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  useEffect(() => {
    queryClient.invalidateQueries([client]);
  }, [projectItem]);

  const handleProjectApplyButtonClick = () => {
    const updatedProject = {
      ...projectItem,
      volunteer: [...(projectItem.volunteer || []), userId],
    };

    // 프리랜서가 프로젝트에 지원했을 경우 updatedProject 값을 반영해주기 위해 업데이트
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
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>{`${projectItem.title}에 지원하시겠습니까?`}</CommonS.toastintoText>
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
  const navigate = useNavigate();
  const { setSelectedRoom, setCreatedRoomId } = useRoomStore();

  const sendDMHandler = () => {
    sendDM({
      DMfreelancerName: user.name,
      DMclientName: client?.name as string,
      DMfreelancerId: user.userId,
      DMclientId: client?.userId as string,
      navigate,
      setCreatedRoomId,
      setSelectedRoom,
    });
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
                <>
                  <S.Button type="primary" block disabled>
                    이미 지원한 프로젝트입니다.
                  </S.Button>
                  <S.Button type="primary" block onClick={sendDMHandler}>
                    문의하기
                  </S.Button>
                </>
              ) : projectItem.SuggestedFreelancers!.includes(userId) ? (
                <>
                  <S.Button type="primary" block disabled>
                    이미 제안 받은 프로젝트입니다.
                  </S.Button>
                  <S.Button type="primary" block onClick={sendDMHandler}>
                    문의하기
                  </S.Button>
                </>
              ) : (
                <>
                  <S.Button type="primary" block onClick={showConfirmation}>
                    지원하기
                  </S.Button>
                  <S.Button type="primary" block onClick={sendDMHandler}>
                    문의하기
                  </S.Button>
                </>
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
      <ProjectCardContents
        projectItem={projectItem}
        client={client as User}
        setIsDetailModalOpen={setIsDetailModalOpen}
      />
    </>
  );
};

export default ProjectCard;
