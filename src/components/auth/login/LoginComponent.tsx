import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { UserStore, useUserStore } from "src/zustand/useUserStore";

const LoginComponent = () => {
  const { email, setUserEmail } = useUserStore();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
      if (error) {
        console.error(error);
      } else if (data) {
        // dB
        const { id, email } = data.user;
        // zustand
        if (email) setUserEmail(email);
        console.log(email);
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const emailOnChange = (e: any) => {
    setUserEmail(e.target.value);
  };
  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <input type="text" value={email} onChange={emailOnChange} />
        <input type="password" onChange={passwordOnChange} />
        <button>로그인</button>
      </form>
    </>
  );
};

export default LoginComponent;
