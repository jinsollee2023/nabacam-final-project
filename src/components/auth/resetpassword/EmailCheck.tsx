import React, { useState } from "react";
import supabase from "../../../config/supabaseClient";

const EmailCheck = () => {
  const [email, setEmail] = useState("");

  const EmailCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/resetPassword",
      });
      console.log(data);
      if (!error) {
        alert("입력한 이메일을 확인해주세요");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const emailOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => EmailCheck(e)}>
        <input
          type="email"
          placeholder="이메일 입력해주세요"
          value={email}
          onChange={emailOnChange}
        />

        <button>이메일 입력</button>
      </form>
    </div>
  );
};

export default EmailCheck;
