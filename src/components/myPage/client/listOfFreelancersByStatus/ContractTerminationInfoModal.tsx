import React from "react";
import OngoingFreelancerInfoModal from "./OngoingFreelancerInfoModal";
import { Project, User } from "src/Types";
import { S } from "./listOfFreelancersByStatusStyle";

interface ContractTerminationInfoModalProps {
  user: User;
  project: Project;
  modalTitle?: React.ReactNode;
}

const ContractTerminationInfoModal = ({
  user,
  project,
  modalTitle,
}: ContractTerminationInfoModalProps) => {
  return (
    <>
      <OngoingFreelancerInfoModal
        user={user}
        project={project}
        modalTitle={<div>이전에 함께 작업했던 {user.name}님의 프로필이에요.</div>}
      />
    </>
  );
};

export default ContractTerminationInfoModal;
