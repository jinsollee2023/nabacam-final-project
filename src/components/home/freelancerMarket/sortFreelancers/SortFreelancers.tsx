import { useState } from "react";
import { S } from "./sortFreelancers.styles";
import { Select, Space } from "antd";

interface SortFreelancersProps {
  onSort: (label: string) => void;
}

const SortFreelancers = ({ onSort }: SortFreelancersProps) => {
  const [selectedLabel, setSelectedLabel] = useState("경력 높은 순");
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
            { value: "경력 높은 순", label: "경력 높은 순" },
            { value: "경력 낮은 순", label: "경력 낮은 순" },
          ]}
        />
      </Space>
    </S.SortContainer>
  );
};

export default SortFreelancers;
