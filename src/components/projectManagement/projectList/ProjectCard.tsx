import { Project } from "../../../Types";
import S from "./ProjectListStyles";
import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import ProjectDetailModal from "./ProjectDetailModal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "../../../zustand/useProjectStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import React from "react";
import { useProjectValuesStore } from "src/zustand/useProjectValuesStore";
import useProjectValid from "src/hooks/useProjectValid";
import { toast } from "react-toastify";

interface projectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: projectCardProps) => {
  const { deleteProjectMutation, updateProjectMutation } = useProjectsQueries({
    currentUserId: project.clientId,
  });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpadateModalOpen, setIsUpadateModalOpen] = useState(false);
  const { newProject } = useProjectStore();
  const { values, changeValues } = useProjectValuesStore();
  const [updateSubmitButtonClicked, setUpdateSubmitButtonClicked] =
    useState(false);
  const {
    checkValidation,
    isTitleValid,
    isDescValid,
    isCategoryValid,
    isQualificationValid,
    isExpectedStartDateValid,
    isManagerValid,
    isMaxPayValid,
    allValid,
  } = useProjectValid();

  const deleteProjectButtonHandler = () => {
    deleteProjectMutation.mutate(project.projectId!);
  };

  useEffect(() => {
    if (allValid && updateSubmitButtonClicked) {
      updateProjectMutation.mutate({
        projectId: project.projectId as string,
        newProject,
      });
      setUpdateSubmitButtonClicked(false);
      setIsUpadateModalOpen(false);
    } else if (!allValid) {
      setUpdateSubmitButtonClicked(false);
    }
  }, [allValid, updateSubmitButtonClicked]);

  const updateProjectButtonHandler = () => {
    checkValidation(values);

    allValid && setUpdateSubmitButtonClicked(true);
  };

  const updateProjectModalOpenHandler = () => {
    setIsUpadateModalOpen(true);
    setUpdateSubmitButtonClicked(false);
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
  };

  const handleDeleteConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.
    deleteProjectButtonHandler();
    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleDeleteCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showDeleteConfirmation = () => {
    toast.info(
      <div>
        <p>프로젝트를 삭제하시겠습니까?</p>
        <button onClick={handleDeleteConfirm}>확인</button>
        <button onClick={handleDeleteCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };
  const handleUpdateConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.
    updateProjectButtonHandler();
    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleUpdateCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showUpdateConfirmation = () => {
    toast.info(
      <div>
        <p>프로젝트를 수정하시겠습니까?</p>
        <button onClick={handleUpdateConfirm}>확인</button>
        <button onClick={handleUpdateCancel}>취소</button>
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
      {/* FIX */}
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              <S.ModalPostBtn onClick={updateProjectModalOpenHandler}>
                수정하기
              </S.ModalPostBtn>
              <S.ModalPostBtn onClick={showDeleteConfirmation}>
                삭제하기
              </S.ModalPostBtn>
            </>
          }
        >
          <ProjectDetailModal project={project} />
        </Modal>
      )}
      {isUpadateModalOpen && (
        <Modal
          setIsModalOpen={setIsUpadateModalOpen}
          buttons={
            <>
              <S.ModalPostBtn onClick={showUpdateConfirmation}>
                수정하기
              </S.ModalPostBtn>
              <S.ModalPostBtn onClick={showDeleteConfirmation}>
                삭제하기
              </S.ModalPostBtn>
            </>
          }
        >
          <AddProjectModal
            isTitleValid={isTitleValid}
            isDescValid={isDescValid}
            isCategoryValid={isCategoryValid}
            isQualificationValid={isQualificationValid}
            isDeadLineValid={isExpectedStartDateValid}
            isManagerValid={isManagerValid}
            isMaxPayValid={isMaxPayValid}
          />
        </Modal>
      )}
      {/* ---------------------------------------------------------------- */}
      <S.ProjectCardBox justifyContent="space-between" marginBottom={20}>
        <S.ProjcetTitleBox onClick={() => setIsDetailModalOpen(true)}>
          {project.title}
        </S.ProjcetTitleBox>
        <div>
          <S.ProjectCardButtonBox>
            <S.SubmitBtn
              style={{ marginRight: "5px" }}
              onClick={updateProjectModalOpenHandler}
            >
              수정
            </S.SubmitBtn>
            <S.SubmitBtn onClick={showDeleteConfirmation}>삭제</S.SubmitBtn>
          </S.ProjectCardButtonBox>
          <div>
            <p>
              {project.manager.team}팀&nbsp;{project.manager.name}
            </p>
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
          </div>
        </div>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectCard;
