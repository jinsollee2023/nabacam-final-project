import { toast } from "react-toastify";
import { Project, User } from "../../../Types";
import useClientsQueries from "../../../hooks/queries/useClientsQueries";
import useProjectsQueries from "../../../hooks/queries/useProjectsQueries";
import { S } from "./appliedProjectList.styles";
import Modal from "src/components/modal/Modal";
import ProjectDetailModal from "src/components/projectManagement/projectList/ProjectDetailModal";
import { useState } from "react";
import { sendDM } from "src/components/common/commonFunc";
import { CommonS } from "src/components/common/button/commonButton";
import { useUserStore } from "src/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "src/store/useRoomStore";
import ProjectCardContents from "../ProjectCardContents";

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
  const { user } = useUserStore();
  const { updateProjectMutation } = useProjectsQueries({
    currentUserId: userId,
  });

  const handleCancelApplyButtonClick = () => {
    const updatedProject = {
      ...projectItem,
      volunteer: projectItem.volunteer?.filter((item) => item !== userId),
      pendingFreelancer: projectItem.pendingFreelancer?.filter(
        (item) => item !== userId
      ),
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

  const navigate = useNavigate();
  const { setSelectedRoom, setCreatedRoomId } = useRoomStore();

  const sendDMHandler = () => {
    sendDM({
      DMfreelancerName: user.name,
      DMclientName: client?.name as string,
      DMfreelancerId: userId,
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
              ) : (
                <>
                  <S.Button type="primary" block onClick={showConfirmation}>
                    지원 취소하기
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

export default AppliedProjectCard;
