import React, { useEffect, useState } from "react";
import { S } from "./listOfFreelancersByStatus.style";
import { useSearchKeywordStore } from "../../../../store/useSearchKeywordStore";
import ContractTerminationFreelancerCards from "./ContractTerminationFreelancerCards";
import SearchItemBar from "../../../common/searchItemBar/SearchItemBar";
import { LuArrowUpDown } from "react-icons/lu";
import WorkFieldCategory from "../../../home/freelancerMarket/workFieldCategory/WorkFieldCategory";
import { useUserStore } from "../../../../store/useUserStore";
import useTerminationedProjectsQueries from "../../../../hooks/queries/useTerminationedProjectsQueries";
import { useInView } from "react-intersection-observer";
import { IProjectWithFreelancer } from "src/Types";
import { Spin } from "antd";

const ContractTerminationFreelancerList = () => {
  const [ref, inView] = useInView();

  const { userId } = useUserStore();
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();

  const {
    freelancersWithTerminatedProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useTerminationedProjectsQueries({
    currentUserId: userId,
  });

  // 최신순/오래된 순 필터버튼 상태관리
  const [isLastFirst, setIsLastFirst] = useState(true);
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");
  const [filteredFreelancers, setFilteredFreelancers] = useState<
    IProjectWithFreelancer[][]
  >([]);

  // 검색 키워드 초기화
  useEffect(() => {
    if (searchKeyword) {
      changeSearchKeyword("");
    }
  }, []);

  useEffect(() => {
    if (freelancersWithTerminatedProjects?.pages.length !== 0) {
      const filteredfreelancerLists =
        freelancersWithTerminatedProjects?.pages.map((page) => {
          return page.projects.filter((project) => {
            const lowerCaseSearch = String(searchKeyword).toLowerCase();
            const workExp = String(project.freelancer.workExp);
            return (
              project.freelancer?.name
                ?.toLowerCase()
                .includes(lowerCaseSearch) ||
              project.freelancer?.workField?.workField
                ?.toLowerCase()
                .includes(lowerCaseSearch) ||
              project.freelancer?.workField?.workSmallField
                ?.toLowerCase()
                .includes(lowerCaseSearch) ||
              project.title.toLowerCase().includes(lowerCaseSearch) ||
              workExp === searchKeyword
            );
          });
        });
      setFilteredFreelancers(filteredfreelancerLists!);
    }
  }, [freelancersWithTerminatedProjects, searchKeyword]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 필터 버튼 토글
  const handleSortToggle = () => {
    setIsLastFirst(!isLastFirst);
  };

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
      {freelancersWithTerminatedProjects?.pages &&
      freelancersWithTerminatedProjects?.pages[0].total_count > 0 ? (
        <>
          <S.SearchBox>
            <SearchItemBar />
            <S.FilterButton onClick={handleSortToggle}>
              {isLastFirst ? "최신순" : "오래된 순"}
              <LuArrowUpDown />
            </S.FilterButton>
          </S.SearchBox>
          <S.SelectBox>
            <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
          </S.SelectBox>
          <S.listContainer>
            {filteredFreelancers?.map((projects, idx) => (
              <React.Fragment key={idx}>
                {/* [...new Map(projects.map((project) => [project.freelancerId, project])).values()] */}
                {projects
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
                      project.freelancer.workField?.workField ===
                        selectedWorkField
                  )
                  .map((project) => (
                    <S.ListsBox
                      key={`${project.freelancer?.userId}-${project.projectId}`}
                    >
                      <ContractTerminationFreelancerCards
                        key={`${project.freelancer?.userId}-${project.projectId}`}
                        user={project.freelancer}
                        project={project}
                      />
                    </S.ListsBox>
                  ))}
              </React.Fragment>
            ))}
            <div ref={ref}></div>
          </S.listContainer>
        </>
      ) : (
        <p>계약이 종료된 프리랜서가 없습니다.</p>
      )}
    </>
  );
};
export default ContractTerminationFreelancerList;
