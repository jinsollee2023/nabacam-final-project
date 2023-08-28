import React, { useState } from "react";
import { Select, Space } from "antd";
import { S } from "../../freelancerMarket/sortFreelancers/sortFreelancers.styles";

interface SortProjectsProps {
  onSort: (label: string) => void;
}

const SortProjects = ({ onSort }: SortProjectsProps) => {
  const [selectedLabel, setSelectedLabel] = useState("최근 등록 순");

  const handleChange = (value: string) => {
    setSelectedLabel(value);
    onSort(value);
  };

  return (
    <S.SortContainer>
      <Space wrap>
        <Select
          value={selectedLabel}
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: "최근 등록 순", label: "최근 등록 순" },
            { value: "오래된 등록 순", label: "오래된 등록 순" },
            { value: "마감기한 빠른 순", label: "마감기한 빠른 순" },
            { value: "마감기한 느린 순", label: "마감기한 느린 순" },
            { value: "지원자 많은 순", label: "지원자 많은 순" },
            { value: "지원자 적은 순", label: "지원자 적은 순" },
            { value: "자격 연차 높은 순", label: "자격 연차 높은 순" },
            { value: "자격 연차 낮은 순", label: "자격 연차 낮은 순" },
          ]}
        />
      </Space>
    </S.SortContainer>
  );
};

export default SortProjects;
