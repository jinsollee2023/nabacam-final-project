import React, { useState } from "react";
import { S } from "./manageFreelancersByStatus.style";
import { Project, User } from "src/Types";
import Modal from "../../modal/Modal";
import { IUser } from "../../../Types";
import PendingFreelancerInfoModal from "./PendingFreelancerInfoModal";
import { toast } from "react-toastify";
import useProjectOfClientBySortQueries from "src/hooks/queries/useProjectOfClientQueries";

interface PendingFreelancerCardProps {
  project: Project;
  freelancer: User;
  userId: string;
}

const PendingFreelancerCard = ({
  project,
  freelancer,
  userId,
}: PendingFreelancerCardProps) => {
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    deletePendingFreelancerMutation,
    addProjectIdToUserMutation,
  } = useProjectOfClientBySortQueries({
    currentUserId: userId,
  });

  // 보류한 프리랜서 목록 업데이트
  const updatePendingFreelancers = (
    userId: string,
    projectId: string,
    endDate: string,
    projectIds: string[],
    volunteer: string[],
    pendingFreelancer: string[]
  ) => {
    const customProjectIds = projectIds.concat(projectId);
    const customPendingFreelancers = pendingFreelancer.filter(
      (v) => v !== userId
    );
    updateFreelancerApprovalMutation.mutate({ userId, projectId, endDate });
    deleteVolunteerAndPendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: volunteer,
      updatePendingFreelancer: customPendingFreelancers,
    });
    addProjectIdToUserMutation.mutate({ userId, projectIds: customProjectIds });
    toast.success("계약이 완료되었습니다.");
    setIsModalOpen(false);
  };

  // 거절한 프리랜서 설정(삭제)
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
    toast.success("프리랜서 거절이 완료되었습니다.");
    setIsModalOpen(false);
  };

  return (
    <>
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
          <S.WorkFieldAndWorkExp>
            {freelancer.workExp}년차
          </S.WorkFieldAndWorkExp>
        </S.ListContents>
        <S.ProjectContents>
          <div key={project.projectId}>
            <S.ProjectTitle>{project.title} 프로젝트에 지원</S.ProjectTitle>
          </div>

          <S.CheckingButton
            onClick={() => {
              setSelectedFreelancer(freelancer);
              setIsModalOpen(!isModalOpen);
            }}
          >
            확인하기
          </S.CheckingButton>
        </S.ProjectContents>
      </S.List>
      {isModalOpen &&
        selectedFreelancer &&
        selectedFreelancer.userId === freelancer.userId && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            buttons={
              <>
                {project.freelancerId ? (
                  <S.DisabledButton disabled>
                    모집이 완료된 프로젝트입니다.
                  </S.DisabledButton>
                ) : (
                  <>
                    <S.PendingButton
                      onClick={() =>
                        deletePendingFreelancer(
                          project.projectId || "",
                          freelancer.userId,
                          project.pendingFreelancer || []
                        )
                      }
                    >
                      삭제하기
                    </S.PendingButton>
                    <S.ContractButton
                      onClick={() =>
                        updatePendingFreelancers(
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
                    </S.ContractButton>
                    <S.ContractButton>문의하기</S.ContractButton>
                  </>
                )}
              </>
            }
          >
            <PendingFreelancerInfoModal user={freelancer} project={project} />
          </Modal>
        )}
    </>
  );
};

export default PendingFreelancerCard;
