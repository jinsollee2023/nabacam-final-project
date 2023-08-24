import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "src/components/modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "src/zustand/useProjectStore";
import S from "./ProjectListStyles";
import { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import SearchItemBar from "src/components/common/searchItemBar/SearchItemBar";
import SortProjects from "./SortProjects";
import { queryClient } from "src/App";
import { useSearchKeywordStore } from "src/zustand/useSearchKeywordStore";
import { Project } from "src/Types";

const ProjectList = () => {
  const { userId } = useUserStore();
  const { projects, addProjectMutation } = useProjectsQueries({ userId });
  const { newProject } = useProjectStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedselectOption, setSelectedselectOption] = useState("전체보기");
  const [selectedSortLabel, setSelectedSortLabel] = useState("전체보기");
  const { projects, addProjectMutation } = useProjectsQueries({
    currentUserId: userId,
    sortLabel: selectedSortLabel,
  });
  const { newProject } = useProjectStore();
  const { searchKeyword } = useSearchKeywordStore();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects!
  );

  useEffect(() => {
    if (projects) {
      const filteredprojectList = projects?.filter((project) => {
        // 입력한 키워드가 대문자이든 소문자이든 무조건 소문자로 변경
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        return project?.title?.toLowerCase().includes(lowerCaseSearch);
      });
      setFilteredProjects(filteredprojectList);
    }
  }, [projects, searchKeyword]);

  useEffect(() => {
    queryClient.invalidateQueries(["projects", selectedSortLabel]);
  }, [selectedSortLabel]);

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
        {projects &&
          selectedselectOption === "전체보기" &&
          filteredProjects?.map((project) => {
            return <ProjectCard project={project} />;
          })}
        {projects &&
          selectedselectOption === "진행 전" &&
          beforeProgressProjects!.map((project) => {
            return <ProjectCard project={project} />;
          })}
        {projects &&
          selectedselectOption === "진행 중" &&
          onProgressProjects!.map((project) => {
            return <ProjectCard project={project} />;
          })}
        {projects &&
          selectedselectOption === "진행 완료" &&
          DoneProjects!.map((project) => {
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
