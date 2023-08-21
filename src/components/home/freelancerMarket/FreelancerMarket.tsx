import React, { useState, useEffect } from "react";
import FreelancerList from "../freelancerList/FreelancerList";
import { useQuery } from "@tanstack/react-query";
import { getFreelancers } from "../../../api/User";
import { User } from "../../../Types";
import SearchItemBar from "../../common/searchItemBar/SearchItemBar";

const FreelancerMarket = () => {
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState<User[]>();

  // 프리랜서 데이터를 불러온다
  const {
    data: freelancersData,
    error: freelancersError,
    isLoading: freelancersIsLoading,
  } = useQuery(["freelancersData"], getFreelancers);

  // 검색 키워드를 지정하는 함수를 생성하여 searchFreelancer 컴포넌트로 보내서
  // 검색할 키워드를 가져와서 searchedKeyword로 지정해준다..
  const handleSearch = (keyword: string) => {
    setSearchedKeyword(keyword);
  };

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
          workExp === searchedKeyword
        );
      });
      setFilteredFreelancers(filteredfreelancerLists);
    }
  }, [freelancersData, searchedKeyword]);

  if (freelancersIsLoading) {
    return <span>freelancers Loading..</span>;
  }
  if (freelancersError) {
    return <span>freelancers Error..</span>;
  }

  return (
    <>
      <SearchItemBar onSearch={handleSearch} />
      <FreelancerList freelancersData={filteredFreelancers as User[]} />
    </>
  );
};

export default FreelancerMarket;
