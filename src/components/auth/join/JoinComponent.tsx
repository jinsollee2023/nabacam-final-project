import React, { useState } from "react";
import supabase from "../../../config/supabaseClient";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { Select } from "antd";
import ImagePreview from "./ProfileImg";

import { uploadUserImage } from "src/api/User";
import { useNavigate } from "react-router-dom";
interface FormValue {
  email: string;
  password: string;
}

const JoinComponent = (props: any) => {
  // useinput

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openClientJoin, setOpenClientJoin] = useState(true);
  const [openFreelancer, setOpenFreelancer] = useState(props.freelancerOpen);
  const [workSelect, setWorkSelect] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState<any>(null);
  const [workField, setWorkField] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [phone, setPhone] = useState("");

  const handlePhotoURLOnChange = (url: any) => {
    setPhotoURL(url);
  };

  const role = workField ? "freelancer" : "client";

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setWorkSelect(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const clientSignupHandler = async (formdata: any) => {
    const { email, password } = formdata;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 사진을 스토리지에 업로드
      const userImage = await uploadUserImage(user?.id, photoURL);

      const newUserData = {
        userId: user?.id,
        name,
        role: role,
        photoURL,
        workField: { workField: workSelect, workSmallField: workField },
        workExp,
        contact: { email: user?.email, phone: phone },
      };

      await userJoinData(newUserData);
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setOpenClientJoin(false);
      reset();
      setName("");
      setWorkExp("");
      setPhone("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const userJoinData = async (newUserData: any) => {
    try {
      const { data, error } = await supabase.from("users").insert(newUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const nameOnChange = (e: any) => {
    setName(e.target.value);
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

  const clientJoinHandler = () => {
    setOpenClientJoin(true);
    setOpenFreelancer(false);
  };
  const freelancerJoinHandler = () => {
    setOpenClientJoin(true);
    setOpenFreelancer(true);
  };
  const cancel = () => {
    setOpenClientJoin(false);
  };

  return (
    <>
      <div>
        {/* <Stdiv>
          <Stbutton onClick={clientJoinHandler}>클라이언트</Stbutton>
          <Stbutton onClick={freelancerJoinHandler}>프리랜서</Stbutton>
        </Stdiv> */}
        {openClientJoin && (
          <form onSubmit={handleSubmit(clientSignupHandler)}>
            <h1>회원가입</h1>
            <div>
              <input
                type="text"
                defaultValue={email}
                placeholder="e-mail"
                {...register("email", {
                  value: email,
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
                defaultValue={password}
                placeholder="비밀번호"
                {...register("password", {
                  value: password,
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

              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={nameOnChange}
              />
              <ImagePreview
                photoURL={photoURL}
                photoURLOnChange={handlePhotoURLOnChange}
              />

              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "개발",
                    label: "개발",
                  },
                  {
                    value: "디자인",
                    label: "디자인",
                  },
                  {
                    value: "운영",
                    label: "운영",
                  },
                  {
                    value: "기획",
                    label: "기획",
                  },
                  {
                    value: "기타",
                    label: "기타",
                  },
                ]}
              />

              {openFreelancer && (
                <input
                  type="text"
                  value={workField}
                  onChange={workFieldOnChange}
                  placeholder="작업영역"
                />
              )}

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
              <button onClick={cancel}>취소</button>
            </div>
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
