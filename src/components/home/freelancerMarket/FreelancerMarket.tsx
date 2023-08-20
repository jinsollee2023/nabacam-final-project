import React, { useState } from 'react'
import SearchFreelancer from '../searchFreelancer/SearchFreelancer'
import FreelancerList from '../freelancerList/FreelancerList'
import { useQuery } from '@tanstack/react-query';
import { getFreelancers } from '../../../api/User';
import { User } from '../../../Types';

const FreelancerMarket = () => {
  const [searchedKeyword, setSearchedKeyword] = useState('');
  
  // 프리랜서 데이터를 불러온다
  const {data: freelancersData, error: freelancersError, isLoading: freelancersIsLoading} = useQuery(['freelancersData'], getFreelancers);
  if(freelancersIsLoading){
    return <span>freelancers Loading..</span>
  }
  if(freelancersError){
    return <span>freelancers Error..</span>
  }
  
  // 검색 키워드를 지정하는 함수를 생성하여 searchFreelancer 컴포넌트로 보내서
  // 검색할 키워드를 가져와서 searchedKeyword로 지정해준다..
  const handleSearch = (keyword:string) => {
    setSearchedKeyword(keyword);
  }

  let filteredFreelancers;
  if (freelancersData) {
    filteredFreelancers = freelancersData?.filter(freelancer => {
      // 입력한 키워드가 대문자이든 소문자이든 무조건 소문자로 변경
      const lowerCaseSearch = String(searchedKeyword).toLowerCase();
      // workExp는 숫자이기 때문에 미리 문자열로 변경
      const workExp = String(freelancer.workExp);
          return (
            freelancer.name.toLowerCase().includes(lowerCaseSearch) ||
            freelancer.workField?.toLowerCase().includes(lowerCaseSearch) ||
            workExp === searchedKeyword
          )
    });
  }

  return (
    <>
      <SearchFreelancer onSearch={handleSearch}/>
      <FreelancerList freelancersData={filteredFreelancers as User[]}/>
    </>
  )
}

export default FreelancerMarket