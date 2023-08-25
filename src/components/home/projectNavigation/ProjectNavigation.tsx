import React, { useState } from "react";
import SearchItemBar from "src/components/common/searchItemBar/SearchItemBar";
import { styled } from "styled-components";
import SortProjects from "./sortProjects/SortProjects";
import WorkFieldCategory from "../freelancerMarket/workFieldCategory/WorkFieldCategory";
import ProjectList from "./projectList/ProjectList";

const ProjectNavigation = () => {
  const [selectedSortLabel, setSelectedSortLabel] = useState("");
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");

  const handleSort = (label: string) => {
    setSelectedSortLabel(label);
  };

  return (
    <>
      <S.SearchItemBarAndSortProjectsWrapper>
        <SearchItemBar />
        <SortProjects onSort={handleSort} />
      </S.SearchItemBarAndSortProjectsWrapper>
      <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
      <ProjectList
        selectedSortLabel={selectedSortLabel}
        selectedWorkField={selectedWorkField}
      />
    </>
  );
};

export default ProjectNavigation;

const S = {
  SearchItemBarAndSortProjectsWrapper: styled.div`
    display: flex;
  `,
};
