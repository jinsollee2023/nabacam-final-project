import React, { useState } from "react";
import { S } from "./manageFreelancersByStatusStyle";
import Modal from "../../modal/Modal";
import { IUser } from "../../../Types";
import ApplicantFreelancerInfoModal from "./ApplicantFreelancerInfoModal";
import { useUserStore } from "../../../zustand/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";

const ApplicantFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const {
    applicantFreelancers,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    updatePendingFreelancerMutation,
    addProjectIdToUserMutation,
  } = useProjectsQueries({
    currentUserId: userId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  const updateFreelancer = (
    userId: string,
    projectId: string,
    endDate: string,
    projectIds: string[],
    volunteer: string[],
    pendingFreelancer: string[]
  ) => {
    const customProjectIds = projectIds.concat(projectId);
    const customVolunteers = volunteer.filter((v) => v !== userId);
    updateFreelancerApprovalMutation.mutate({
      userId,
      projectId,
      endDate,
    });
    deleteVolunteerAndPendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: customVolunteers,
      updatePendingFreelancer: pendingFreelancer,
    });
    addProjectIdToUserMutation.mutate({ userId, projectIds: customProjectIds });
    alert("승인이 완료되었습니다.");
    setIsModalOpen(false);
  };

  const updatePendingFreelancer = (
    projectId: string,
    volunteer: string[],
    pendingFreelancer: string[],
    freelancerId: string
  ) => {
    const updateVolunteerData = volunteer.filter((user) => user !== freelancerId);
    const updatePendingFreelancerData = pendingFreelancer.concat(freelancerId);
    updatePendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: updateVolunteerData,
      pendingFreelancer: updatePendingFreelancerData,
    });
    alert("보류 처리가 완료되었습니다.");
    setIsModalOpen(false);
  };

  if (!applicantFreelancers || applicantFreelancers.length === 0) {
    return <S.DataStatus>지원한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <>
      <S.ListContainer>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        {applicantFreelancers.map((project) =>
          project.volunteerUser?.map((freelancer) => (
            <S.List key={`${freelancer.userId}-${project.projectId}`}>
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
                                  updatePendingFreelancer(
                                    project.projectId || "",
                                    project.volunteer || [],
                                    project.pendingFreelancer || [],
                                    freelancer.userId
                                  )
                                }
                              >
                                보류하기
                              </S.PendingBtn>
                            </>
                          )}
                        </>
                      }
                    >
                      <ApplicantFreelancerInfoModal user={freelancer} project={project} />
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

export default ApplicantFreelancerList;
