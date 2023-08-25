import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Project } from "src/Types";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { useSearchKeywordStore } from "src/zustand/useSearchKeywordStore";
import { useUserStore } from "src/zustand/useUserStore";
import ProjectCard from "./ProjectCard";
import supabase from "src/config/supabaseClient";
import { useNavigate } from "react-router-dom";

interface ProjectListProps {
  selectedSortLabel: string;
  selectedWorkField: string;
}

const ProjectList = ({
  selectedSortLabel,
  selectedWorkField,
}: ProjectListProps) => {
  const { searchKeyword } = useSearchKeywordStore();
  const { userId } = useUserStore();
  const navigate = useNavigate();

  const { projectsListBySort, projectListIsError, projectListIsLoading } =
    useProjectsQueries({
      currentUserId: userId,
      sortLabel: selectedSortLabel,
    });

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projectsListBySort!
  );

  useEffect(() => {
    if (projectsListBySort) {
      // 키워드가 바뀌면 검색 로직 실행 / 기업이름(추가해야함), 프로젝트 이름, 설명, 연차, 지원자 수
      const filteredProjectLists = projectsListBySort?.filter((project) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        const numberOfApplicants = String(project.volunteer?.length);
        // const yearsOfEligibility = String(project.연차컬럼);
        return (
          project?.title?.toLowerCase().includes(lowerCaseSearch) ||
          project?.desc?.toLowerCase().includes(lowerCaseSearch) ||
          // project?.workField?.toLowerCase().includes(lowerCaseSearch) ||
          numberOfApplicants === searchKeyword
          // yearsOfEligibility === searchKeyword
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
      <div id="freelancerListContainer">
        {filteredProjects
          // .filter((project) => selectedWorkField === "전체보기")
          .map((projectItem) => (
            <div key={projectItem.projectId}>
              <ProjectCard
                key={projectItem.projectId}
                projectItem={projectItem}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ProjectList;
