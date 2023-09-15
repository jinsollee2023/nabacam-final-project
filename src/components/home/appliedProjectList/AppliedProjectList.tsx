import React, { useEffect } from "react";
import { Spin } from "antd";
import { useUserStore } from "../../../store/useUserStore";
import AppliedProjectCard from "./AppliedProjectCard";
import { S } from "./appliedProjectList.styles";
import useAppliedProjectQueries from "src/hooks/queries/useAppliedProjectQueries";
import { useInView } from "react-intersection-observer";

const AppliedProjectList = () => {
  const { userId } = useUserStore();
  const [ref, inView] = useInView();

  // 현재 로그인한 유저가 지원한 프로젝트만 불러오기
  const { appliedProjectList, error, fetchNextPage, hasNextPage, status } =
    useAppliedProjectQueries({ currentUserId: userId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
    <S.ProjectListContainer>
      {appliedProjectList?.pages &&
      appliedProjectList.pages[0].total_count > 0 ? (
        appliedProjectList.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page.projects.map((projectItem) => {
              return (
                <div key={projectItem.projectId}>
                  <AppliedProjectCard
                    projectItem={projectItem}
                    userId={userId}
                  />
                </div>
              );
            })}
          </React.Fragment>
        ))
      ) : (
        <div>지원한 프로젝트가 없습니다.</div>
      )}
      <div ref={ref}></div>
    </S.ProjectListContainer>
  );
};

export default AppliedProjectList;
