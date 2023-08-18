import React, { useState } from 'react'
import SearchFreelancer from '../searchFreelancer/SearchFreelancer'
import FreelancerList from '../freelancerList/FreelancerList'
import { useQuery } from '@tanstack/react-query';
import { getFreelancers } from '../../../api/User';
import { User } from '../../../Types';

const FreelancerMarket = () => {
  const [searchedKeyword, setSearchedKeyword] = useState<string | number>('');
  
  const {data: freelancersData, error: freelancersError, isLoading: freelancersIsLoading} = useQuery(['freelancersData'], getFreelancers);
  if(freelancersIsLoading){
    return <span>freelancers Loading..</span>
  }
  if(freelancersError){
    return <span>freelancers Error..</span>
  }
  
  const handleSearch = (keyword:string) => {
    setSearchedKeyword(keyword);
  }

  let filteredFreelancers = freelancersData;

  if (freelancersData) {
    filteredFreelancers = freelancersData?.filter(freelancer => {
      const lowerCaseSearch = String(searchedKeyword).toLowerCase(); // 검색어를 소문자로 변경
      const workExp = String(freelancer.workExp); // workExp도 문자열로 변경
  
      return (
        (typeof searchedKeyword === 'string' &&
          (freelancer.name.toLowerCase().includes(lowerCaseSearch) ||
            freelancer.workField?.toLowerCase().includes(lowerCaseSearch))) ||
        (typeof searchedKeyword === 'number' && workExp === lowerCaseSearch) || // workExp를 문자열로 변경하여 검색어와 비교
        (typeof searchedKeyword === 'string' && workExp === lowerCaseSearch) // 숫자 검색어도 workExp와 비교
      );
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