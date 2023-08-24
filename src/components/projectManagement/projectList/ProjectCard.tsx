import { useQuery } from "@tanstack/react-query";
import { Project } from "src/Types";
import { getClientByProject } from "src/api/User";
import S from "./ProjectListStyles";
import { useState } from "react";
import Modal from "src/components/modal/Modal";
import ProjectDetailModal from "./ProjectDetailModal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "src/zustand/useProjectStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import useClientsQueries from "src/hooks/useClientsQueries";

interface projectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: projectCardProps) => {
  const { client } = useClientsQueries(project);
  const { deleteProjectMutation, updateProjectMutation } = useProjectsQueries(
    project.clientId
  );

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
        <Modal setIsModalOpen={setIsDetailModalOpen}>
          <ProjectDetailModal project={project} client={client!.name} />
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
          <AddProjectModal project={project} />
        </Modal>
      )}
      <S.ProjectCardBox justifyContent="space-between" marginBottom={20}>
        <S.ProjcetTitleBox onClick={() => setIsDetailModalOpen(true)}>
          {project.title}
        </S.ProjcetTitleBox>
        <div>
          <S.ProjectCardButtonBox>
            <span onClick={() => setIsUpadateModalOpen(true)}>수정</span>
            <span onClick={deleteProjectButtonHandler}>삭제</span>
          </S.ProjectCardButtonBox>
          <div>
            <p>{client && client!.name}</p>
            <p>{String(project.deadLine)} 종료</p>
          </div>
        </div>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectCard;
