import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getApplicantFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "./applicantFreelancerListStyle";
import { TbArrowsUpDown } from "react-icons/tb";
import Modal from "../../modal/Modal";
import FreelancerPortfolio from "../../modal/freelancerInfo/FreelancerPortfolio";
import FreelancerResume from "../../modal/freelancerInfo/FreelancerResume";
import FreelancerProfile from "../../modal/freelancerInfo/FreelancerProfile";

const ApplicantFreelancerList = () => {
  const {
    data: applicantFreelancers,
    isLoading: applicantFreelancersIsLoading,
    isError: applicantFreelancersIsError,
  } = useQuery(["users"], getApplicantFreelancers);

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
                  <S.Img alt="profileImg" src={applicantFreelancer.photoURL}></S.Img>
                </S.ImgBox>
                <span style={{ width: "80px", textAlign: "left" }}>{applicantFreelancer.name}</span>
                <span style={{ width: "150px", textAlign: "left", color: "gray" }}>
                  #스타트업 개발자
                </span>
                <div
                  style={{
                    width: "70%",
                  }}
                  key={applicantFreelancer.projectId}
                >
                  <S.ProjectTitle>"{applicantFreelancer.title}" 프로젝트에 지원</S.ProjectTitle>
                </div>
              </S.ListContents>
              <div>
                <Modal
                  triggerButtonLabel="확인하기"
                  triggerButtonStyle={{
                    backgroundColor: "#1FC17D",
                    color: "white",
                    border: "none",
                    width: "100px",
                    height: "30px",
                    borderRadius: "8px",
                    float: "right",
                    marginRight: "10px",
                  }}
                  buttons={
                    <>
                      <S.Btn>제안하기</S.Btn>
                      <S.Btn onClick={() => alert("test")}>보류하기</S.Btn>
                    </>
                  }
                >
                  <S.ModalTitle>{applicantFreelancer.title} 프로젝트에 지원</S.ModalTitle>
                  <FreelancerProfile user={applicantFreelancer} />
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
                    <FreelancerResume user={applicantFreelancer} />
                    <FreelancerPortfolio user={applicantFreelancer} />
                  </div>
                </Modal>
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
