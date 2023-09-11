import { useState } from "react";
import SearchItemBar from "../../../components/common/searchItemBar/SearchItemBar";
import { styled } from "styled-components";
import SortProjects from "./sortProjects/SortProjects";
import WorkFieldCategory from "../freelancerMarket/workFieldCategory/WorkFieldCategory";
import ProjectList from "./projectList/ProjectList";
import ToggleButton from "src/components/common/toggleButton/ToggleButton";

const ProjectNavigation = () => {
  const [selectedSortLabel, setSelectedSortLabel] = useState("");
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");
  const [currentToggleStatus, setCurrentToggleStatus] = useState(false);

  const handleSort = (label: string) => {
    setSelectedSortLabel(label);
  };

  const handleToggle = () => {
    setCurrentToggleStatus(!currentToggleStatus);
  };

  return (
    <>
      <S.SearchItemBarAndSortProjectsWrapper>
        <SearchItemBar />
        <SortProjects onSort={handleSort} />
      </S.SearchItemBarAndSortProjectsWrapper>
      <S.ToggleButtonAndWorkFieldCategoryWrapper>
        <S.ToggleButtonBox>
          <ToggleButton onToggle={handleToggle} />
        </S.ToggleButtonBox>
        <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
      </S.ToggleButtonAndWorkFieldCategoryWrapper>
      <ProjectList
        selectedSortLabel={selectedSortLabel}
        selectedWorkField={selectedWorkField}
        currentToggleStatus={currentToggleStatus}
      />
    </>
  );
};

export default ProjectNavigation;

const S = {
  SearchItemBarAndSortProjectsWrapper: styled.div`
    display: flex;
  `,
  ToggleButtonAndWorkFieldCategoryWrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 46px;
  `,
  ToggleButtonBox: styled.div`
    position: absolute;
    right: 0;
    bottom: 5px;
    z-index: 1;
  `,
};
