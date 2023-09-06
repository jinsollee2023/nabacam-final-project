import React from "react";
import { S } from "./manageFreelancersByStatusStyle";
import { useUserStore } from "../../../zustand/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import ApplicantFreelancerCard from "./ApplicantFreelancerCard";

const ApplicantFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { FreelancersAppliedToTheProjects } = useProjectsQueries({
    currentUserId: userId,
  });

  // reduce 초기값 설정
  // 지원한 프리랜서가 없을 시 문구 노출 위해 생성
  const totalVolunteers = FreelancersAppliedToTheProjects
    ? FreelancersAppliedToTheProjects.map((project) => project.volunteerUser.length).reduce(
        (acc, cur) => acc + cur,
        0
      )
    : 0;

  if (!FreelancersAppliedToTheProjects || totalVolunteers === 0) {
    return <S.DataStatus>지원한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <>
      <S.ListContainer>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        {FreelancersAppliedToTheProjects.map((project) =>
          project.volunteerUser?.map((freelancer) => (
            <ApplicantFreelancerCard
              key={`${freelancer.userId}-${project.projectId}`}
              project={project}
              freelancer={freelancer}
            />
          ))
        )}
      </S.ListContainer>
    </>
  );
};

export default ApplicantFreelancerList;
