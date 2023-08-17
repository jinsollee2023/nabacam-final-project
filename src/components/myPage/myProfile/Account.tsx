import React, { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Account = () => {
  /**
   * 나중에 API파일로 빼기
   */
  const fetchProfile = async () => {
    let { data: users, error } = await supabase
      .from("users")
      .select("name, photoURL, contact, workField, projectId")
      .eq("role", "freelancer")
      .eq("userId", "df509ff5-cdd4-4b3a-9d5f-a69395a882a6");
    // .single();
    console.log(users);
    return users;
  };

  const testUserId = "df509ff5-cdd4-4b3a-9d5f-a69395a882a6";
  const { status, data: users } = useQuery(
    ["users", testUserId],
    fetchProfile,
    { enabled: !!testUserId }
  );
  const user = users && users[0]; // users가 없을 경우, get the first user

  return (
    <>
      {status === "loading" ? (
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
            src={user?.photoURL || ""}
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
            <h1>이름: {user?.name}</h1>
            <S.Info>직무: {user?.workField}</S.Info>
            <S.Info>현재 진행중인 프로젝트: {user?.projectId}</S.Info>
          </div>
          <div
            style={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>연락망</h1>
            <S.Info>전화번호: {user?.contact.phone}</S.Info>
            <S.Info>이메일: {user?.contact.email}</S.Info>
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
