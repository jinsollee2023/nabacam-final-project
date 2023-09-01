import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Project } from "src/Types";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useSearchKeywordStore } from "src/zustand/useSearchKeywordStore";
import { useUserStore } from "src/zustand/useUserStore";
import ProjectCard from "./ProjectCard";

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
        <div id="freelancerListContainer">
          <span>
            모집 중인 {selectedWorkField} 분야의 프로젝트는 총{" "}
            {selectedWorkField === "전체보기"
              ? filteredProjects.length
              : filteredProjects.filter(
                  (project) => project.category === selectedWorkField
                ).length}
            개입니다.
          </span>
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
        </div>
      )}
    </>
  );
};

export default ProjectList;
