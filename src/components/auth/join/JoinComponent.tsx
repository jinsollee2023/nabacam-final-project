import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
const JoinComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<any>("");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [workField, setWorkField] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [contact, setContact] = useState("");

  // const navigate = useNavigate();
  const signupHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      setUserData(data.user);
      if (error) console.error(error);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const userDataHandler = async (e: any) => {
    e.preventDefault();

    await supabase
      .from("users")
      .update({ name, role, photoURL, workExp, workField, contact })
      .eq("id", userData.id);
  };

  const emailOnChange = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };
  const nameOnChange = (e: any) => {
    setName(e.target.value);
  };
  const roleOnChange = (e: any) => {
    setRole(e.target.value);
  };
  const photoURLOnChange = (e: any) => {
    setPhotoURL(e.target.value);
  };
  const workFieldOnChange = (e: any) => {
    setWorkField(e.target.value);
  };
  const workExpOnChange = (e: any) => {
    setWorkExp(e.target.value);
  };
  const contactOnChange = (e: any) => {
    setContact(e.target.value);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={email}
          onChange={emailOnChange}
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={passwordOnChange}
          placeholder="비밀번호"
        />

        <button onClick={signupHandler}>다음</button>
        <br />
        <input
          type="text"
          value={name}
          onChange={nameOnChange}
          placeholder="이름"
        />
        <input
          type="text"
          value={role}
          onChange={roleOnChange}
          placeholder="클라이언트 or 프리랜서"
        />
        <input
          type="text"
          value={photoURL}
          onChange={photoURLOnChange}
          placeholder="photourl"
        />
        <input
          type="text"
          value={workField}
          onChange={workFieldOnChange}
          placeholder="작업영역"
        />
        <input
          type="text"
          value={workExp}
          onChange={workExpOnChange}
          placeholder="경험"
        />
        <input
          type="text"
          value={contact}
          onChange={contactOnChange}
          placeholder="contact"
        />
        <button onClick={userDataHandler}>회원가입</button>
      </div>
    </>
  );
};

export default JoinComponent;
