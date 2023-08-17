import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getFreelancers } from '../../../api/User';
import { getPortfolios } from '../../../api/Portfolio';

const FreelancerList = () => {
  const {data: freelancersData, error:freelancersError, isLoading:freelancersIsLoading} = useQuery(['freelancersData'], getFreelancers);
  if(freelancersIsLoading){
    <span>freelancers Loading..</span>
  }
  if(freelancersError){
    <span>freelancers Error..</span>
  }
  const {data: portfoliosData, error: portfoliosError, isLoading: portfoliosIsLoading} = useQuery(['portfoliosData'], getPortfolios, {enabled: !!freelancersData});
  if(portfoliosIsLoading){
    <span>portfolios Loading..</span>
  }
  if(portfoliosError){
    <span>portfolios Error..</span>
  }
  
  return (
    <div id='freelancerListContainer'>
      <div>
      {freelancersData?.map((freelanceritem) => (
        <div key={freelanceritem.userId}>
          <div>
            <ul>
              {portfoliosData && portfoliosData?.filter((portfolioItem)=> portfolioItem.freelancerId === freelanceritem.userId )
                .map((filteredPortfolio)=> { 
                  return (
                  <div key={filteredPortfolio.portfolioId}>
                    <li><img src={filteredPortfolio.thumbNailURL} alt='thumbnailImage'/></li>
                    <li>{filteredPortfolio.title}</li>  
                  </div>
                )})}
            </ul>
          </div>
          <div>
            <span>{freelanceritem.name}</span>
            <span>{freelanceritem.workField}</span>
            <span>{freelanceritem.workExp}</span>
            <button>제안하기</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default FreelancerList;