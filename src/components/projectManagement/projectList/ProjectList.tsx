import { useMutation, useQuery } from "@tanstack/react-query";
import { addProject, getProjects } from "src/api/Project";
import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "src/components/modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { queryClient } from "src/App";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { useState } from "react";

const ProjectList = () => {
  const { data: projects } = useQuery(["projects"], async () => {
    const tasksData = await getProjects();
    return tasksData;
  });

  const { newProject } = useProjectStore();
  console.log(newProject);

  const addProjectMutation = useMutation(() => addProject(newProject), {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProjectButtonHandler = () => {
    addProjectMutation.mutate();
    setIsModalOpen(false);
  };

  return (
    <>
      <S.ProjectContainer>
        {projects &&
          projects.map((project) => {
            return <ProjectCard project={project} />;
          })}
      </S.ProjectContainer>
      <div
        onClick={() => setIsModalOpen(!isModalOpen)}
        style={{
          backgroundColor: "aliceblue",
          color: "black",
          border: "none",
          width: "100%",
          height: "100px",

          padding: "15px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          cursor: "pointer",
        }}
      >
        <RiAddBoxLine size="23" />
        <span>프로젝트 게시하기</span>
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
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
