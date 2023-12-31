import React, { useState } from "react";
import { S } from "./manageFreelancersByStatus.style";
import Modal from "../../modal/Modal";
import { IUser, Project } from "../../../Types";
import ApplicantFreelancerInfoModal from "./ApplicantFreelancerInfoModal";
import { useUserStore } from "src/store/useUserStore";
import { toast } from "react-toastify";
import useProjectOfClientQueries from "src/hooks/queries/useProjectOfClientQueries";
import usePengFreelancersToTheProjectsQueries from "src/hooks/queries/usePendingFreelancersToTheProjectsQueries";
import { useNavigate } from "react-router-dom";
import { sendDM } from "src/components/common/commonFunc";
import { useRoomStore } from "src/store/useRoomStore";

interface ApplicantFreelancerCardProps {
  project: Project;
  freelancer: IUser;
}

const ApplicantFreelancerCard = ({
  project,
  freelancer,
}: ApplicantFreelancerCardProps) => {
  const { userId, user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(
    null
  );
  const {
    updateFreelancerApprovalMutation,
    deleteVolunteerAndPendingFreelancerMutation,
    addProjectIdToUserMutation,
  } = useProjectOfClientQueries({
    currentUserId: userId,
  });

  const { updatePendingFreelancerMutation } =
    usePengFreelancersToTheProjectsQueries({
      currentUserId: userId,
    });

  // 지원한 프리랜서 목록 업데이트
  const updateApplicantFreelancers = (
    userId: string,
    projectId: string,
    endDate: string,
    projectIds: string[],
    volunteer: string[],
    pendingFreelancer: string[]
  ) => {
    const customProjectIds = projectIds.concat(projectId);
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
  const updatePendingFreelancer = (
    projectId: string,
    volunteer: string[],
    pendingFreelancer: string[],
    freelancerId: string
  ) => {
    const updateVolunteerData = volunteer.filter(
      (user) => user !== freelancerId
    );
    const updatePendingFreelancerData = pendingFreelancer.concat(freelancerId);
    updatePendingFreelancerMutation.mutate({
      projectId,
      updateVolunteer: updateVolunteerData,
      pendingFreelancer: updatePendingFreelancerData,
    });
    toast.success("보류 처리가 완료되었습니다.");
    setIsModalOpen(false);
  };

  //
  const navigate = useNavigate();
  const { setSelectedRoom, setCreatedRoomId } = useRoomStore();

  const sendDMHandler = () => {
    sendDM({
      DMfreelancerName: freelancer.name,
      DMclientName: user.name,
      DMfreelancerId: freelancer.userId,
      DMclientId: userId,
      navigate,
      setCreatedRoomId,
      setSelectedRoom,
    });
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

        <S.CheckingButton
          onClick={() => {
            setSelectedFreelancer(freelancer);
            setIsModalOpen(!isModalOpen);
          }}
        >
          확인하기
        </S.CheckingButton>
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
                          updatePendingFreelancer(
                            project.projectId || "",
                            project.volunteer || [],
                            project.pendingFreelancer || [],
                            freelancer.userId
                          )
                        }
                      >
                        보류하기
                      </S.PendingButton>
                      <S.ContractButton
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
                      </S.ContractButton>
                      <S.ContractButton onClick={sendDMHandler}>
                        문의하기
                      </S.ContractButton>
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
