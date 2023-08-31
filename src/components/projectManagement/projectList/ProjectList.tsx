import React from "react";
import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "../../modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "../../../zustand/useProjectStore";
import S from "./ProjectListStyles";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import SearchItemBar from "../../../components/common/searchItemBar/SearchItemBar";
import SortProjects from "./SortProjects";
import { queryClient } from "../../../App";
import { useSearchKeywordStore } from "../../../zustand/useSearchKeywordStore";
import { Project } from "../../../Types";

const ProjectList = () => {
  const { userId } = useUserStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedselectOption, setSelectedselectOption] = useState("전체보기");
  const [selectedSortLabel, setSelectedSortLabel] = useState("전체보기");
  const { projects, addProjectMutation } = useProjectsQueries({
    currentUserId: userId,
    sortLabel: selectedSortLabel,
  });
  const { newProject } = useProjectStore();
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects!
  );

  useEffect(() => {
    if (projects) {
      const filteredprojectList = projects?.filter((project) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        return project?.title?.toLowerCase().includes(lowerCaseSearch);
      });
      setFilteredProjects(filteredprojectList);
    }
  }, [projects, searchKeyword]);

  useEffect(() => {
    queryClient.invalidateQueries(["projectList", selectedSortLabel]);
  }, [selectedSortLabel]);

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  const handleSort = (label: string) => {
    setSelectedselectOption(label);
  };

  const addProjectButtonHandler = () => {
    addProjectMutation.mutate(newProject);
    setIsAddModalOpen(false);
  };

  const beforeProgressProjects = filteredProjects?.filter(
    (project) => project.status === "진행 전"
  );

  const onProgressProjects = filteredProjects?.filter(
    (project) => project.status === "진행 중"
  );

  const DoneProjects = filteredProjects?.filter(
    (project) => project.status === "진행 완료"
  );
  const projectsToRender =
    selectedselectOption === "전체보기"
      ? filteredProjects
      : selectedselectOption === "진행 전"
      ? beforeProgressProjects
      : selectedselectOption === "진행 중"
      ? onProgressProjects
      : DoneProjects;

  const renderProjects = (projectList: Project[]) => {
    return (
      <>
        {projectList?.length > 0 ? (
          projectList.map((project) => (
            <ProjectCard key={project.projectId} project={project} />
          ))
        ) : (
          <div>프로젝트가 없습니다.</div>
        )}
      </>
    );
  };

  return (
    <>
      <S.SearchSortWrapper>
        <SearchItemBar />
        <SortProjects handleSort={handleSort} />
        <div>
          <span onClick={() => setSelectedSortLabel("최신순")}>최신순</span>
          <span onClick={() => setSelectedSortLabel("오래된순")}>오래된순</span>
        </div>
      </S.SearchSortWrapper>
      <S.ProjectContainer>
        {projects && renderProjects(projectsToRender)}
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
              <S.ModalPostBtn onClick={addProjectButtonHandler}>
                프로젝트 게시하기
              </S.ModalPostBtn>
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
