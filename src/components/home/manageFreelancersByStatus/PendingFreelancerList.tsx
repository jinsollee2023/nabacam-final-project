import React, { useEffect } from "react";
import { S } from "./manageFreelancersByStatus.style";
import { useUserStore } from "../../../store/useUserStore";
import PendingFreelancerCard from "./PendingFreelancerCard";
import usePengFreelancersToTheProjectsQueries from "src/hooks/queries/usePendingFreelancersToTheProjectsQueries";
import { useInView } from "react-intersection-observer";
import { Spin } from "antd";

const PendingFreelancerList = () => {
  const { userId } = useUserStore();
  const {
    pendingFreelancersToTheProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = usePengFreelancersToTheProjectsQueries({
    currentUserId: userId,
  });
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // reduce 초기값 설정
  const totalPendingFreelancers = pendingFreelancersToTheProjects
    ? pendingFreelancersToTheProjects?.pages
        .map((page) => {
          return page.total_count;
        })
        .reduce((acc, cur) => acc + cur, 0)
    : 0;

  if (!pendingFreelancersToTheProjects || totalPendingFreelancers === 0) {
    return <S.DataStatus>보류한 프리랜서가 없습니다.</S.DataStatus>;
  }

  return status === "loading" ? (
    <Spin
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    />
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <S.ListContainer>
      <S.Title>보류했던 프리랜서들을 다시 확인해보세요.</S.Title>
      {pendingFreelancersToTheProjects.pages.map((page, idx) => (
        <React.Fragment key={idx}>
          {page.projects.map((project) =>
            project.pendingFreelancerUser?.map((freelancer) => (
              <PendingFreelancerCard
                key={`${project.projectId}-${freelancer.userId}`}
                project={project}
                freelancer={freelancer}
                userId={userId}
              />
            ))
          )}
        </React.Fragment>
      ))}
      <div ref={ref}></div>
    </S.ListContainer>
  );
};

export default PendingFreelancerList;
