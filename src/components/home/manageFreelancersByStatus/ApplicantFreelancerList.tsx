import React from "react";
import { S } from "./manageFreelancersByStatus.style";
import { useUserStore } from "../../../store/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import ApplicantFreelancerCard from "./ApplicantFreelancerCard";
import useProjectOfClientBySortQueries from "src/hooks/queries/useProjectOfClientBySortQueries";

const ApplicantFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const {
    freelancersAppliedToTheProjects,
    freelancersAppliedToTheProjectsIsLoading,
    freelancersAppliedToTheProjectsIsError,
  } = useProjectOfClientBySortQueries({
    currentUserId: userId,
  });

  if (freelancersAppliedToTheProjectsIsLoading) {
    <S.DataStatus>Loading...</S.DataStatus>;
  }

  if (freelancersAppliedToTheProjectsIsError) {
    <S.DataStatus>fetch applicant freelancer list Error..</S.DataStatus>;
  }

  // reduce 초기값 설정
  // 지원한 프리랜서가 없을 시 문구 노출 위해 생성
  const totalVolunteers = freelancersAppliedToTheProjects
    ? freelancersAppliedToTheProjects
        .map((project) => project.volunteerUser.length)
        .reduce((acc, cur) => acc + cur, 0)
    : 0;

  if (!freelancersAppliedToTheProjects || totalVolunteers === 0) {
    return <S.DataStatus>지원한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return (
    <>
      <S.ListContainer>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        {freelancersAppliedToTheProjects.map((project) =>
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
