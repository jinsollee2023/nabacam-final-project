import React from "react";
import useClientsQueries from "../../../../../hooks/useClientsQueries";
import { useUserStore } from "../../../../../zustand/useUserStore";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { S } from "../listOfFreelancersByStatus.style";
import OngoingFreelancerCards from "./OngoingFreelancerCards";

const OngoingFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { freelancersWithOngoingProjects } = useProjectsQueries({
    currentUserId: userId,
  });

  if (!freelancersWithOngoingProjects || freelancersWithOngoingProjects.length === 0) {
    return <span>진행 중인 프리랜서가 없습니다.</span>;
  }

  return (
    <>
      <S.OngoingFreelancerlistContainer>
        {freelancersWithOngoingProjects?.map((project) => (
          <S.ListsBox key={`${project.projectId}-${project.freelancer.userId}`}>
            <OngoingFreelancerCards
              key={`${project.projectId}-${project.freelancer.userId}`}
              user={project.freelancer}
              project={project}
            />
          </S.ListsBox>
        ))}
      </S.OngoingFreelancerlistContainer>
    </>
  );
};

export default OngoingFreelancerList;
