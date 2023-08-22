import React, { useState, useEffect } from "react";
import FreelancerList from "./freelancerList/FreelancerList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFreelancersBySort } from "../../../api/User";
import { User } from "../../../Types";
import SearchItemBar from "../../common/searchItemBar/SearchItemBar";
import SortFreelancers from "./sortFreelancers/SortFreelancers";
import { styled } from "styled-components";
import WorkFieldCategory from "./workFieldCategory/WorkFieldCategory";
import { Spin } from "antd";
import { queryClient } from "../../../App";

const FreelancerMarket = () => {
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState<User[]>();
  const [selectedSortLabel, setSelectedSortLabel] = useState("");
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");

  // 프리랜서 데이터를 불러온다
  const {
    data: freelancersData,
    error: freelancersError,
    isLoading: freelancersIsLoading,
  } = useQuery(
    ["freelancersData", selectedSortLabel],
    () => getFreelancersBySort(selectedSortLabel),
    {
      staleTime: Infinity,
      onSuccess: (newData) => {
        setFilteredFreelancers(newData || []);
      },
    }
  );

  useEffect(() => {
    if (selectedSortLabel !== "") {
      queryClient.invalidateQueries(["freelancersData", selectedSortLabel]);
    }
  }, [selectedSortLabel]);

  // 검색 키워드를 지정하는 함수를 생성하여 searchFreelancer 컴포넌트로 보내서
  // 검색할 키워드를 가져와서 searchedKeyword로 지정해준다..
  const handleSearch = (keyword: string) => {
    setSearchedKeyword(keyword);
  };

  // 라벨을 선택하는 함수를 생성하여 sortFreelancers 컴포넌트로 보내서
  // 라벨을 가져와서 selectSortLabel에 지정해준다..
  const handleSort = (label: string) => {
    setSelectedSortLabel(label);
  };

  const queryClient = useQueryClient();

  // 미리 모든 정렬 쿼리들을 호출하여 데이터를 가져옴
  useEffect(() => {
    const sortLabels = [
      "경력 높은 순",
      "경력 낮은 순",
      "최근 가입 순",
      "오래된 가입 순",
      "포트폴리오 많은 순",
      "포트폴리오 적은 순",
    ];

    sortLabels.forEach((label) => {
      queryClient.prefetchQuery(["freelancersData", label], () =>
        getFreelancersBySort(label)
      );
    });
  }, [queryClient]);

  useEffect(() => {
    if (freelancersData) {
      const filteredfreelancerLists = freelancersData?.filter((freelancer) => {
        // 입력한 키워드가 대문자이든 소문자이든 무조건 소문자로 변경
        const lowerCaseSearch = String(searchedKeyword).toLowerCase();
        // workExp는 숫자이기 때문에 미리 문자열로 변경
        const workExp = String(freelancer.workExp);
        return (
          freelancer.name.toLowerCase().includes(lowerCaseSearch) ||
          freelancer.workField?.workField
            .toLowerCase()
            .includes(lowerCaseSearch) ||
          freelancer.workField?.workSmallField
            .toLowerCase()
            .includes(lowerCaseSearch) ||
          workExp === searchedKeyword
        );
      });

      setFilteredFreelancers(filteredfreelancerLists);
    }
  }, [freelancersData, searchedKeyword]);

  if (freelancersIsLoading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
  if (freelancersError) {
    return <span>freelancers Error..</span>;
  }

  return (
    <>
      <S.SearchItemBarAndSortFreelancersWrapper>
        <SearchItemBar onSearch={handleSearch} />
        <SortFreelancers onSort={handleSort} />
      </S.SearchItemBarAndSortFreelancersWrapper>
      <WorkFieldCategory onSelectWorkField={setSelectedWorkField} />
      <FreelancerList
        freelancersData={filteredFreelancers as User[]}
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
