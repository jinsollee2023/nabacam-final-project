import { useState } from "react";
import { S } from "../../home/freelancerMarket/sortFreelancers/sortFreelancers.styles";

interface SortProjectsProps {
  handleSort: (label: string) => void;
}

const SortProjects = ({ handleSort }: SortProjectsProps) => {
  const [selectedTab, setSelectedTab] = useState("전체보기");

  const handleChange = (value: string) => {
    setSelectedTab(value);
    handleSort(value);
  };

  return (
    <S.SortContainer>
      <S.Select
        value={selectedTab}
        onChange={(value, _) => handleChange(value as string)}
        options={[
          {
            value: "전체보기",
            label: "전체보기",
            className: "progress-option",
          },
          { value: "진행 전", label: "진행 전", className: "progress-option" },
          { value: "진행 중", label: "진행 중", className: "progress-option" },
          {
            value: "진행 완료",
            label: "진행 완료",
            className: "progress-option",
          },
        ]}
      />
    </S.SortContainer>
  );
};

export default SortProjects;
