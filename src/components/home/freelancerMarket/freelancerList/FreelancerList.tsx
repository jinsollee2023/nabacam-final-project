import React, { useEffect, useState } from "react";
import { S } from "./freelancerList.styles";
import { User } from "../../../../Types";
import FreelancerCard from "./FreelancerCard";
import { useSearchKeywordStore } from "src/store/useSearchKeywordStore";
import { Spin } from "antd";
import useFreelancersQueries from "src/hooks/useFreelancersQueries";
import { useInView } from "react-intersection-observer";

export interface PortfolioIndexMap {
  [freelancerId: string]: number;
}

interface FreelancerListProps {
  selectedSortLabel: string;
  selectedWorkField: string;
}

const FreelancerList = ({ selectedSortLabel, selectedWorkField }: FreelancerListProps) => {
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState<PortfolioIndexMap>({});
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const [ref, inView] = useInView();

  // 선택한 SortLabel를 기준으로 정렬된 프리랜서 데이터 불러오기
  const { freelancersDataBySort, error, fetchNextPage, hasNextPage, status } =
    useFreelancersQueries(selectedSortLabel);

  const [filteredFreelancers, setFilteredFreelancers] = useState<User[][]>([]);

  // 검색 키워드 초기화..
  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  // 정렬된 프리랜서 데이터가 들어오면 검색 실행..
  useEffect(() => {
    if (freelancersDataBySort?.pages) {
      const filteredfreelancerLists = freelancersDataBySort?.pages.map((page) => {
        return page.user.filter((freelancer) => {
          const lowerCaseSearch = String(searchKeyword).toLowerCase();
          const workExp = String(freelancer.workExp);
          return (
            freelancer?.name?.toLowerCase().includes(lowerCaseSearch) ||
            freelancer?.workField?.workField?.toLowerCase().includes(lowerCaseSearch) ||
            freelancer?.workField?.workSmallField?.toLowerCase().includes(lowerCaseSearch) ||
            workExp === searchKeyword
          );
        });
      });

      setFilteredFreelancers(filteredfreelancerLists);
    }
  }, [freelancersDataBySort, searchKeyword]);

  // sortLable로 불러오는 값이 달라질 때마다 인디케이터(포트폴리오 동그라미)값을 무조건 첫번째로 초기화
  useEffect(() => {
    if (freelancersDataBySort?.pages) {
      const initialSelectedIndex: PortfolioIndexMap = {};
      freelancersDataBySort?.pages.map((page) => {
        return page.user.forEach((freelancer) => {
          initialSelectedIndex[freelancer.userId] = 0;
        });
      });

      setSelectedPortfolioIndex(initialSelectedIndex);
    }
  }, [freelancersDataBySort]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
    <S.FreelancerListContainer>
      {filteredFreelancers?.map((page, idx) => (
        <React.Fragment key={idx}>
          {page
            .filter(
              (freelancer) =>
                selectedWorkField === "전체보기" ||
                freelancer.workField?.workField === selectedWorkField
            )
            .map((freelancerItem) => (
              <div key={freelancerItem.userId}>
                <FreelancerCard
                  key={freelancerItem.userId}
                  freelancerItem={freelancerItem}
                  selectedPortfolioIndex={selectedPortfolioIndex}
                  setSelectedPortfolioIndex={setSelectedPortfolioIndex}
                />
              </div>
            ))}
        </React.Fragment>
      ))}
      <div ref={ref}></div>
    </S.FreelancerListContainer>
  );
};

export default FreelancerList;
