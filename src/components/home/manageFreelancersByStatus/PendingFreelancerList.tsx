import React, { useState } from "react";
import { S } from "./manageFreelancersByStatusStyle";
import Modal from "../../modal/Modal";
import { IUser } from "../../../Types";
import PendingFreelancerInfoModal from "./PendingFreelancerInfoModal";
import { useUserStore } from "../../../zustand/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";

const PendingFreelancerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const {
    pendingFreelancers,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    deletePendingFreelancerMutation,
    addProjectIdToUserMutation,
  } = useProjectsQueries({
    currentUserId: userId,
  });

  const updateFreelancer = (
    userId: string,
    projectId: string,
    endDate: string,
    projectIds: string[],
    volunteer: string[],
    pendingFreelancer: string[]
  ) => {
    const customProjectIds = projectIds.concat(projectId);
    const customPendingFreelancers = pendingFreelancer.filter((v) => v !== userId);
    updateFreelancerApprovalMutation.mutate({ userId, projectId, endDate });
    deleteVolunteerAndPendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: volunteer,
      updatePendingFreelancer: customPendingFreelancers,
    });
    addProjectIdToUserMutation.mutate({ userId, projectIds: customProjectIds });
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

  if (!pendingFreelancers || pendingFreelancers.length === 0) {
    return <S.DataStatus>보류한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <>
      <S.ListContainer>
        <S.Title>보류했던 프리랜서들을 다시 확인해보세요.</S.Title>
        {pendingFreelancers.map((project) =>
          project.pendingFreelancerUser?.map((freelancer) => (
            <S.List key={`${project.projectId}-${freelancer.userId}`}>
              <S.ListContents>
                {project.freelancerId ? (
                  <S.RecruitmentCompleted>모집완료</S.RecruitmentCompleted>
                ) : (
                  <S.Recruiting>모집중</S.Recruiting>
                )}
                <S.FreelancerName>{freelancer.name}</S.FreelancerName>
                <span>{freelancer.workField?.workField}</span>
                <S.WorkFieldAndWorkExp>
                  {freelancer.workField?.workSmallField}
                </S.WorkFieldAndWorkExp>
                <S.WorkFieldAndWorkExp>{freelancer.workExp}년차</S.WorkFieldAndWorkExp>
              </S.ListContents>
              <S.ProjectContents>
                <div key={project.projectId}>
                  <S.ProjectTitle>{project.title} 프로젝트에 지원</S.ProjectTitle>
                </div>

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
                          {project.freelancerId ? (
                            <S.DisabledBtn disabled>모집이 완료된 프로젝트입니다.</S.DisabledBtn>
                          ) : (
                            <>
                              <S.ContractBtn
                                onClick={() =>
                                  updateFreelancer(
                                    freelancer.userId,
                                    project.projectId ?? "",
                                    project.date?.endDate as string,
                                    freelancer.projectId || [],
                                    project.volunteer || [],
                                    project.pendingFreelancer || []
                                  )
                                }
                              >
                                계약하기
                              </S.ContractBtn>
                              <S.PendingBtn
                                onClick={() =>
                                  deletePendingFreelancer(
                                    project.projectId || "",
                                    freelancer.userId,
                                    project.pendingFreelancer || []
                                  )
                                }
                              >
                                삭제하기
                              </S.PendingBtn>
                            </>
                          )}
                        </>
                      }
                    >
                      <PendingFreelancerInfoModal user={freelancer} project={project} />
                    </Modal>
                  )}
              </S.ProjectContents>
            </S.List>
          ))
        )}
      </S.ListContainer>
    </>
  );
};

export default PendingFreelancerList;
