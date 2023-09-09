import React from "react";
import { S } from "./manageFreelancersByStatus.style";
import { useUserStore } from "../../../store/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import PendingFreelancerCard from "./PendingFreelancerCard";
import useProjectOfClientBySortQueries from "src/hooks/queries/useProjectOfClientBySortQueries";

const PendingFreelancerList = () => {
  const { userId } = useUserStore();
  const { pendingFreelancersToTheProjects } = useProjectOfClientBySortQueries({
    currentUserId: userId,
  });

  // reduce 초기값 설정
  // 보류한한 프리랜서가 없을 시 문구 노출 위해 생성
  const totalPendingFreelancers = pendingFreelancersToTheProjects
    ? pendingFreelancersToTheProjects
        .map((project) => project.pendingFreelancerUser.length)
        .reduce((acc, cur) => acc + cur, 0)
    : 0;

  if (!pendingFreelancersToTheProjects || totalPendingFreelancers === 0) {
    return <S.DataStatus>보류한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <S.ListContainer>
      <S.Title>보류했던 프리랜서들을 다시 확인해보세요.</S.Title>
      {pendingFreelancersToTheProjects &&
        pendingFreelancersToTheProjects.map((project) =>
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
