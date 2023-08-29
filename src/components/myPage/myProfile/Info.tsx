import React, { useEffect, useState } from "react";
import EditForm from "./EditForm";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFreelancer } from "src/api/User";

const Info = () => {
  // 상태관리
  const [open, setOpen] = useState<boolean>(false);
  const { userId, user } = useUserStore();

  // GET
  // const { data: user } = useQuery(
  //   ["users", userId],
  //   () => getFreelancer(userId),
  //   {
  //     enabled: !!userId,
  //   }
  // );

  return (
    <>
      <div
        style={{
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>{user && user?.name}님</h1>
        <S.Info>직무분야: {user && user?.workField?.workField}</S.Info>
        <S.Info>세부분야: {user && user?.workField?.workSmallField}</S.Info>
        {/* <S.Info>현재 진행중인 프로젝트: {users && users[0]?.projectId}</S.Info> */}
      </div>
      <div
        style={{
          marginLeft: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>연락망</h1>
        <S.Info>전화번호: {user && user?.contact?.phone}</S.Info>
        <S.Info>이메일: {user && user?.contact?.email}</S.Info>
      </div>
      <S.Btn onClick={() => setOpen(true)}>프로필 수정하기</S.Btn>
      <EditForm open={open} setOpen={setOpen} user={user} />
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
  Btn: styled.button`
    background-color: #1fc17d;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #168c68;
    }
    margin-left: 60px;
  `,
};
