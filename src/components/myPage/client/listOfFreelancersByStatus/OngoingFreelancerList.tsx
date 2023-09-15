import React, { useEffect } from "react";
import { useUserStore } from "../../../../store/useUserStore";
import { S } from "./listOfFreelancersByStatus.style";
import OngoingFreelancerCards from "./OngoingFreelancerCards";
import { useInView } from "react-intersection-observer";
import useFreelancersWithOngoingProjectsQueries from "src/hooks/queries/useFreelancersWithOngoingProjectsQueries";
import { Spin } from "antd";

const OngoingFreelancerList = () => {
  const [ref, inView] = useInView();

  const { userId } = useUserStore();
  const {
    freelancersWithOngoingProjects,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useFreelancersWithOngoingProjectsQueries({
    currentUserId: userId,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 확인필요
  if (
    !freelancersWithOngoingProjects ||
    freelancersWithOngoingProjects.pages[0].total_count === 0
  )
    return <div>진행중인 프리랜서가 없습니다.</div>;

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
    <>
      <S.OngoingFreelancerlistContainer>
        {freelancersWithOngoingProjects?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.projects.map((project) => (
              <S.ListsBox
                key={`${project.projectId}-${project.freelancer.userId}`}
              >
                <OngoingFreelancerCards
                  key={`${project.projectId}-${project.freelancer.userId}`}
                  user={project.freelancer}
                  project={project}
                />
              </S.ListsBox>
            ))}
          </React.Fragment>
        ))}
        <div ref={ref}></div>
      </S.OngoingFreelancerlistContainer>
    </>
  );
};

export default OngoingFreelancerList;
