import React, { useEffect, useState } from "react";
import { useResumeProfileIntroStore } from "../../../../../store/useResumeProfileIntroStore";
import { S } from "../Resume.styles";

interface profileIntroProps {
  profileIntro: string;
}

const AddResumeProfileIntroModal = ({ profileIntro }: profileIntroProps) => {
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
    <S.AccountForm>
      <S.Label>
        자신을 소개하는 글을 150자 이내로 입력해주세요.
        <S.AntdTextArea
          showCount
          maxLength={150}
          placeholder=" 이내로 자신에 대해 간략히 소개해주세요."
          value={newProfileIntroInput}
          onChange={(e) => onChangeNewprofileIntroInputHandler(e.target.value)}
          style={{ resize: "none" }}
          wrap="hard"
        />
      </S.Label>
    </S.AccountForm>
  );
};

export default AddResumeProfileIntroModal;
