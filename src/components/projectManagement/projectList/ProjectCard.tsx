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
    if (allValid) {
      updateProjectMutation.mutate({
        projectId: project.projectId as string,
        newProject,
      });
      setIsUpadateModalOpen(false);
    }
  }, [allValid]);

  const updateProjectButtonHandler = () => {
    checkValidation(values);
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
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              <S.ModalPostBtn onClick={updateProjectButtonHandler}>
                수정하기
              </S.ModalPostBtn>
              <S.ModalPostBtn onClick={deleteProjectButtonHandler}>
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
              <S.ModalPostBtn onClick={updateProjectButtonHandler}>
                수정하기
              </S.ModalPostBtn>
              <S.ModalPostBtn onClick={deleteProjectButtonHandler}>
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
            <S.SubmitBtn onClick={deleteProjectButtonHandler}>삭제</S.SubmitBtn>
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
