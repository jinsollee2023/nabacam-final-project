import React from "react";
import useClientsQueries from "../../../../../hooks/useClientsQueries";
import { useUserStore } from "../../../../../zustand/useUserStore";
import useProjectsQueries from "../../../../../hooks/useProjectsQueries";
import { S } from "../listOfFreelancersByStatusStyle";
import OngoingFreelancerCards from "./OngoingFreelancerCards";

const OngoingFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { ongoingProjectsWithFreelancers } = useProjectsQueries({
    currentUserId: userId,
  });

  // console.log("현재 로그인된 클라이언트 정보", client);
  // console.log("현재 로그인된 클라이언트의 진행중인 프로젝트 정보", ongoingProjectsWithFreelancers);

  if (!ongoingProjectsWithFreelancers || ongoingProjectsWithFreelancers.length === 0) {
    return <div>진행 중인 프리랜서가 없습니다.</div>;
  }

  return (
    <>
      <S.listContainer>
        {ongoingProjectsWithFreelancers?.map((project) => (
          <S.ListsBox key={`${project.projectId}-${project.freelancer.userId}`}>
            <OngoingFreelancerCards
              key={`${project.projectId}-${project.freelancer.userId}`}
              user={project.freelancer}
              project={project}
            />
          </S.ListsBox>
        ))}
      </S.listContainer>
    </>
  );
};

export default OngoingFreelancerList;
