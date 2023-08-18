import React, { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "antd";

const Account = () => {
  // useStates
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedWorkField, setUpdatedWorkField] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedProjectId, setUpdatedProjectId] = useState("");

  /**
   * GET
   */
  const testUserId = "df509ff5-cdd4-4b3a-9d5f-a69395a882a6";
  const fetchProfile = async () => {
    let { data: users, error } = await supabase
      .from("users")
      .select("name, photoURL, contact, workField, projectId")
      .eq("role", "freelancer") // 굳이 없어도 될듯
      .eq("userId", testUserId);
    // .single();
    console.log(users);
    return users;
  };

  const { status, data: users } = useQuery(
    ["users", testUserId],
    fetchProfile,
    { enabled: !!testUserId }
  );
  const user = users && users[0]; // users가 없을 경우, get the first user

  /**
   * PATCH
   */
  // 이미지 제외 정보 업데이트
  const updateProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 업데이트 대상
    const updatedData = {
      name: updatedName,
      workField: updatedWorkField,
      contact: {
        email: updatedEmail,
        phone: updatedPhone,
      },
      projectId: updatedProjectId,
    };

    // 업데이트
    const { data, error } = await supabase
      .from("users")
      .update(updatedData)
      .eq("userId", testUserId)
      .select();
    console.log(data);

    // 입력창 비우고 모달 닫기
    setUpdatedName("");
    setUpdatedWorkField("");
    setUpdatedEmail("");
    setUpdatedPhone("");
    setUpdatedProjectId("");

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // 이미지 업데이트
  const updateProfileImg = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      {status === "loading" ? (
        "Loading..."
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
            onClick={() => {
              updateProfileImg;
            }}
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
          <button onClick={() => setOpen(true)}>프로필 수정하기</button>
          {/* ------------------Update modal-------------------------- */}
          <>
            <Modal
              title="개인정보 수정"
              open={open}
              onOk={updateProfile}
              onCancel={handleCancel}
            >
              <form>
                <label>
                  이름:
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </label>
                <label>
                  업무분야:
                  <input
                    type="text"
                    value={updatedWorkField}
                    onChange={(e) => setUpdatedWorkField(e.target.value)}
                  />
                </label>
                <label>
                  이메일:
                  <input
                    type="text"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                </label>
                <label>
                  전화번호:
                  <input
                    type="text"
                    value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)}
                  />
                </label>
                <label>
                  현재 진행중인 프로젝트:
                  <input
                    type="text"
                    value={updatedProjectId}
                    onChange={(e) => setUpdatedProjectId(e.target.value)}
                  />
                </label>
              </form>
            </Modal>
          </>
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
