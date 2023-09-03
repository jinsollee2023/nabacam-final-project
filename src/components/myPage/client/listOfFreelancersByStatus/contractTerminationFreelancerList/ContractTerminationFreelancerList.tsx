import React, { useEffect, useState } from "react";
import useClientsQueries from "../../../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../../../zustand/useUserStore";
import { S } from "../listOfFreelancersByStatusStyle";
import { IProjectWithFreelancer } from "../../../../../Types";
import { useSearchKeywordStore } from "../../../../../zustand/useSearchKeywordStore";
import ContractTerminationFreelancerCards from "./ContractTerminationFreelancerCards";

interface ContractTerminationFreelancerListProps {
  selectedWorkField: string;
  isLastFirst: boolean;
  terminationedProjectsWithFreelancers: IProjectWithFreelancer[];
}

const ContractTerminationFreelancerList = ({
  selectedWorkField,
  isLastFirst,
  terminationedProjectsWithFreelancers,
}: ContractTerminationFreelancerListProps) => {
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();

  // const { userId } = useUserStore();
  // const { terminationedProjectsWithFreelancers } = useProjectsQueries({
  //   currentUserId: userId,
  // });

  const [filteredFreelancers, setFilteredFreelancers] = useState<IProjectWithFreelancer[]>(
    terminationedProjectsWithFreelancers!
  );
  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  useEffect(() => {
    if (terminationedProjectsWithFreelancers) {
      const filteredfreelancerLists = terminationedProjectsWithFreelancers?.filter((project) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        const workExp = String(project.freelancer.workExp);
        return (
          project.freelancer?.name?.toLowerCase().includes(lowerCaseSearch) ||
          project.freelancer?.workField?.workField?.toLowerCase().includes(lowerCaseSearch) ||
          project.freelancer?.workField?.workSmallField?.toLowerCase().includes(lowerCaseSearch) ||
          project.title.toLowerCase().includes(lowerCaseSearch) ||
          workExp === searchKeyword
        );
      });
      setFilteredFreelancers(filteredfreelancerLists);
    }
  }, [terminationedProjectsWithFreelancers, searchKeyword]);

  // console.log("현재 로그인된 클라이언트 정보", client);
  // console.log(
  //   "현재 로그인된 클라이언트의 진행 완료된 프로젝트 정보",
  //   terminationedProjectsWithFreelancers
  // );

  if (!filteredFreelancers || filteredFreelancers.length === 0) {
    return <div>계약이 끝난 프리랜서가 없습니다.</div>;
  }

  return (
    <>
      <S.listContainer>
        {[
          ...new Map(
            filteredFreelancers.map((project) => [project.freelancerId, project])
          ).values(),
        ]
          .sort((a, b) =>
            isLastFirst
              ? new Date(b.date?.endDate as string).getTime() -
                new Date(a.date?.endDate as string).getTime()
              : new Date(a.date?.endDate as string).getTime() -
                new Date(b.date?.endDate as string).getTime()
          )
          .filter(
            (project) =>
              selectedWorkField === "전체보기" ||
              project.freelancer.workField?.workField === selectedWorkField
          )
          .map((project) => (
            <S.ListsBox key={`${project.freelancer.userId}-${project.projectId}`}>
              <ContractTerminationFreelancerCards
                key={`${project.freelancer.userId}-${project.projectId}`}
                user={project.freelancer}
                project={project}
              />
            </S.ListsBox>
          ))}
      </S.listContainer>
    </>
  );
};
export default ContractTerminationFreelancerList;
