import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Project } from "src/Types";
import { useSearchKeywordStore } from "src/store/useSearchKeywordStore";
import { useUserStore } from "src/store/useUserStore";
import ProjectCard from "./ProjectCard";
import { S } from "./projectList.styles";
import useProjectOfFreelancerBySortQueries from "src/hooks/queries/useProjectOfFreelancerBySortQueries";
import { useInView } from "react-intersection-observer";

interface ProjectListProps {
  selectedSortLabel: string;
  selectedWorkField: string;
  currentToggleStatus: boolean;
}

const ProjectList = ({
  selectedSortLabel,
  selectedWorkField,
  currentToggleStatus,
}: ProjectListProps) => {
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const { userId } = useUserStore();
  const [ref, inView] = useInView();

  // 프로젝트 탐색에서 선택한 sortLabel을 기준으로 프로젝트 리스트 불러오기..
  const { projectsListBySort, error, fetchNextPage, hasNextPage, status } =
    useProjectOfFreelancerBySortQueries({
      currentUserId: userId,
      sortLabel: selectedSortLabel,
    });

  const [filteredProjects, setFilteredProjects] = useState<Project[][]>([]);

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  // 정렬되어 가져온 프로젝트 리스트 검색..!
  useEffect(() => {
    if (projectsListBySort?.pages) {
      const filteredProjectLists = projectsListBySort?.pages.map((page) => {
        return page.projects.filter((project) => {
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
      if (currentToggleStatus) {
        const openProject = filteredProjectLists.filter((project) => {
          return project.status === "진행 전";
        });
        setFilteredProjects(openProject);
      } else {
        setFilteredProjects(filteredProjectLists);
      }
    }
  }, [projectsListBySort, searchKeyword, currentToggleStatus]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return status === "loading" ? (
    <Spin
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    />
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      {filteredProjects && (
        <S.ProjectListContainer>
          {filteredProjects?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page
                .filter(
                  (project) =>
                    selectedWorkField === "전체보기" || project.category === selectedWorkField
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
            </React.Fragment>
          ))}
          <div ref={ref}></div>
        </S.ProjectListContainer>
      )}
    </>
  );
};

export default ProjectList;
