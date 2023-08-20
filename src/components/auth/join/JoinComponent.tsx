import React, { useState } from "react";
import supabase from "../../../config/supabaseClient";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

interface FormValue {
  email: string;
  password: string;
}

const JoinComponent = () => {
  // useinput

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<any>("");
  const [showClientEmail, setShowClientEmail] = useState(false);
  const [showFreeLancerEmail, setFreeLancerEmail] = useState(false);

  const [showClientJoin, setShowClientJoin] = useState(false);
  const [showFreeLancerJoin, setShowFreeLancerJoin] = useState(false);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [workField, setWorkField] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [phone, setPhone] = useState("");

  const clientSignupHandler = async (formdata: any) => {
    const { email, password } = formdata;
    setEmail("");
    setPassword("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
      });

      const userId = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserData(user);
      };

      userId();
    } catch (error) {
      console.error(error);
    }
    setShowClientEmail(false);
    setShowClientJoin(true);
  };

  const freeLancerSignupHandler = async (formdata: any) => {
    const { email, password } = formdata;
    setEmail("");
    setPassword("");

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
      });
      console.log(signUpError);
      const userId = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserData(user);
      };

      userId();
    } catch (error) {
      console.error(error);
    }
    setFreeLancerEmail(false);
    setShowFreeLancerJoin(true);
  };
  const handleClientJoin = () => {
    setShowFreeLancerJoin(false);
    setShowClientEmail(!showClientEmail);
    setFreeLancerEmail(false);
  };
  const handleFreeLancerJoin = () => {
    setShowClientJoin(false);
    setFreeLancerEmail(!showFreeLancerEmail);
    setShowClientEmail(false);
  };

  const ClientData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserData = {
      userId: userData.id,
      name,
      role: "client",
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
    navigate("/login");
  };

  const FreeLancerData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserData = {
      userId: userData.id,
      name,
      role: "freelancer",
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
    navigate("/login");
  };

  const nameOnChange = (e: any) => {
    setName(e.target.value);
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
        <Stdiv>
          <Stbutton onClick={handleClientJoin}>클라이언트</Stbutton>
          <Stbutton onClick={handleFreeLancerJoin}>프리랜서</Stbutton>
        </Stdiv>
        {showClientEmail && (
          <form onSubmit={handleSubmit(clientSignupHandler)}>
            <h1>클라이언트</h1>
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
                  // minLength: 6,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <p>비밀번호를 입력하세요</p>
              )}
              {/* {errors.password && errors.password.type === "minLength" && (
                <p>비밀번호는 최소 6자리 이상</p>
              )} */}
              <button>다음</button>
            </div>
          </form>
        )}

        {showFreeLancerEmail && (
          <form onSubmit={handleSubmit(freeLancerSignupHandler)}>
            <h1>프리랜서</h1>

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
                  // minLength: 6,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <p>비밀번호를 입력하세요</p>
              )}
              {/* {errors.password && errors.password.type === "minLength" && (
                <p>비밀번호는 최소 6자리 이상</p>
              )} */}
              <button>다음</button>
            </div>
          </form>
        )}

        <br />
        {showClientJoin && (
          <form onSubmit={ClientData}>
            <input
              type="text"
              value={name}
              onChange={nameOnChange}
              placeholder="이름"
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
        )}
        {showFreeLancerJoin && (
          <form onSubmit={FreeLancerData}>
            <input
              type="text"
              value={name}
              onChange={nameOnChange}
              placeholder="이름"
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
        )}
      </div>
    </>
  );
};

export default JoinComponent;

const Stdiv = styled.div`
  border: 1px solid black;
  width: 250px;
  height: 250px;
  display: flex;
  margin-left: 25%;
`;

const Stbutton = styled.button`
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
`;
