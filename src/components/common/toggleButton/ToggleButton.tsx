import React, { useState } from "react";
import { S } from "./toggleButton.styles";

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  return (
    <div>
      <S.CheckBox type="checkbox" left={"yes"} right={"no"} />
    </div>
  );
};

export default ToggleButton;
