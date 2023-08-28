import React, { useState } from "react";
import { S } from "./manageFreelancersByStatusStyle";
import Modal from "../../modal/Modal";
import { IUser } from "src/Types";
import PendingFreelancerInfoModal from "./PendingFreelancerInfoModal";
import { useUserStore } from "src/zustand/useUserStore";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";

const PendingFreelancerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const {
    pendingFreelancers,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    deletePendingFreelancerMutation,
  } = useProjectsQueries({
    currentUserId: userId,
  });

  const updateFreelancer = (userId: string, projectId: string, endDate: string) => {
    updateFreelancerApprovalMutation.mutate({ userId, projectId, endDate });
    deleteVolunteerAndPendingFreelancerMutation.mutate(projectId);
    alert("승인이 완료되었습니다.");
    setIsModalOpen(false);
  };

  const deletePendingFreelancer = (
    projectId: string,
    freelancerId: string,
    pendingFreelancer: string[]
  ) => {
    const updatePendingFreelancerData = pendingFreelancer.filter(
      (freelancer) => freelancer !== freelancerId
    );
    deletePendingFreelancerMutation.mutate({
      projectId,
      updatePendingFreelancer: updatePendingFreelancerData,
    });
    alert("프리랜서 거절이 완료되었습니다.");
    setIsModalOpen(false);
  };

  return (
    <>
      <S.ListContainer>
        <S.Title>보류했던 프리랜서들을 다시 확인해보세요.</S.Title>
        {Number(
          pendingFreelancers
            ?.map((project) => project.pendingFreelancerUser.length)
            .reduce((acc, cur) => acc + cur)
        ) === 0 ? (
          <S.DataStatus>보류한 프리랜서가 없습니다.</S.DataStatus>
        ) : (
          pendingFreelancers?.map((project) =>
            project.pendingFreelancerUser?.map((freelancer) => (
              <S.List key={freelancer.userId}>
                <S.ListContents>
                  <S.ImgBox>
                    <S.Img alt="profileImg" src={freelancer.photoURL}></S.Img>
                  </S.ImgBox>
                  <S.FreelancerName>{freelancer.name}</S.FreelancerName>
                  <S.ListProjectTitle key={project.projectId}>
                    <S.ProjectTitle>"{project.title}" 프로젝트에 지원</S.ProjectTitle>
                  </S.ListProjectTitle>
                </S.ListContents>
                <div>
                  <S.CheckingBtn
                    onClick={() => {
                      setSelectedFreelancer(freelancer);
                      setIsModalOpen(!isModalOpen);
                    }}
                  >
                    확인하기
                  </S.CheckingBtn>
                  {isModalOpen &&
                    selectedFreelancer &&
                    selectedFreelancer.userId === freelancer.userId && (
                      <Modal
                        setIsModalOpen={setIsModalOpen}
                        buttons={
                          <>
                            <S.Btn
                              onClick={() =>
                                updateFreelancer(
                                  freelancer.userId,
                                  project.projectId ?? "",
                                  project.date.endDate
                                )
                              }
                            >
                              계약하기
                            </S.Btn>
                            <S.Btn
                              onClick={() =>
                                deletePendingFreelancer(
                                  project.projectId || "",
                                  freelancer.userId,
                                  project.pendingFreelancer || []
                                )
                              }
                            >
                              거절하기
                            </S.Btn>
                          </>
                        }
                      >
                        <PendingFreelancerInfoModal user={freelancer} project={project} />
                      </Modal>
                    )}
                </div>
              </S.List>
            ))
          )
        )}
      </S.ListContainer>
    </>
  );
};

export default PendingFreelancerList;