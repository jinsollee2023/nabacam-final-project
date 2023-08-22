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
            { value: "최근 가입 순", label: "최근 가입 순" },
            { value: "오래된 가입 순", label: "오래된 가입 순" },
            { value: "포트폴리오 많은 순", label: "포트폴리오 많은 순" },
            { value: "포트폴리오 적은 순", label: "포트폴리오 적은 순" },
          ]}
        />
      </Space>
    </S.SortContainer>
  );
};

export default SortFreelancers;
