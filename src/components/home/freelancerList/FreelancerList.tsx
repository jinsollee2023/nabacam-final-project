import React, { useEffect, useState } from "react";
import { S } from "./freelancerList.styles";

import { User } from "../../../Types";
import FreelancerCard from "./FreelancerCard";

export interface PortfolioIndexMap {
  [freelancerId: string]: number;
}

interface FreelancerListProps {
  freelancersData: User[];
}

const FreelancerList = ({ freelancersData }: FreelancerListProps) => {
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] =
    useState<PortfolioIndexMap>({});

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

  return (
    <S.FreelancerListContainer>
      {freelancersData?.map((freelancerItem) => (
        <div key={freelancerItem.userId}>
          <FreelancerCard
            freelancerItem={freelancerItem}
            selectedPortfolioIndex={selectedPortfolioIndex}
            setSelectedPortfolioIndex={setSelectedPortfolioIndex}
          />
        </div>
      ))}
    </S.FreelancerListContainer>
  );
};

export default FreelancerList;
