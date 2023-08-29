import React, { useState } from "react";
import { S } from "./manageFreelancersByStatusStyle";
import Modal from "../../modal/Modal";
import { IUser } from "src/Types";
import ApplicantFreelancerInfoModal from "./ApplicantFreelancerInfoModal";
import { useUserStore } from "src/zustand/useUserStore";
import useClientsQueries from "src/hooks/useClientsQueries";
import useProjectsQueries from "src/hooks/useProjectsQueries";

const ApplicantFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries(userId);
  const {
    applicantFreelancers,
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    updatePendingFreelancerMutation,
  } = useProjectsQueries({
    currentUserId: userId,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  const updateFreelancer = (userId: string, projectId: string, endDate: string) => {
    updateFreelancerApprovalMutation.mutate({ userId, projectId, endDate });
    deleteVolunteerAndPendingFreelancerMutation.mutate(projectId);
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

  return (
    <>
      <S.ListContainer>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        {Number(
          applicantFreelancers
            ?.map((project) => project.volunteerUser.length)
            .reduce((acc, cur) => acc + cur)
        ) === 0 ? (
          <S.DataStatus>지원한 프리랜서가 없습니다.</S.DataStatus>
        ) : (
          applicantFreelancers?.map((project) =>
            project.volunteerUser?.map((freelancer) => (
              <S.List key={`${freelancer.userId}-${project.projectId}`}>
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
                                updatePendingFreelancer(
                                  project.projectId || "",
                                  project.volunteer || [],
                                  project.pendingFreelancer || [],
                                  freelancer.userId
                                )
                              }
                            >
                              보류하기
                            </S.Btn>
                          </>
                        }
                      >
                        <ApplicantFreelancerInfoModal user={freelancer} project={project} />
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

export default ApplicantFreelancerList;
