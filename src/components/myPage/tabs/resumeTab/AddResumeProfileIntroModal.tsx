import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useResumeProfileIntroStore } from "../../../../zustand/useResumeProfileIntroStore";
import { styled } from "styled-components";

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
    <S.Form>
      <S.Label>
        간단한 프로필을 입력해주세요.
        <TextArea
          showCount
          maxLength={500}
          style={{
            height: "120px",
            marginTop: "24px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid var(--main-blue)",
            width: "100%",
          }}
          placeholder="500자 이하로 입력해주세요..."
          value={newProfileIntroInput}
          onChange={(e) => onChangeNewprofileIntroInputHandler(e.target.value)}
        />
      </S.Label>
    </S.Form>
  );
};

export default AddResumeProfileIntroModal;

const S = {
  Form: styled.form`
    max-width: 400px;
    margin: 0 auto;
  `,

  Label: styled.label`
    display: block;
    margin-bottom: 16px;
    font-size: 18px;
  `,

  TextArea: styled.textarea`
    height: 120px;
    margin-bottom: 16px;
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
  `,
};
