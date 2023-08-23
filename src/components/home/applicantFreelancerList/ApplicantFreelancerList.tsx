import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getApplicantFreelancers,
  getPendingFreelancers,
} from "../../../api/ApplicantFreelancerList";
import { S } from "./applicantFreelancerListStyle";
import Modal from "../../modal/Modal";
import FreelancerPortfolio from "../../modal/freelancerInfo/FreelancerPortfolio";
import FreelancerResume from "../../modal/freelancerInfo/FreelancerResume";
import FreelancerProfile from "../../modal/freelancerInfo/FreelancerProfile";
import { IUser } from "src/Types";
import supabase from "src/config/supabaseClient";
import { queryClient } from "src/App";

const ApplicantFreelancerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  const {
    data: applicantFreelancers,
    isLoading: applicantFreelancersIsLoading,
    isError: applicantFreelancersIsError,
  } = useQuery(["users"], getApplicantFreelancers);

  const updatePendingFreelancer = async (freelancer: IUser) => {
    try {
      const { data: updatePendingFreelancerData, error: updatePendingFreelancersError } =
        await supabase
          .from("projects")
          .select("volunteer, pendingFreelancer")
          .match({ projectId: freelancer.projectId })
          .single();

      if (updatePendingFreelancersError) {
        console.error("보류한 프리랜서 정보 가져오기 오류", updatePendingFreelancersError);
        // 오류 발생 시 알림 메시지 표시 및 모달 닫기
        alert("보류한 프리랜서로 이동하지 못했습니다.");
        setIsModalOpen(false);
        return;
      }

      // volunteer에서 해당 프리랜서 제거
      const volunteerList = updatePendingFreelancerData.volunteer || [];
      const updatedVolunteerList = volunteerList.filter((id: string) => id !== freelancer.userId);

      // 현재 보류한 프리랜서 목록 가져오기
      const pendingFreelancers = updatePendingFreelancerData.pendingFreelancer || [];
      const updatedPendingFreelancers = [...pendingFreelancers, freelancer.userId];

      // 프로젝트 데이터 업데이트
      const { error: updateError } = await supabase
        .from("projects")
        .update({
          volunteer: updatedVolunteerList,
          pendingFreelancer: updatedPendingFreelancers,
        })
        .match({ projectId: freelancer.projectId });

      if (updateError) {
        console.error("프로젝트 업데이트 오류:", updateError);
        return;
      }

      // React Query의 queryClient 사용하여 데이터 갱신
      const updatedPendingFreelancerList = await getPendingFreelancers();
      queryClient.setQueryData(["pendingFreelancers"], updatedPendingFreelancerList);

      // 성공 시 알림 메시지 표시 및 모달 닫기
      alert("보류한 프리랜서로 이동되었습니다.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("보류한 프리랜서 처리 중 오류 발생:", error);
    }
  };

  return (
    <>
      <div>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>

        {applicantFreelancers ? (
          applicantFreelancers.map((applicantFreelancer) => (
            <S.List key={applicantFreelancer.userId}>
              <S.ListContents>
                <S.ImgBox>
                  <S.Img alt="profileImg" src={applicantFreelancer.photoURL}></S.Img>
                </S.ImgBox>
                <S.FreelancerName>{applicantFreelancer.name}</S.FreelancerName>
                <S.ListProjectTitle key={applicantFreelancer.projectId}>
                  <S.ProjectTitle>"{applicantFreelancer.title}" 프로젝트에 지원</S.ProjectTitle>
                </S.ListProjectTitle>
              </S.ListContents>
              <div>
                <button
                  onClick={() => {
                    setSelectedFreelancer(applicantFreelancer);
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
                  selectedFreelancer.userId === applicantFreelancer.userId && (
                    <Modal
                      setIsModalOpen={setIsModalOpen}
                      buttons={
                        <>
                          <S.Btn>제안하기</S.Btn>
                          <S.Btn onClick={() => updatePendingFreelancer(applicantFreelancer)}>
                            보류하기
                          </S.Btn>
                        </>
                      }
                    >
                      <S.ModalTitle>{applicantFreelancer.title} 프로젝트에 지원</S.ModalTitle>
                      <FreelancerProfile user={applicantFreelancer} />
                      <div style={{ color: "gray", fontSize: "14px" }}>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            marginTop: "10px",
                          }}
                        >
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
                                {applicantFreelancer.deadLine?.toLocaleString()}
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
                                <span>최소 : {applicantFreelancer.pay?.min}만원</span>
                                <span>최대 : {applicantFreelancer.pay?.max}만원</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <FreelancerResume user={applicantFreelancer} />
                        <FreelancerPortfolio user={applicantFreelancer} />
                      </div>
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
