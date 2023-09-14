import React, { useEffect } from "react";
import { S } from "./suggestedProjectList.styles";
import { Spin } from "antd";
import { useUserStore } from "../../../store/useUserStore";
import SuggestedProjectCard from "./SuggestedProjectCard";
import useSuggestedProjectQueries from "src/hooks/queries/useSuggestedProjectQueries";
import { useInView } from "react-intersection-observer";

const SuggestedProjectList = () => {
  const { userId, user } = useUserStore();
  const [ref, inView] = useInView();

  // 현재 로그인한 유저 값을 넘겨서 제안받은 프로젝트 리스트 불러오기
  const { suggestedProjectList, error, fetchNextPage, hasNextPage, status } =
    useSuggestedProjectQueries({ currentUserId: userId });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("test");
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
    <p>Error:{error?.message}</p>
  ) : (
    <S.ProjectListContainer>
      {suggestedProjectList?.pages &&
      suggestedProjectList.pages[0].total_count > 0 ? (
        suggestedProjectList.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page.projects?.map((projectItem) => {
              return (
                <div key={projectItem.projectId}>
                  <SuggestedProjectCard
                    projectItem={projectItem}
                    userId={userId}
                    userName={user.name}
                  />
                </div>
              );
            })}
          </React.Fragment>
        ))
      ) : (
        <div>제안 받은 프로젝트가 없습니다.</div>
      )}
      <div ref={ref}></div>
    </S.ProjectListContainer>
  );
};

export default SuggestedProjectList;
