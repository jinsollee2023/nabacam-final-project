import React from "react";
import { S } from "./manageFreelancersByStatusStyle";
import { useUserStore } from "../../../zustand/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import PendingFreelancerCard from "./PendingFreelancerCard";

const PendingFreelancerList = () => {
  const { userId } = useUserStore();
  const { PendingFreelancersToTheProjects } = useProjectsQueries({
    currentUserId: userId,
  });

  const totalPendingFreelancers = PendingFreelancersToTheProjects
    ? PendingFreelancersToTheProjects.map((project) => project.pendingFreelancerUser.length).reduce(
        (acc, cur) => acc + cur,
        0
      )
    : 0;

  if (!PendingFreelancersToTheProjects || totalPendingFreelancers === 0) {
    return <S.DataStatus>보류한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <S.ListContainer>
      <S.Title>보류했던 프리랜서들을 다시 확인해보세요.</S.Title>
      {PendingFreelancersToTheProjects &&
        PendingFreelancersToTheProjects.map((project) =>
          project.pendingFreelancerUser?.map((freelancer) => (
            <PendingFreelancerCard
              key={`${project.projectId}-${freelancer.userId}`}
              project={project}
              freelancer={freelancer}
              userId={userId}
            />
          ))
        )}
    </S.ListContainer>
  );
};

export default PendingFreelancerList;
