import React, { useState, useRef, useEffect } from "react";
import supabase from "../../../config/supabaseClient";
import { toast } from "react-toastify";
import { S } from "./emailCheck.styles";
import { GrFormClose } from "react-icons/gr";

interface openModal {
  openModal: () => void;
}

// supabase 에서 email 확인해주는 로직
const EmailCheck = ({ openModal }: openModal) => {
  const [email, setEmail] = useState("");

  const EmailCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/resetPassword",
      });
      if (!error) {
        toast.success("입력하신 이메일로 비밀번호 변경 링크를 보내드렸습니다.");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const emailInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, []);

  return (
    <div>
      <S.EmailCheckdModalBG>
        <S.EmailCheckdModalContents onSubmit={(e) => EmailCheck(e)}>
          <S.Title>비밀번호 찾기</S.Title>
          <S.InfoText>입력한 이메일로 인증 메일을 보내드립니다.</S.InfoText>
          <S.EmailInput
            type="email"
            placeholder="가입 시 사용한 이메일을 입력해주세요."
            value={email}
            ref={emailInput}
            onChange={emailOnChange}
          />
          <S.EmailSendButton>이메일 입력 완료</S.EmailSendButton>
          <S.CloseButton onClick={openModal}>
            <GrFormClose size={"25"} />
          </S.CloseButton>
        </S.EmailCheckdModalContents>
      </S.EmailCheckdModalBG>
    </div>
  );
};

export default EmailCheck;
