import React from "react";
import { S } from "./projectCardContents.styles";
import { FiUsers } from "react-icons/fi";
import { Project, User } from "src/Types";
import { calculateDaysAgo } from "../common/commonFunc";

interface ProjectCardContentsProps {
  projectItem: Project;
  client: User;
  setIsDetailModalOpen: (isDetailModalOpen: boolean) => void;
}

const ProjectCardContents = ({
  projectItem,
  client,
  setIsDetailModalOpen,
}: ProjectCardContentsProps) => {
  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  return (
    <S.ProejctCardContainer>
      <S.ProejctContentLeftWrapper>
        <S.ProjectStatus
          recruitmentCompleted={projectItem.status === "진행 전"}
        >
          {projectItem.status === "진행 중" ||
          projectItem.status === "진행 완료"
            ? "모집 완료"
            : "모집 중"}
        </S.ProjectStatus>
        <S.ClientName>{client?.name}</S.ClientName>
        <div>
          <div>
            <S.ProjectName>{projectItem.title}</S.ProjectName>
          </div>
          <S.ProjectTagBox>
            <S.ProjectTag>{projectItem.category}</S.ProjectTag>
            <S.ProjectTag>
              {projectItem.qualification > 0
                ? `${projectItem.qualification}년차 이상`
                : "신입 가능"}
            </S.ProjectTag>
            <S.ProjectTag>
              {projectItem.expectedStartDate} 시작 예정
            </S.ProjectTag>
          </S.ProjectTagBox>
        </div>
      </S.ProejctContentLeftWrapper>

      <div>
        <S.ProejctContentRightWrapper>
          <S.AppliedFreelancersCountBox>
            <FiUsers />
            <span>{projectItem.volunteer?.length}명 지원 중</span>
          </S.AppliedFreelancersCountBox>
          <div>
            <S.DetailModalOpenButton onClick={() => setIsDetailModalOpen(true)}>
              자세히 보기
            </S.DetailModalOpenButton>

            <S.ProejctContentRightTextWrapper>
              <S.ProjectRegistrationDate>
                {daysAgo} 등록
              </S.ProjectRegistrationDate>
            </S.ProejctContentRightTextWrapper>
          </div>
        </S.ProejctContentRightWrapper>
      </div>
    </S.ProejctCardContainer>
  );
};

export default ProjectCardContents;
