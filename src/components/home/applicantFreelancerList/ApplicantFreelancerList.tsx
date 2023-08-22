import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IUser } from "../../../Types";
import { getApplicantFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "./applicantFreelancerListStyle";
import { TbArrowsUpDown } from "react-icons/tb";
import ApplicantResumeModal from "./ApplicantResumeModal";
import Modal from "../../modal/Modal";

const ApplicantFreelancerList = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: applicantFreelancers,
    isLoading: applicantFreelancersIsLoading,
    isError: applicantFreelancersIsError,
  } = useQuery(["users"], getApplicantFreelancers);

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
                  <S.Img
                    alt="profileImg"
                    src={applicantFreelancer.photoURL}
                  ></S.Img>
                </S.ImgBox>
                <span style={{ width: "80px", textAlign: "left" }}>
                  {applicantFreelancer.name}
                </span>
                <div
                  style={{
                    width: "80%",
                  }}
                  key={applicantFreelancer.projectId}
                >
                  <S.ProjectTitle>
                    "{applicantFreelancer.title}" 프로젝트에 지원
                  </S.ProjectTitle>
                </div>
              </S.ListContents>
              <div>
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  style={{
                    backgroundColor: "#1FC17D",
                    color: "white",
                    border: "none",
                    width: "100px",
                    height: "30px",
                    borderRadius: "8px",
                    float: "right",
                    marginRight: "10px",
                  }}
                >
                  확인하기
                </button>
                {isModalOpen && (
                  <Modal
                    setIsModalOpen={setIsModalOpen}
                    buttons={
                      <>
                        <S.Btn>제안하기</S.Btn>
                        <S.Btn>보류하기</S.Btn>
                      </>
                    }
                  >
                    <ApplicantResumeModal
                      user={applicantFreelancer}
                      onClose={handleCloseModal}
                    />
                  </Modal>
                )}
              </div>
            </S.List>
          ))
        ) : applicantFreelancersIsLoading ? (
          <div>Loading applicant freelancerList...</div>
        ) : applicantFreelancersIsError ? (
          <div>지원한 프리랜서 데이터를 불러오지 못했습니다.</div>
        ) : null}
      </div>
    </>
  );
};

export default ApplicantFreelancerList;
