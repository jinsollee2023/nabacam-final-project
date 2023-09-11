import { S } from "./suggestedProjectList.styles";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import { Spin } from "antd";
import { useUserStore } from "../../../store/useUserStore";
import SuggestedProjectCard from "./SuggestedProjectCard";

const SuggestedProjectList = () => {
  const { userId, user } = useUserStore();

  // 현재 로그인한 유저 값을 넘겨서 제안받은 프로젝트 리스트 불러오기
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
    <S.ProjectListContainer>
      {suggestedProjectList && suggestedProjectList.length > 0 ? (
        suggestedProjectList.map((projectItem) => {
          return (
            <div key={projectItem.projectId}>
              <SuggestedProjectCard
                projectItem={projectItem}
                userId={userId}
                userName={user.name}
              />
            </div>
          );
        })
      ) : (
        <div>제안 받은 프로젝트가 없습니다.</div>
      )}
    </S.ProjectListContainer>
  );
};

export default SuggestedProjectList;
