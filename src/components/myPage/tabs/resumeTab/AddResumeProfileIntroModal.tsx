import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useResumeProfileIntroStore } from "../../../../zustand/useResumeProfileIntroStore";

interface profileIntroProps {
  profileIntro: string;
}

const AddResumeProfileIntroModal = ({ profileIntro }: profileIntroProps) => {
  const { TextArea } = Input;
  const [newProfileIntroInput, setNewProfileIntroInput] = useState(
    profileIntro && profileIntro !== "" ? profileIntro : ""
  );
  const { changeNewProfileIntroInput } = useResumeProfileIntroStore();

  const onChangeNewprofileIntroInputHandler = (value: string) => {
    setNewProfileIntroInput(value);
  };
  useEffect(() => {
    changeNewProfileIntroInput(newProfileIntroInput);
  }, [newProfileIntroInput]);

  return (
    <form>
      <label>
        간단한 프로필을 입력해주세요.
        <TextArea
          showCount
          maxLength={500}
          style={{ height: 120, marginBottom: 24 }}
          placeholder="500자 이하로 입력해주세요..."
          value={newProfileIntroInput}
          onChange={(e) => onChangeNewprofileIntroInputHandler(e.target.value)}
        />
      </label>
    </form>
  );
};

export default AddResumeProfileIntroModal;
