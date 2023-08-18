import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApplicantFreelancers } from "../../api/ApplicantFreelancerLists";
import { User } from "../../Types";
import ApplicantResumeModal from "./ApplicantResumeModal";
import { styled } from "styled-components";

const ApplicantFreelancerLists = () => {
  const [showData, setShowData] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // const { data: users, isLoading, isError } = useQuery<User[]>(["users"], getApplicantFreelancers);
  const { data: users, isLoading, isError } = useQuery(["users"], getApplicantFreelancers);

  const handleShowData = () => {
    setShowData(true);
  };

  // 프리랜서를 선택하면 해당 프리랜서 정보를 상태로 저장
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  // 모달을 닫으면, 선택한 프리랜서 정보 초기화
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <S.TapBtn onClick={handleShowData}>지원한 프리랜서 보기</S.TapBtn>
      {showData && (
        <div>
          {users ? (
            users.map((user: User) => (
              <S.List key={user.userId}>
                <S.ListContents>
                  <S.ImgBox>
                    <S.Img alt="이미지 준비중" src={user.photoURL}></S.Img>
                  </S.ImgBox>

                  <div>{user.name}</div>
                </S.ListContents>
                <S.BtnBox>
                  <S.CheckingBtn onClick={() => handleSelectUser(user)}>확인하기</S.CheckingBtn>
                </S.BtnBox>
              </S.List>
            ))
          ) : isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>데이터를 불러오지 못했습니다.</div>
          ) : null}
          {selectedUser && <ApplicantResumeModal user={selectedUser} onClose={handleCloseModal} />}
        </div>
      )}
    </>
  );
};

export default ApplicantFreelancerLists;

const S = {
  TapBtn: styled.button`
    cursor: pointer;
    background: transparent;
    border: none;
  `,
  List: styled.div`
    width: 70%;
    border: 1px solid gray;
    display: flex;
    gap: 10px;
    align-items: center;
  `,
  ListContents: styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    text-align: center;
  `,
  ImgBox: styled.div`
    width: 35px;
    height: 35px;
    border-radius: 100%;
    overflow: hidden;
    margin-left: 10px;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  BtnBox: styled.div`
    width: 100%;
  `,
  CheckingBtn: styled.button`
    float: right;
    margin-right: 10px;
  `,
};
