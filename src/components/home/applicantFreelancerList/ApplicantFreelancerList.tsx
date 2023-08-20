import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IUser } from "../../../Types";
import { getApplicantFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "./applicantFreelancerListStyle";
import { TbArrowsUpDown } from "react-icons/tb";
import ApplicantResumeModal from "./ApplicantResumeModal";

const ApplicantFreelancerList = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const {
    data: applicantFreelancers,
    isLoading: applicantFreelancersIsLoading,
    isError: applicantFreelancersIsError,
  } = useQuery(["users"], getApplicantFreelancers);

  // 프리랜서를 선택하면 해당 프리랜서 정보를 상태로 저장
  const handleSelectUser = (user: IUser) => {
    setSelectedUser(user);
  };

  // 모달을 닫으면, 선택한 프리랜서 정보 초기화
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <div>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        <div style={{ width: "100%" }}>
          <S.FilterBtn>
            최신순 <TbArrowsUpDown />
          </S.FilterBtn>
        </div>
        {applicantFreelancers ? (
          applicantFreelancers.map((applicantFreelancer) => (
            <S.List key={applicantFreelancer.userId}>
              <S.ListContents>
                <S.ImgBox>
                  <S.Img alt="이미지 준비중" src={applicantFreelancer.photoURL}></S.Img>
                </S.ImgBox>
                <span>{applicantFreelancer.name}</span>
                <div key={applicantFreelancer.projectId}>
                  <S.ProjectTitle>"{applicantFreelancer.title}" 프로젝트에 지원</S.ProjectTitle>
                </div>
              </S.ListContents>
              <S.BtnBox>
                <S.CheckingBtn onClick={() => handleSelectUser(applicantFreelancer)}>
                  확인하기
                </S.CheckingBtn>
              </S.BtnBox>
            </S.List>
          ))
        ) : applicantFreelancersIsLoading ? (
          <div>Loading applicant freelancerList...</div>
        ) : applicantFreelancersIsError ? (
          <div>지원한 프리렌서 데이터를 불러오지 못했습니다.</div>
        ) : null}
        {selectedUser && <ApplicantResumeModal user={selectedUser} onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default ApplicantFreelancerList;
