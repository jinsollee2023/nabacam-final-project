import React, { useEffect, useState } from "react";
import { S } from "../listOfFreelancersByStatus.style";
import { IProjectWithFreelancer } from "../../../../../Types";
import { useSearchKeywordStore } from "../../../../../zustand/useSearchKeywordStore";
import ContractTerminationFreelancerCards from "./ContractTerminationFreelancerCards";

interface ContractTerminationFreelancerListProps {
  selectedWorkField: string;
  isLastFirst: boolean;
  freelancersWithTerminatedProjects: IProjectWithFreelancer[];
}

const ContractTerminationFreelancerList = ({
  selectedWorkField,
  isLastFirst,
  freelancersWithTerminatedProjects,
}: ContractTerminationFreelancerListProps) => {
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const [filteredFreelancers, setFilteredFreelancers] = useState<IProjectWithFreelancer[]>(
    freelancersWithTerminatedProjects!
  );
  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  useEffect(() => {
    if (freelancersWithTerminatedProjects) {
      const filteredfreelancerLists = freelancersWithTerminatedProjects?.filter((project) => {
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
  }, [freelancersWithTerminatedProjects, searchKeyword]);

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
            <S.ListsBox key={`${project.freelancer?.userId}-${project.projectId}`}>
              <ContractTerminationFreelancerCards
                key={`${project.freelancer?.userId}-${project.projectId}`}
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
