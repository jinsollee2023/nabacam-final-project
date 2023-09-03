import React, { useState } from "react";
import { S } from "./listOfFreelancersByStatusStyle";
import SearchItemBar from "../../../../components/common/searchItemBar/SearchItemBar";
import { LuArrowUpDown } from "react-icons/lu";
import WorkFieldCategory from "../../../../components/home/freelancerMarket/workFieldCategory/WorkFieldCategory";
import ContractTerminationFreelancerList from "./contractTerminationFreelancerList/ContractTerminationFreelancerList";
import { useUserStore } from "src/zustand/useUserStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { IProjectWithFreelancer } from "src/Types";

const ContractTerminationFreelancers = () => {
  const [isLastFirst, setIsLastFirst] = useState(true);
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");

  const { userId } = useUserStore();
  const { terminationedProjectsWithFreelancers } = useProjectsQueries({
    currentUserId: userId,
  });

  const handleSortToggle = () => {
    setIsLastFirst(!isLastFirst);
  };

  return (
    <>
      {terminationedProjectsWithFreelancers &&
      terminationedProjectsWithFreelancers?.length > 0 ? (
        <>
          <S.SearchBox>
            <SearchItemBar />
            <S.FilterBtn onClick={handleSortToggle}>
              {isLastFirst ? "최신순" : "오래된 순"}
              <LuArrowUpDown />
            </S.FilterBtn>
          </S.SearchBox>
          <S.SelectBox>
            <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
          </S.SelectBox>
          <ContractTerminationFreelancerList
            selectedWorkField={selectedWorkField}
            isLastFirst={isLastFirst}
            terminationedProjectsWithFreelancers={
              terminationedProjectsWithFreelancers as IProjectWithFreelancer[]
            }
          />
        </>
      ) : (
        <p>계약이 종료된 프리랜서가 없습니다.</p>
      )}
    </>
  );
};

export default ContractTerminationFreelancers;
