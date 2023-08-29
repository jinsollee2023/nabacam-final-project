import React, { useState } from "react";
import { S } from "./listOfFreelancersByStatusStyle";
import SearchItemBar from "src/components/common/searchItemBar/SearchItemBar";
import { LuArrowUpDown } from "react-icons/lu";
import WorkFieldCategory from "src/components/home/freelancerMarket/workFieldCategory/WorkFieldCategory";
import ContractTerminationFreelancerList from "./contractTerminationFreelancerList/ContractTerminationFreelancerList";

const ContractTerminationFreelancers = () => {
  const [isLastFirst, setIsLastFirst] = useState(true);
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");

  const handleSortToggle = () => {
    setIsLastFirst(!isLastFirst);
  };

  return (
    <>
      <S.SearchBox>
        <SearchItemBar />
      </S.SearchBox>
      <S.FilterBtn onClick={handleSortToggle}>
        {isLastFirst ? "최신순" : "오래된 순"}
        <LuArrowUpDown />
      </S.FilterBtn>
      <S.SelectBox>
        <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
      </S.SelectBox>
      <ContractTerminationFreelancerList
        selectedWorkField={selectedWorkField}
        isLastFirst={isLastFirst}
      />
    </>
  );
};

export default ContractTerminationFreelancers;
