import { Switch } from "antd";
import styled from "styled-components";

interface ToggleButtonProps {
  onToggle: (checked: boolean) => void;
}

const ToggleButton = ({ onToggle }: ToggleButtonProps) => {
  const onChange = (checked: boolean) => {
    onToggle(checked);
  };
  return (
    <>
      <Switch onChange={onChange} />
      <S.ToggleText>모집 중인 프로젝트만 보기</S.ToggleText>
    </>
  );
};

export default ToggleButton;

const S = {
  ToggleText: styled.span`
    margin-left: 10px;
    color: var(--darker-gray);
    font-size: 14px;
  `,
};
