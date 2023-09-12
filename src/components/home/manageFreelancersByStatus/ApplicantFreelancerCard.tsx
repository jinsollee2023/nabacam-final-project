import React, { useState } from "react";
import { S } from "./manageFreelancersByStatus.style";
import Modal from "../../modal/Modal";
import { IUser, Project } from "../../../Types";
import ApplicantFreelancerInfoModal from "./ApplicantFreelancerInfoModal";
import { useUserStore } from "src/store/useUserStore";
import { toast } from "react-toastify";
import useProjectOfClientBySortQueries from "src/hooks/queries/useProjectOfClientBySortQueries";

interface ApplicantFreelancerCardProps {
  project: Project;
  freelancer: IUser;
}

const ApplicantFreelancerCard = ({
  project,
  freelancer,
}: ApplicantFreelancerCardProps) => {
  const { userId } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(
    null
  );
  const {
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    addProjectIdToUserMutation,
    updatePendingFreelancerMutation,
  } = useProjectOfClientBySortQueries({
    currentUserId: userId,
  });

  // 지원한 프리랜서 목록 업데이트
  // 지원한 프리랜서 목록 -> 상세 모달 -> 계약 버튼 클릭 시
  const updateApplicantFreelancers = (
    userId: string,
    projectId: string,
    endDate: string,
    projectIds: string[],
    volunteer: string[],
    pendingFreelancer: string[]
  ) => {
    // 계약 시 프로젝트 아이디를 넣어주기 위해 생성
    const customProjectIds = projectIds.concat(projectId);
    // 계약 시 계약된 프리랜서는 목록에서 지워주기 위해 생성
    const customVolunteers = volunteer.filter((v) => v !== userId);
    updateFreelancerApprovalMutation.mutate({ userId, projectId, endDate });
    deleteVolunteerAndPendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: customVolunteers,
      updatePendingFreelancer: pendingFreelancer,
    });
    addProjectIdToUserMutation.mutate({ userId, projectIds: customProjectIds });
    toast.success("계약이 완료되었습니다.");
    setIsModalOpen(false);
  };

  // 보류한 프리랜서 목록 업데이트
  // 지원한 프리랜서 목록 -> 상세 모달 -> 보류 버튼 클릭 시
  const updatePendingFreelancer = (
    projectId: string,
    volunteer: string[],
    pendingFreelancer: string[],
    freelancerId: string
  ) => {
    // 보류 시 지원한 프리랜서 목록에서 지워주기 위해 생성
    const updateVolunteerData = volunteer.filter(
      (user) => user !== freelancerId
    );
    // 보류한 목록 데이터 업데이트 위해 생성
    const updatePendingFreelancerData = pendingFreelancer.concat(freelancerId);
    updatePendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: updateVolunteerData,
      pendingFreelancer: updatePendingFreelancerData,
    });
    toast.success("보류 처리가 완료되었습니다.");
    setIsModalOpen(false);
  };

  return (
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
                    <S.DisabledBtn disabled>
                      모집이 완료된 프로젝트입니다.
                    </S.DisabledBtn>
                  ) : (
                    <>
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
                      <S.ContractBtn
                        onClick={() =>
                          updateApplicantFreelancers(
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
                    </>
                  )}
                </>
              }
            >
              <ApplicantFreelancerInfoModal
                user={freelancer}
                project={project}
              />
            </Modal>
          )}
      </S.ProjectContents>
    </S.List>
  );
};

export default ApplicantFreelancerCard;
