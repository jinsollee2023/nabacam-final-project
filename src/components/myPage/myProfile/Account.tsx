import React, { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";

const Account = () => {
  // useStates
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [userphone, setUserphone] = useState(null);
  const [userworkField, setUserworkField] = useState(null);
  const [userprojectId, setUserprojectId] = useState(null);
  const [profileImgURL, setProfileImgURL] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);
  //
  const getProfile = async () => {
    try {
      setLoading(true);
      // const data = await supabase.auth.getUser();
      // console.log(data);

      let { data: users, error } = await supabase
        .from("users")
        .select("name, photoURL, contact, workField, projectId")
        .eq("role", "freelancer")
        .eq("userId", "df509ff5-cdd4-4b3a-9d5f-a69395a882a6");
      // .single();

      console.log(users);

      if (users) {
        setUsername(users[0].name);
        setProfileImgURL(users[0].photoURL);
        setUseremail(users[0].contact.email);
        setUserphone(users[0].contact.phone);
        setUserworkField(users[0].workField);
        setUserprojectId(users[0].projectId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //
  // const updateProfile = async (event: any) => {
  //   try {
  //     if (!event?.target.files || event.target.files.length === 0) {
  //       alert("이미지를 업로드해주세요!");
  //       return false;
  //     }

  //     const file = event?.target.files[0];
  //     const fileExt = file.name.split(".").pop();
  //     const fileName = `${Math.random()}.${fileExt}`;
  //     const filePath = `${fileName}`;

  //     const response = await supabase.storage
  //       .from("portfolios")
  //       .upload(filePath, file);
  //   } catch (err) {}
  // };
  return (
    <>
      {loading ? (
        "Saving..."
      ) : (
        <section
          style={{
            display: "flex",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f8f5ed",
            border: "solid blue",
          }}
        >
          <img
            src={profileImgURL || ""}
            alt="img"
            width="40px"
            height="40px"
            style={{ marginLeft: "10px" }}
          />
          <div
            style={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>이름: {username}</h1>
            <S.Info>직무: {userworkField}</S.Info>
            <S.Info>현재 진행중인 프로젝트: {userprojectId}</S.Info>
          </div>
          <div
            style={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>연락망</h1>
            <S.Info>전화번호: {userphone}</S.Info>
            <S.Info>이메일: {useremail}</S.Info>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;

const S = {
  Info: styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.583);
    margin-top: 5px;
  `,
};
