import React from "react";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";
import useProjectsQueries from "src/hooks/useProjectsQueries";
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

  if (!ongoingProjectsWithFreelancers) {
    return <div>진행중인 프로젝트가 없습니다.</div>;
  }

  return (
    <>
      <S.listContainer>
        {ongoingProjectsWithFreelancers.map((project) => (
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
