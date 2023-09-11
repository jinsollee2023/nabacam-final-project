import { useState } from "react";
import FreelancerList from "./freelancerList/FreelancerList";
import SearchItemBar from "../../common/searchItemBar/SearchItemBar";
import SortFreelancers from "./sortFreelancers/SortFreelancers";
import { styled } from "styled-components";
import WorkFieldCategory from "./workFieldCategory/WorkFieldCategory";
import ToggleButton from "src/components/common/toggleButton/ToggleButton";

const FreelancerMarket = () => {
  const [selectedSortLabel, setSelectedSortLabel] = useState("");
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");

  const handleSort = (label: string) => {
    setSelectedSortLabel(label);
  };

  return (
    <>
      <S.SearchItemBarAndSortFreelancersWrapper>
        <SearchItemBar />
        <SortFreelancers onSort={handleSort} />
      </S.SearchItemBarAndSortFreelancersWrapper>
      <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
      <FreelancerList
        selectedSortLabel={selectedSortLabel}
        selectedWorkField={selectedWorkField}
      />
    </>
  );
};

export default FreelancerMarket;

const S = {
  SearchItemBarAndSortFreelancersWrapper: styled.div`
    display: flex;
  `,
};
