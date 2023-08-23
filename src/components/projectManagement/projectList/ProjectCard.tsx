import { useMutation, useQuery } from "@tanstack/react-query";
import { Project, User } from "src/Types";
import { getClients } from "src/api/User";
import S from "./ProjectListStyles";
import { deleteProject, updateProject } from "src/api/Project";
import { queryClient } from "src/App";
import { useState } from "react";
import Modal from "src/components/modal/Modal";
import ProjectDetailModal from "./ProjectDetailModal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "src/zustand/useProjectStore";

interface projectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: projectCardProps) => {
  const { data: client } = useQuery(
    ["clients"],
    async () => {
      const clientsData = await getClients();
      return clientsData;
    },
    {
      enabled: !!project,
      select: (clientsData: User[]) =>
        clientsData.find((client) => client.userId === project.clientId),
    }
  );

  const deleteProjectMutation = useMutation(
    (projectId: string) => deleteProject(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const updateProjectMutation = useMutation(
    ({ projectId, newProject }: { projectId: string; newProject: Project }) =>
      updateProject(projectId, newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
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
            <p>{client && client.name}</p>
            <p>{String(project.deadLine)} 종료</p>
          </div>
        </div>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectCard;
