import React from "react";
import { S } from "./manageFreelancersByStatusStyle";
import { useUserStore } from "../../../zustand/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import ApplicantFreelancerCard from "./ApplicantFreelancerCard";

const ApplicantFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { applicantFreelancers } = useProjectsQueries({
    currentUserId: userId,
  });

  if (!applicantFreelancers || applicantFreelancers.length === 0) {
    return <S.DataStatus>지원한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <>
      <S.ListContainer>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        {applicantFreelancers.map((project) =>
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
