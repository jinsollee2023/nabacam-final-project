import { Project } from "../../../Types";
import S from "./ProjectList.styles";
import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import ProjectDetailModal from "./ProjectDetailModal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "../../../store/useProjectStore";
import useProjectsQueries from "../../../hooks/queries/useProjectsQueries";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";
import { Errors } from ".";
import { CommonS } from "src/components/common/button/commonButton";

interface projectCardProps {
  project: Project;
  errors: Errors;
  setErrors: (errors: Errors) => void;
}

const ProjectCard = ({ project, errors, setErrors }: projectCardProps) => {
  const { deleteProjectMutation, updateProjectMutation } = useProjectsQueries({
    currentUserId: project.clientId,
  });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpadateModalOpen, setIsUpadateModalOpen] = useState(false);
  const { newProject } = useProjectStore();
  const { values, changeValues } = useProjectStore();
  const [updateSubmitButtonClicked, setUpdateSubmitButtonClicked] =
    useState(false);
  const {
    validateDate,
    validateSelect,
    validatePay,
    validateWorkExp,
    validateInput,
  } = useValidation();

  const deleteProjectButtonHandler = () => {
    deleteProjectMutation.mutate(project.projectId!);
    toast.success("프로젝트가 삭제되었습니다.");
  };

  const validateUpdateProject = () => {
    const titleError = validateInput("프로젝트 제목", newProject.title);
    const descError = validateInput("프로젝트 설명", newProject.desc);
    const categoryError = validateSelect(
      "프로젝트 분야",
      values.category as string
    );
    const qualificationError = validateWorkExp(
      String(newProject.qualification)
    );
    const expectedStartDateError = validateDate(
      "시작예정일",
      newProject.expectedStartDate
    );
    const managerError = validateSelect("담당자", newProject.manager.name);
    const payError = validatePay(newProject.pay.min, newProject.pay.max);
    setErrors({
      title: titleError,
      desc: descError,
      category: categoryError,
      qualification: qualificationError,
      expectedStartDate: expectedStartDateError,
      manager: managerError,
      pay: payError,
    });
  };

  const projectAllValid =
    errors.title === "" &&
    errors.desc === "" &&
    errors.category === "" &&
    errors.qualification === "" &&
    errors.expectedStartDate === "" &&
    errors.manager === "" &&
    errors.pay === "";

  useEffect(() => {
    if (projectAllValid && updateSubmitButtonClicked) {
      updateProjectMutation.mutate({
        projectId: project.projectId as string,
        newProject,
      });
      setIsUpadateModalOpen(false);
      toast.success("프로젝트가 수정되었습니다.");
      setUpdateSubmitButtonClicked(false);
    } else setUpdateSubmitButtonClicked(false);
  }, [errors, updateSubmitButtonClicked]);

  const updateProjectButtonHandler = () => {
    validateUpdateProject();
    setUpdateSubmitButtonClicked(true);
  };
  const updateProjectModalOpenHandler = () => {
    setIsUpadateModalOpen(true);
    changeValues({
      title: project.title,
      desc: project.desc,
      category: project.category,
      qualification: project.qualification,
      expectedStartDate: project.expectedStartDate,
      manager: {
        name: project.manager.name,
        team: project.manager.team,
        contact: {
          email: project.manager.contact.email,
          phone: project.manager.contact.phone,
        },
      },
      minPay: project.pay.min,
      maxPay: project.pay.max,
    });
    setErrors({
      title: null,
      desc: null,
      category: null,
      qualification: null,
      expectedStartDate: null,
      manager: null,
      pay: null,
    });
  };

  const handleDeleteConfirm = () => {
    deleteProjectButtonHandler();
  };

  const handleDeleteCancel = () => {
    toast.dismiss();
  };

  const showDeleteConfirmation = () => {
    const isToastVisible = toast.isActive("deleteConfirmation");
    if (!isToastVisible) {
      toast.info(
        <CommonS.toastinfo>
          <CommonS.toastintoText>
            프로젝트를 삭제하시겠습니까?
          </CommonS.toastintoText>
          <CommonS.toastOkButton onClick={handleDeleteConfirm}>
            확인
          </CommonS.toastOkButton>
          <CommonS.toastNoButton onClick={handleDeleteCancel}>
            취소
          </CommonS.toastNoButton>
        </CommonS.toastinfo>,
        {
          toastId: "deleteConfirmation", // 고유한 ID 부여
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          closeButton: false,
          draggable: false,
        }
      );
    }
  };

  const availableClose =
    project.title === values.title &&
    project.desc === values.desc &&
    project.category === values.category &&
    project.pay.min === values.minPay &&
    project.pay.max === values.maxPay &&
    project.expectedStartDate === values.expectedStartDate &&
    project.manager.name === values.manager.name &&
    project.qualification === values.qualification;

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            project.status === "진행 전" && (
              <>
                <S.ModalPostButton onClick={showDeleteConfirmation}>
                  삭제하기
                </S.ModalPostButton>
                <S.ModalPostButton onClick={updateProjectModalOpenHandler}>
                  수정하기
                </S.ModalPostButton>
              </>
            )
          }
        >
          <ProjectDetailModal project={project} />
        </Modal>
      )}
      {isUpadateModalOpen && (
        <Modal
          setIsModalOpen={setIsUpadateModalOpen}
          availableClose={availableClose}
          buttons={
            <>
              <S.ModalDeleteButton onClick={showDeleteConfirmation}>
                삭제하기
              </S.ModalDeleteButton>
              <S.ModalPostButton onClick={updateProjectButtonHandler}>
                수정하기
              </S.ModalPostButton>
            </>
          }
        >
          <AddProjectModal errors={errors} setErrors={setErrors} />
        </Modal>
      )}
      <S.ProjectCardBox justifyContent="space-between" marginBottom={20}>
        <S.ProjcetTitleBox onClick={() => setIsDetailModalOpen(true)}>
          {project.title}
        </S.ProjcetTitleBox>
        <S.ProfileCardRightContentWrapper>
          {project.status === "진행 전" && (
            <>
              <S.ProjectCardButtonBox>
                <S.SubmitButton
                  style={{ marginRight: "5px" }}
                  onClick={updateProjectModalOpenHandler}
                >
                  수정
                </S.SubmitButton>
                <S.SubmitButton onClick={showDeleteConfirmation}>
                  삭제
                </S.SubmitButton>
              </S.ProjectCardButtonBox>
            </>
          )}
          <S.MemberTeamAndName>
            {project.manager.team}팀&nbsp;{project.manager.name}
          </S.MemberTeamAndName>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p
              style={{
                color: "var(--middle-gray)",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              {project.expectedStartDate} 시작 예정
            </p>
          </div>
        </S.ProfileCardRightContentWrapper>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectCard;
