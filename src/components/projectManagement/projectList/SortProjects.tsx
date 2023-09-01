import { useState } from "react";
import { S } from "../../home/freelancerMarket/sortFreelancers/sortFreelancers.styles";
import { Select } from "antd";
import React from "react";
import { BsArrowDownUp } from "react-icons/bs";

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
      <Select
        value={selectedTab}
        style={{ width: 200 }}
        onChange={handleChange}
        options={[
          { value: "진행 전", label: "진행 전", className: "progress-option" },
          { value: "진행 중 ", label: "진행 중", className: "progress-option" },
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
