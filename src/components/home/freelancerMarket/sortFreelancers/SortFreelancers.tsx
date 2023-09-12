import { useState } from "react";
import { S } from "./sortFreelancers.styles";

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
      <S.Select
        value={selectedLabel}
        onChange={(value, _) => handleChange(value as string)}
        options={[
          { value: "경력 높은 순", label: "경력 높은 순" },
          { value: "경력 낮은 순", label: "경력 낮은 순" },
        ]}
      />
    </S.SortContainer>
  );
};

export default SortFreelancers;
