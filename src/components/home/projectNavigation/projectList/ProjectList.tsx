import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Project } from "src/Types";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useSearchKeywordStore } from "src/zustand/useSearchKeywordStore";
import { useUserStore } from "src/zustand/useUserStore";
import ProjectCard from "./ProjectCard";
import { S } from "./projectList.styles";

interface ProjectListProps {
  selectedSortLabel: string;
  selectedWorkField: string;
}

const ProjectList = ({
  selectedSortLabel,
  selectedWorkField,
}: ProjectListProps) => {
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const { userId } = useUserStore();

  // 프로젝트 탐색에서 선택한 sortLabel을 기준으로 프로젝트 리스트 불러오기..
  const { projectsListBySort, projectListIsError, projectListIsLoading } =
    useProjectsQueries({
      currentUserId: userId,
      sortLabel: selectedSortLabel,
    });

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projectsListBySort!
  );

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  // 정렬되어 가져온 프로젝트 리스트 검색..!
  useEffect(() => {
    if (projectsListBySort) {
      const filteredProjectLists = projectsListBySort?.filter((project) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        const numberOfApplicants = String(project.volunteer?.length);
        const yearsOfEligibility = String(project.qualification);
        return (
          project?.title?.toLowerCase().includes(lowerCaseSearch) ||
          project?.desc?.toLowerCase().includes(lowerCaseSearch) ||
          project?.category?.toLowerCase().includes(lowerCaseSearch) ||
          numberOfApplicants === searchKeyword ||
          yearsOfEligibility === searchKeyword
        );
      });
      setFilteredProjects(filteredProjectLists);
    }
  }, [projectsListBySort, searchKeyword]);

  if (projectListIsLoading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
  if (projectListIsError) {
    return <span>Project list fetch Error ..</span>;
  }

  return (
    <>
      {filteredProjects && (
        <S.ProjectListContainer>
          {filteredProjects
            ?.filter(
              (project) =>
                selectedWorkField === "전체보기" ||
                project.category === selectedWorkField
            )
            .map((projectItem) => {
              return (
                <div key={projectItem.projectId}>
                  <ProjectCard
                    key={projectItem.projectId}
                    projectItem={projectItem}
                    userId={userId}
                  />
                </div>
              );
            })}
        </S.ProjectListContainer>
      )}
    </>
  );
};

export default ProjectList;
