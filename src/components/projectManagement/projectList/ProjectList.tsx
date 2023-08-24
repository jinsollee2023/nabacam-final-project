import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "src/components/modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";

const ProjectList = () => {
  const { userId } = useUserStore();
  const { projects, addProjectMutation } = useProjectsQueries(userId);
  const { newProject } = useProjectStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addProjectButtonHandler = () => {
    addProjectMutation.mutate(newProject);
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
