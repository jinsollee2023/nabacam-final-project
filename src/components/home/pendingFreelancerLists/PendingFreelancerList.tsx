import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPendingFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "../applicantFreelancerList/applicantFreelancerListStyle";
import Modal from "../../modal/Modal";
import { IUser } from "src/Types";
import PendingFreelancerInfoModal from "./PendingFreelancerInfoModal";
import supabase from "src/config/supabaseClient";
import { queryClient } from "src/App";

const PendingFreelancerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  const {
    data: pendingFreelancers,
    isLoading: pendingFreelancersIsLoading,
    isError: pendingFreelancersIsError,
  } = useQuery(["users"], getPendingFreelancers);

  if (pendingFreelancersIsLoading) {
    return <S.DataStatus>Loading pending freelancer list...</S.DataStatus>;
  }

  if (pendingFreelancersIsError) {
    return <S.DataStatus>Failed to load pending freelancer list.</S.DataStatus>;
  }

  const freelancerApproval = async (freelancer: IUser) => {
    try {
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("pendingFreelancer, freelancerId, status, volunteer")
        .match({ projectId: freelancer.projectId })
        .limit(1)
        .single();

      // console.log(projectData);

      if (projectError) {
        console.error("프로젝트 정보 가져오기 오류", projectError);
        alert("프리랜서 승인에 실패하였습니다.");
        setIsModalOpen(false);
        return;
      }

      // const updatedPendingFreelancerList = projectData.pendingFreelancer.filter(
      //   (id: string) => id !== freelancer.userId
      // );

      // 프로젝트 데이터 업데이트
      const { error: updateError } = await supabase
        .from("projects")
        .update({
          // pendingFreelancer: updatedPendingFreelancerList.length
          //   ? updatedPendingFreelancerList
          //   : null,
          pendingFreelancer: null,
          volunteer: null,
          freelancerId: freelancer.userId,
          status: "진행중",
        })
        .match({ projectId: freelancer.projectId });

      if (updateError) {
        console.error("프로젝트 업데이트 오류:", updateError);
        return;
      }

      // 성공 시 알림 메시지 표시 및 모달 닫기
      alert("프리랜서 승인이 완료되었습니다.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("프리랜서 승인 처리 중 오류 발생:", error);
    }
  };

  return (
    <>
      <S.Title>보류한 프리랜서들을 확인해보세요.</S.Title>
      <S.ListContainer>
        {pendingFreelancers === null || pendingFreelancers.length === 0 ? (
          <S.DataStatus>보류한 프리랜서가 없습니다.</S.DataStatus>
        ) : (
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
                <S.CheckingBtn
                  onClick={() => {
                    setSelectedFreelancer(pendingFreelancer);
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  확인하기
                </S.CheckingBtn>
                {isModalOpen &&
                  selectedFreelancer &&
                  selectedFreelancer.userId === pendingFreelancer.userId && (
                    <Modal
                      setIsModalOpen={setIsModalOpen}
                      buttons={
                        <>
                          <S.Btn onClick={() => freelancerApproval(pendingFreelancer)}>
                            승인하기
                          </S.Btn>
                          <S.Btn>거절하기</S.Btn>
                        </>
                      }
                    >
                      <PendingFreelancerInfoModal user={pendingFreelancer} />
                    </Modal>
                  )}
              </div>
            </S.List>
          ))
        )}
      </S.ListContainer>
    </>
  );
};

export default PendingFreelancerList;
