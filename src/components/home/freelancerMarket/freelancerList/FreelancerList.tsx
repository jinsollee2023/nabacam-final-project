import { useEffect, useState } from "react";
import { S } from "./freelancerList.styles";
import { User } from "../../../../Types";
import FreelancerCard from "./FreelancerCard";
import { useSearchKeywordStore } from "src/zustand/useSearchKeywordStore";
import { Spin } from "antd";
import useFreelancersQueries from "src/hooks/useFreelancersQueries";

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

  const { freelancersDataBySort, freelancersError, freelancersIsLoading } =
    useFreelancersQueries(selectedSortLabel);

  const [filteredFreelancers, setFilteredFreelancers] = useState<User[]>(freelancersDataBySort!);

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  useEffect(() => {
    if (freelancersDataBySort) {
      const filteredfreelancerLists = freelancersDataBySort?.filter((freelancer) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        const workExp = String(freelancer.workExp);
        return (
          freelancer?.name?.toLowerCase().includes(lowerCaseSearch) ||
          freelancer?.workField?.workField?.toLowerCase().includes(lowerCaseSearch) ||
          freelancer?.workField?.workSmallField?.toLowerCase().includes(lowerCaseSearch) ||
          workExp === searchKeyword
        );
      });
      setFilteredFreelancers(filteredfreelancerLists);
    }
  }, [freelancersDataBySort, searchKeyword]);

  useEffect(() => {
    if (freelancersDataBySort) {
      const initialSelectedIndex: PortfolioIndexMap = {};
      freelancersDataBySort.forEach((freelancer) => {
        initialSelectedIndex[freelancer.userId] = 0;
      });
      setSelectedPortfolioIndex(initialSelectedIndex);
    }
  }, [freelancersDataBySort]);

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
    <S.FreelancerListContainer>
      {filteredFreelancers
        ?.filter(
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
    </S.FreelancerListContainer>
  );
};

export default FreelancerList;
