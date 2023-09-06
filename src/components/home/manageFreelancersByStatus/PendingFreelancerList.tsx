import React from "react";
import { S } from "./manageFreelancersByStatusStyle";
import { useUserStore } from "../../../zustand/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import PendingFreelancerCard from "./PendingFreelancerCard";

const PendingFreelancerList = () => {
  const { userId } = useUserStore();
  const { pendingFreelancers } = useProjectsQueries({
    currentUserId: userId,
  });

  return (
    <S.ListContainer>
      <S.Title>보류했던 프리랜서들을 다시 확인해보세요.</S.Title>
      {pendingFreelancers &&
        pendingFreelancers.map((project) =>
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
