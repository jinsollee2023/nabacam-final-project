import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useForm } from "react-hook-form";
const JoinComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<any>("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [workField, setWorkField] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [phone, setPhone] = useState("");

  // const navigate = useNavigate();
  useEffect(() => {
    const userId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserData(user);
    };

    userId();
  }, []);

  const signupHandler = async (formdata: any) => {
    const { email, password } = formdata;
    setEmail("");
    setPassword("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const userDataHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserData = {
      userId: userData.id,
      name,
      role,
      photoURL,
      workField,
      workExp,
      contact: { email: userData.email, phone: phone },
    };
    try {
      const { data, error } = await supabase.from("users").insert(newUserData);
    } catch (error) {
      console.log(error);
    }
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
  const phoneOnChange = (e: any) => {
    setPhone(e.target.value);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(signupHandler)}>
          <div>
            <input
              type="text"
              placeholder="e-mail"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p>메일을 입력하세요</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p>올바른 메일 형식이 아닙니다</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p>비밀번호를 입력하세요</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p>비밀번호는 최소 6자리 이상</p>
            )}
            <button>다음</button>
          </div>
        </form>

        <br />
        <form onSubmit={userDataHandler}>
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
            value={phone}
            onChange={phoneOnChange}
            placeholder="핸드폰"
          />
          <button>회원가입</button>
        </form>
      </div>
    </>
  );
};

export default JoinComponent;
