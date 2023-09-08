import { toast } from "react-toastify";
import { Project } from "../../../Types";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { S } from "./appliedProjectList.styles";

interface AppliedProjectCardProps {
  projectItem: Project;
  userId: string;
}

const AppliedProjectCard = ({
  projectItem,
  userId,
}: AppliedProjectCardProps) => {
  // 프로젝트의 클라이언트 아이디 값을 보내서 클라이언트 name을 사용하기 위해 client를 불러온다.
  const { client } = useClientsQueries({ userId: projectItem.clientId });

  // 아래서 적어놓은 것과 같이.. 지원 취소 시 업데이트를 위해 미리 불러온다..
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
        <p>{`${projectItem.title}에 대한 지원을 취소하시겠습니까?`}</p>
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
          <S.ProjectName>
            <span>
              {projectItem.title} · {projectItem.category}
            </span>
          </S.ProjectName>
        </S.ProejctContentLeftWrapper>
        <S.ProejctContentRightWrapper>
          <div>
            {projectItem.volunteer?.includes(userId) ? (
              <>
                {projectItem.status === "진행 전" ? (
                  <S.AppliedCancleButton onClick={showConfirmation}>
                    지원 취소
                  </S.AppliedCancleButton>
                ) : null}
                <span>지원</span>
              </>
            ) : (
              <>
                {projectItem.status === "진행 전" ? (
                  <S.AppliedCancleButton onClick={showConfirmation}>
                    지원 취소
                  </S.AppliedCancleButton>
                ) : null}
                <span>보류</span>
              </>
            )}
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
