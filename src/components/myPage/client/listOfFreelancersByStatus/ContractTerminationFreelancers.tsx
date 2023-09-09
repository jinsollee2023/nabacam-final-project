import React, { useState } from "react";
import { S } from "./listOfFreelancersByStatus.style";
import SearchItemBar from "../../../../components/common/searchItemBar/SearchItemBar";
import { LuArrowUpDown } from "react-icons/lu";
import WorkFieldCategory from "../../../../components/home/freelancerMarket/workFieldCategory/WorkFieldCategory";
import ContractTerminationFreelancerList from "./contractTerminationFreelancerList/ContractTerminationFreelancerList";
import { useUserStore } from "src/zustand/useUserStore";
import { IProjectWithFreelancer } from "src/Types";
import useTerminationedProjectsQueries from "src/hooks/queries/useTerminationedProjectsQueries";
import useClientsQueries from "src/hooks/useClientsQueries";

const ContractTerminationFreelancers = () => {
  // 최신순/오래된 순 필터버튼 상태관리
  const [isLastFirst, setIsLastFirst] = useState(true);
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");

  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { freelancersWithTerminatedProjects } = useTerminationedProjectsQueries({
    currentUserId: userId,
  });
  // console.log(freelancersWithTerminatedProjects);

  // 필터 버튼 토글
  const handleSortToggle = () => {
    setIsLastFirst(!isLastFirst);
  };

  return (
    <>
      {freelancersWithTerminatedProjects && freelancersWithTerminatedProjects?.length > 0 ? (
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
            freelancersWithTerminatedProjects={
              freelancersWithTerminatedProjects as IProjectWithFreelancer[]
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
