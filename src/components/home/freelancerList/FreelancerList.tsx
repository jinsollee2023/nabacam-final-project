import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getPortfolios } from '../../../api/Portfolio';
import { S } from './freelancerList.styles';
import { FreelancerListProps, PortfolioIndexMap} from '../../../Types';
import {FaHandshakeSimple} from "react-icons/fa6"

const FreelancerList = ({freelancersData}:FreelancerListProps) => {
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState<PortfolioIndexMap>({});
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
                        <S.PortfolioItem
                          key={filteredPortfolio.portfolioId}
                          isSelected={selectedPortfolioIndex[freelanceritem.userId] === portfolioIndex}>
                            <S.PortfoliothumbNailImageBox>
                              <img src={filteredPortfolio.thumbNailURL} alt='thumbnailImage'/>
                              <S.indicatorWrapper>
                              {portfoliosData
                                .filter((portfolioItem) => portfolioItem.freelancerId === freelanceritem.userId)
                                .map((_, index) => (
                                  <S.Indicator
                                    key={index}
                                    selected={selectedPortfolioIndex[freelanceritem.userId] === index}
                                    onClick={() =>
                                      setSelectedPortfolioIndex((prevSelected) => ({
                                        ...prevSelected,
                                        [freelanceritem.userId]: index,
                                      }))
                                    }
                                  />
                                ))}
                            </S.indicatorWrapper>
                            </S.PortfoliothumbNailImageBox>
                            <S.PortfolioTitleBox>
                              <S.PortfolioTitle>{filteredPortfolio.title}</S.PortfolioTitle>
                            </S.PortfolioTitleBox>
                        </S.PortfolioItem>
                      ))}
                      {/* 해당 조건을 만족하지 않는 경우에만 jsx 부분 표시 */}
                      {/* some → 주어진 판별 함수를 적오도 하나라도 통과하는지 테스트 결국 조건문과 같다면 결국 여기서는 
                      포트폴리오들의 프리랜서 아이디 중에서 내가 지금 돌고있는 프리랜서의 아이디와 일치하는 것이 없다면 아래 jsx를 보여줌*/}
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