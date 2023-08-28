import React from "react";
import { S } from "./suggestedProjectList.styles";
import useProjectsQueries from "src/hooks/useProjectsQueries";
import { Spin } from "antd";
import { useUserStore } from "src/zustand/useUserStore";
import SuggestedProjectCard from "./SuggestedProjectCard";

const SuggestedProjectList = () => {
  const { userId } = useUserStore();

  const {
    suggestedProjectList,
    suggestedProjectListIsError,
    suggestedProjectListIsLoading,
  } = useProjectsQueries({ currentUserId: userId });

  console.log(suggestedProjectList);

  if (suggestedProjectListIsLoading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
  if (suggestedProjectListIsError) {
    return <span>fetch project list Error..</span>;
  }

  return (
    <>
      {suggestedProjectList && suggestedProjectList.length > 0 ? (
        suggestedProjectList.map((projectItem) => {
          return (
            <div key={projectItem.projectId}>
              <SuggestedProjectCard projectItem={projectItem} userId={userId} />
            </div>
          );
        })
      ) : (
        <div>제안 받은 프로젝트가 없습니다.</div>
      )}
    </>
  );
};

export default SuggestedProjectList;
