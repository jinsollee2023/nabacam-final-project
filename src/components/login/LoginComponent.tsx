import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const emailOnChange = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <input type="text" onChange={emailOnChange} />
        <input type="password" onChange={passwordOnChange} />
        <button>로그인</button>
      </form>
    </>
  );
};

export default LoginComponent;
