import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
const JoinComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signupHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) console.error(error);
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const emailOnChange = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={signupHandler}>
        <input type="text" onChange={emailOnChange} />
        <input type="password" onChange={passwordOnChange} />
        <button>회원가입</button>
      </form>
    </>
  );
};

export default JoinComponent;
