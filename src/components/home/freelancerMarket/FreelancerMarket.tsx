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

const FreelancerMarket = () => {
  // const [searchedKeyword, setSearchedKeyword] = useState("");
  const [selectedSortLabel, setSelectedSortLabel] = useState("");
  const [selectedWorkField, setSelectedWorkField] = useState("전체보기");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedSortLabel !== "") {
      queryClient.invalidateQueries(["freelancersData", selectedSortLabel]);
    }
  }, [selectedSortLabel]);

  // 라벨을 선택하는 함수를 생성하여 sortFreelancers 컴포넌트로 보내서
  // 라벨을 가져와서 selectSortLabel에 지정해준다..
  const handleSort = (label: string) => {
    setSelectedSortLabel(label);
  };

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

    sortLabels.forEach(async (label) => {
      try {
        const data = await getFreelancersBySort(label);
        queryClient.setQueryData(["freelancersData", label], data);
      } catch (error) {
        console.error(
          `라벨 ${label} 데이터를 미리 불러오는 동안 오류 발생:`,
          error
        );
      }
    });
  }, [queryClient]);

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
