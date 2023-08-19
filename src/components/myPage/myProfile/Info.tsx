import React, { useState } from "react";
import EditForm from "./EditForm";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoggedInFreelancer } from "src/api/User";

const Info = () => {
  //hooks
  const queryClient = useQueryClient();

  // 상태관리
  const [open, setOpen] = useState<boolean>(false);
  const { userId } = useUserStore();

  // GET
  const { status, data: users } = useQuery(
    ["users", userId],
    () => getLoggedInFreelancer(userId),
    {
      enabled: !!userId,
    }
  );
  console.log(users);

  return (
    <>
      <div
        style={{
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>{users && users[0]?.name}님 안녕하세요!</h1>
        <S.Info>직무: {users && users[0]?.workField}</S.Info>
        <S.Info>현재 진행중인 프로젝트: {users && users[0]?.projectId}</S.Info>
      </div>
      <div
        style={{
          marginLeft: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>연락망</h1>
        <S.Info>전화번호: {users && users[0]?.contact.phone}</S.Info>
        <S.Info>이메일: {users && users[0]?.contact.email}</S.Info>
      </div>
      <button onClick={() => setOpen(true)}>프로필 수정하기</button>
      <EditForm open={open} setOpen={setOpen} />
    </>
  );
};

export default Info;

const S = {
  Info: styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.583);
    margin-top: 5px;
  `,
};
