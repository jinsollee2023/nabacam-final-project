import { useMutation, useQuery } from "@tanstack/react-query";
import { addProject, getProjectByClient } from "src/api/Project";
import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "src/components/modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { queryClient } from "src/App";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";

const ProjectList = () => {
  const { userId } = useUserStore();

  const { data: projects } = useQuery(
    ["projects"],
    async () => {
      const projectsData = await getProjectByClient(userId);
      return projectsData;
    },
    {
      enabled: !!userId,
    }
  );

  const { newProject } = useProjectStore();

  const addProjectMutation = useMutation(() => addProject(newProject), {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addProjectButtonHandler = () => {
    addProjectMutation.mutate();
    setIsAddModalOpen(false);
  };

  return (
    <>
      <S.ProjectContainer>
        {projects &&
          projects.map((project) => {
            return <ProjectCard project={project} />;
          })}
      </S.ProjectContainer>
      <S.ProjectCardBox
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
        justifyContent="center"
        marginBottom={0}
      >
        <RiAddBoxLine size="23" />
        <span>프로젝트 게시하기</span>
      </S.ProjectCardBox>
      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <button onClick={addProjectButtonHandler}>
                프로젝트 게시하기
              </button>
            </>
          }
        >
          <AddProjectModal />
        </Modal>
      )}
    </>
  );
};

export default ProjectList;
