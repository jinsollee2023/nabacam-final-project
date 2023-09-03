import { Spin } from "antd";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { useUserStore } from "../../../zustand/useUserStore";
import AppliedProjectCard from "./AppliedProjectCard";
import React from "react";
import { S } from "./appliedProjectList.styles";

const AppliedProjectList = () => {
  const { userId } = useUserStore();

  const {
    appliedProjectList,
    appliedProjectListIsError,
    appliedProjectListIsLoading,
  } = useProjectsQueries({ currentUserId: userId });

  if (appliedProjectListIsLoading) {
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
  if (appliedProjectListIsError) {
    return <span>fetch project list Error..</span>;
  }

  return (
    <S.ProjectListContainer>
      {appliedProjectList && appliedProjectList.length > 0 ? (
        appliedProjectList.map((projectItem) => {
          return (
            <div key={projectItem.projectId}>
              <AppliedProjectCard projectItem={projectItem} userId={userId} />
            </div>
          );
        })
      ) : (
        <div>지원한 프로젝트가 없습니다.</div>
      )}
    </S.ProjectListContainer>
  );
};

export default AppliedProjectList;
