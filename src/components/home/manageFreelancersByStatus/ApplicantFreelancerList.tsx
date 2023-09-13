import React, { useEffect } from "react";
import { S } from "./manageFreelancersByStatus.style";
import { useUserStore } from "../../../store/useUserStore";
import useClientsQueries from "../../../hooks/useClientsQueries";
import ApplicantFreelancerCard from "./ApplicantFreelancerCard";
import useProjectOfClientBySortQueries from "src/hooks/queries/useProjectOfClientQueries";
import { useInView } from "react-intersection-observer";

const ApplicantFreelancerList = () => {
  const { userId } = useUserStore();
  const { client } = useClientsQueries({ userId });
  const { freelancersAppliedToTheProjects, error, fetchNextPage, hasNextPage, status } =
    useProjectOfClientBySortQueries({
      currentUserId: userId,
    });
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // reduce 초기값 설정
  // 지원한 프리랜서가 없을 시 문구 노출 위해 생성
  const totalVolunteers = freelancersAppliedToTheProjects
    ? freelancersAppliedToTheProjects?.pages
        .map((page) => {
          return page.total_count;
        })
        .reduce((acc, cur) => acc + cur, 0)
    : 0;

  if (!freelancersAppliedToTheProjects || totalVolunteers === 0) {
    return <S.DataStatus>지원한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      <S.ListContainer>
        <S.Title>지원한 프리랜서들을 확인해보세요.</S.Title>
        {freelancersAppliedToTheProjects.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page.projects.map((project) =>
              project.volunteerUser?.map((freelancer) => (
                <ApplicantFreelancerCard
                  key={`${freelancer.userId}-${project.projectId}`}
                  project={project}
                  freelancer={freelancer}
                />
              ))
            )}
          </React.Fragment>
        ))}
        <div ref={ref}></div>
      </S.ListContainer>
    </>
  );
};

export default ApplicantFreelancerList;
