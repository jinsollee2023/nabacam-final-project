import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { S } from "./resume.styles";
import { useResumeStore } from "src/store/useResumeStore";

interface profileIntroProps {
  profileIntro: string;
}

const AddResumeProfileIntroModal = ({ profileIntro }: profileIntroProps) => {
  const { TextArea } = Input;
  const [newProfileIntroInput, setNewProfileIntroInput] = useState(
    profileIntro && profileIntro !== "" ? profileIntro : ""
  );
  const { changeNewProfileIntroInput } = useResumeStore();

  const onChangeNewprofileIntroInputHandler = (value: string) => {
    setNewProfileIntroInput(value);
  };
  useEffect(() => {
    changeNewProfileIntroInput(newProfileIntroInput);
  }, [newProfileIntroInput]);

  return (
    <S.AccountForm>
      <S.Label>
        프리랜서 마켓에 등록될 프로필을 입력해주세요.
        <TextArea
          showCount
          style={{
            height: "450px",
            marginTop: "24px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid var(--main-blue)",
            width: "100%",
            resize: "none",
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
