import { Project } from "../../../Types";
import S from "./ProjectListStyles";
import { useState } from "react";
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
  } = useProjectValid();

  const isAllValid =
    isTitleValid &&
    isDescValid &&
    isDescValid &&
    isCategoryValid &&
    isQualificationValid &&
    isExpectedStartDateValid &&
    isManagerValid &&
    isMaxPayValid;

  const deleteProjectButtonHandler = () => {
    deleteProjectMutation.mutate(project.projectId!);
  };

  const updateProjectButtonHandler = () => {
    checkValidation(values);
    if (isAllValid) {
      updateProjectMutation.mutate({
        projectId: project.projectId as string,
        newProject,
      });
      setIsUpadateModalOpen(false);
    }
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

  console.log(project);

  return (
    <>
      {isDetailModalOpen && (
        <Modal setIsModalOpen={setIsDetailModalOpen}>
          <ProjectDetailModal project={project} />
        </Modal>
      )}
      {isUpadateModalOpen && (
        <Modal
          setIsModalOpen={setIsUpadateModalOpen}
          buttons={
            <>
              <button onClick={updateProjectButtonHandler}>
                프로젝트 수정하기
              </button>
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
            <span onClick={updateProjectModalOpenHandler}>수정</span>
            <span onClick={deleteProjectButtonHandler}>삭제</span>
          </S.ProjectCardButtonBox>
          <div>
            <p>{project.manager.name}</p>
            <p>{project.expectedStartDate} 시작 예정</p>
          </div>
        </div>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectCard;
