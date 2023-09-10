import { useState } from "react";
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
            { value: "시작 예정일 순", label: "시작 예정일 순" },
            { value: "지원자 많은 순", label: "지원자 많은 순" },
          ]}
        />
      </Space>
    </S.SortContainer>
  );
};

export default SortProjects;
