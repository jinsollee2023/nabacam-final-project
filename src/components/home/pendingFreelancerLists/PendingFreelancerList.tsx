import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPendingFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "../applicantFreelancerList/applicantFreelancerListStyle";
import Modal from "../../modal/Modal";
import FreelancerPortfolio from "../../modal/freelancerInfo/FreelancerPortfolio";
import FreelancerResume from "../../modal/freelancerInfo/FreelancerResume";
import FreelancerProfile from "../../modal/freelancerInfo/FreelancerProfile";
import { IUser } from "src/Types";

const PendingFreelancerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

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
                <S.FreelancerName>{pendingFreelancer.name}</S.FreelancerName>
                <S.ListProjectTitle key={pendingFreelancer.projectId}>
                  <S.ProjectTitle>"{pendingFreelancer.title}" 프로젝트에 지원</S.ProjectTitle>
                </S.ListProjectTitle>
              </S.ListContents>
              <div>
                <button
                  onClick={() => {
                    setSelectedFreelancer(pendingFreelancer);
                    setIsModalOpen(!isModalOpen);
                  }}
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
                {isModalOpen &&
                  selectedFreelancer &&
                  selectedFreelancer.userId === pendingFreelancer.userId && (
                    <Modal
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      buttons={
                        <>
                          <S.Btn>제안하기</S.Btn>
                          <S.Btn>거절하기</S.Btn>
                        </>
                      }
                    >
                      <S.ModalTitle>{pendingFreelancer.title} 프로젝트에 지원</S.ModalTitle>
                      <FreelancerProfile user={pendingFreelancer} />
                      <div style={{ color: "gray", fontSize: "14px" }}>
                        <div style={{ display: "flex", width: "100%", marginTop: "10px" }}>
                          <div style={{ width: "100%" }}>
                            <p>목표 기간</p>
                            <div
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                width: "90%",
                                height: "50px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontSize: "16px" }}>
                                {pendingFreelancer.deadLine.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div style={{ width: "100%" }}>
                            <p>급여</p>
                            <div
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                width: "90%",
                                height: "50px",
                                borderRadius: "10px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  position: "absolute",
                                  left: "50%",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                <span>최소 : {pendingFreelancer.pay.min}만원</span>
                                <span>최대 : {pendingFreelancer.pay.max}만원</span>
                              </div>
                            </div>
                          </div>
                        </div>
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
