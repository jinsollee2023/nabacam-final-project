import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useResumeProfileIntroStore } from "../../../../../store/useResumeProfileIntroStore";
import { S } from "../Resume.styles";

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
    <S.AccountForm>
      <S.Label>
        프리랜서마켓에 등록될 프로필을 100자 이내로 입력해주세요.
        <TextArea
          showCount
          maxLength={100}
          style={{
            height: "120px",
            marginTop: "24px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid var(--main-blue)",
            width: "100%",
          }}
          placeholder="예시)UI/UX디자인 3년차"
          value={newProfileIntroInput}
          onChange={(e) => onChangeNewprofileIntroInputHandler(e.target.value)}
        />
      </S.Label>
    </S.AccountForm>
  );
};

export default AddResumeProfileIntroModal;
