import { Project } from "../../../Types";
import S from "./ProjectListStyles";
import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import ProjectDetailModal from "./ProjectDetailModal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "../../../zustand/useProjectStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import React from "react";

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

  const deleteProjectButtonHandler = () => {
    deleteProjectMutation.mutate(project.projectId!);
  };

  const updateProjectButtonHandler = () => {
    updateProjectMutation.mutate({
      projectId: project.projectId as string,
      newProject,
    });
    setIsUpadateModalOpen(false);
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
          <AddProjectModal project={project} />
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
              onClick={() => setIsUpadateModalOpen(true)}
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
                {project.date.endDate} 종료
              </p>
            </div>
          </div>
        </div>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectCard;
