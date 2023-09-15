import { useState } from "react";

const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };
  return {
    value,
    onChange: handleChange,
    reset,
  };
};

export default useInput;
