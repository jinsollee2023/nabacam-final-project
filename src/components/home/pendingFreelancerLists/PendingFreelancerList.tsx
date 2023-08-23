import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPendingFreelancers } from "../../../api/ApplicantFreelancerList";
import { S } from "../applicantFreelancerList/applicantFreelancerListStyle";
import Modal from "../../modal/Modal";
import { IUser } from "src/Types";
import PendingFreelancerInfoModal from "./PendingFreelancerInfoModal";

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
                          <S.Btn>승인하기</S.Btn>
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
