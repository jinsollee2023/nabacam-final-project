import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getApplicantFreelancers,
  getPendingFreelancers,
} from "../../../api/ApplicantFreelancerList";
import { S } from "./applicantFreelancerListStyle";
import Modal from "../../modal/Modal";
import { IUser } from "src/Types";
import supabase from "src/config/supabaseClient";
import { queryClient } from "src/App";
import ApplicantFreelancerInfoModal from "./ApplicantFreelancerInfoModal";

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
      <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
      <S.ListContainer>
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
                <S.CheckingBtn
                  onClick={() => {
                    setSelectedFreelancer(applicantFreelancer);
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  확인하기
                </S.CheckingBtn>
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
                      <ApplicantFreelancerInfoModal user={applicantFreelancer} />
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
      </S.ListContainer>
    </>
  );
};

export default ApplicantFreelancerList;
