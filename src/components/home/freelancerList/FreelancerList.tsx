import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
// import { getFreelancers } from '../../../api/User';
import { getPortfolios } from '../../../api/Portfolio';
import { S } from './freelancerList.styles';
import { FreelancerListProps, PortfolioIndexMap} from '../../../Types';
import {FaHandshakeSimple} from "react-icons/fa6"



const FreelancerList = ({freelancersData}:FreelancerListProps) => {
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState<PortfolioIndexMap>({});
  // const {data: freelancersData, error:freelancersError, isLoading:freelancersIsLoading} = useQuery(['freelancersData'], getFreelancers);
  const {data: portfoliosData, error: portfoliosError, isLoading: portfoliosIsLoading} = useQuery(['portfoliosData'], getPortfolios, {enabled: !!freelancersData});
  
  // 첫 번째 포트폴리오 항목을 보이도록 설정
  useEffect(() => {
    if (freelancersData) {
      const initialSelectedIndex: PortfolioIndexMap = {};
      freelancersData.forEach((freelancer) => {
        initialSelectedIndex[freelancer.userId] = 0;
      });
      setSelectedPortfolioIndex(initialSelectedIndex);
    }
  }, [freelancersData]);

  // if(freelancersIsLoading){
  //   return <span>freelancers Loading..</span>
  // }
  // if(freelancersError){
  //   return <span>freelancers Error..</span>
  // }

  if(portfoliosIsLoading){
    return <span>portfolios Loading..</span>
  }
  if(portfoliosError){
    return <span>portfolios Error..</span>
  }
  
  return (
    <S.FreelancerListContainer>
        {freelancersData?.map((freelanceritem) => (
          <div key={freelanceritem.userId}>
                <S.FreelancerList>
                  {portfoliosData && ( 
                    <S.PortfolioList>
                      {portfoliosData.filter((portfolioItem)=> portfolioItem.freelancerId === freelanceritem.userId )
                      .map((filteredPortfolio, portfolioIndex)=> (
                        <div key={filteredPortfolio.portfolioId} style={{position: 'relative', display: selectedPortfolioIndex[freelanceritem.userId] === portfolioIndex ? 'block' : 'none'}}>
                            <S.PortfoliothumbNailImageBox>
                              <img src={filteredPortfolio.thumbNailURL} alt='thumbnailImage'/>
                              <S.indicatorWrapper>
                              {portfoliosData
                                .filter((portfolioItem) => portfolioItem.freelancerId === freelanceritem.userId)
                                .map((_, index) => (
                                  <span
                                    key={index}
                                    onClick={() =>
                                      setSelectedPortfolioIndex((prevSelected) => ({
                                        ...prevSelected,
                                        [freelanceritem.userId]: index,
                                      }))
                                    } // 선택한 포트폴리오 인덱스 업데이트
                                    style={{
                                      width: '10px',
                                      height: '10px',
                                      display: 'inline-block',
                                      backgroundColor:
                                        selectedPortfolioIndex[freelanceritem.userId] === index ? 'black' : 'gray', // 선택된 인덱스에 따라 스타일링
                                      borderRadius: '50%',
                                      margin: '0 5px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                ))}
                            </S.indicatorWrapper>
                            </S.PortfoliothumbNailImageBox>
                            <S.PortfolioTitleBox>
                              <S.PortfolioTitle>{filteredPortfolio.title}</S.PortfolioTitle>
                            </S.PortfolioTitleBox>
                        </div>
                          // </li>
                      ))}
                      {/* 해당 조건을 만족하지 않는 경우에만 jsx 부분 표시 */}
                      {!portfoliosData.some((portfolioItem) => portfolioItem.freelancerId === freelanceritem.userId) && (
                        <li>
                          <S.PortfoliothumbNailImageBox>
                            <img src="https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-portfolio-thumbnail/default-portfolio-thumbnail.png" alt='default-thumbnailImage'/>
                          </S.PortfoliothumbNailImageBox>
                          <S.PortfolioTitleBox>
                            <S.PortfolioTitle>등록된 포트폴리오가 없습니다.</S.PortfolioTitle>
                          </S.PortfolioTitleBox>
                        </li>
                      )}
                    </S.PortfolioList>
                    )}

                  <S.MiniProfileBox>
                    <S.FreelancerContentBox>
                      <S.FreelancerName>{freelanceritem.name}</S.FreelancerName>
                      <S.FreelancerContent>{freelanceritem.workField}</S.FreelancerContent>
                      <S.FreelancerContent>{String(freelanceritem.workExp)}년차</S.FreelancerContent>
                    </S.FreelancerContentBox>
                    <S.SuggestButton><FaHandshakeSimple size="25"/></S.SuggestButton>
                  </S.MiniProfileBox>
                </S.FreelancerList>
          </div>
        ))}
    </S.FreelancerListContainer>
  );
}

export default FreelancerList;