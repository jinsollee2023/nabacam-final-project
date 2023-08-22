import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPendingFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "../applicantFreelancerList/applicantFreelancerListStyle";
import Modal from "../../modal/Modal";
import FreelancerPortfolio from "../../modal/freelancerInfo/FreelancerPortfolio";
import FreelancerResume from "../../modal/freelancerInfo/FreelancerResume";
import FreelancerProfile from "../../modal/freelancerInfo/FreelancerProfile";

const PendingFreelancerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: pendingFreelancers,
    isLoading: pendingFreelancersIsLoading,
    isError: pendingFreelancersIsError,
  } = useQuery(["users"], getPendingFreelancers);

  return (
    <>
      <div>
        <S.Title>보류한 프리랜서들을 확인해보세요.</S.Title>
        {pendingFreelancers ? (
          pendingFreelancers.map((pendingFreelancer) => (
            <S.List key={pendingFreelancer.userId}>
              <S.ListContents>
                <S.ImgBox>
                  <S.Img alt="profileImg" src={pendingFreelancer.photoURL}></S.Img>
                </S.ImgBox>
                <span style={{ width: "80px", textAlign: "left" }}>{pendingFreelancer.name}</span>
                <div
                  style={{
                    width: "80%",
                  }}
                  key={pendingFreelancer.projectId}
                >
                  <S.ProjectTitle>"{pendingFreelancer.title}" 프로젝트에 지원</S.ProjectTitle>
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
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    buttons={
                      <>
                        <S.Btn>제안하기</S.Btn>
                        <S.Btn>보류하기</S.Btn>
                      </>
                    }
                  >
                    <S.ModalTitle>{pendingFreelancer.title} 프로젝트에 지원</S.ModalTitle>
                    <FreelancerProfile user={pendingFreelancer} />
                    <div style={{ color: "gray", fontSize: "14px" }}>
                      <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <p>목표 기간</p>
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              width: "90%",
                              height: "28px",
                              borderRadius: "10px",
                            }}
                          ></div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <p>급여</p>
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              width: "90%",
                              height: "28px",
                              borderRadius: "10px",
                            }}
                          ></div>
                        </div>
                      </div>
                      <p style={{ marginTop: "10px" }}>수정 이유</p>
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          width: "100%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </div>
                    <div>
                      <FreelancerResume user={pendingFreelancer} />
                      <FreelancerPortfolio user={pendingFreelancer} />
                    </div>
                  </Modal>
                )}
              </div>
            </S.List>
          ))
        ) : pendingFreelancersIsLoading ? (
          <div>Loading pending freelancerList...</div>
        ) : pendingFreelancersIsError ? (
          <div>보류한 프리랜서 데이터를 불러오지 못했습니다.</div>
        ) : null}
      </div>
    </>
  );
};

export default PendingFreelancerList;
