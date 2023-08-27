import { Button } from "antd";
import { useState } from "react";
import { Project } from "src/Types";
import Modal from "src/components/modal/Modal";
import ApplyForProjectModal from "./applyForProjectModal/ApplyForProjectModal";
import { S } from "./projectList.styles";
import useClientsQueries from "src/hooks/useClientsQueries";
import { useUserStore } from "src/zustand/useUserStore";

interface ProjectCardProps {
  projectItem: Project;
}

const ProjectCard = ({ projectItem }: ProjectCardProps) => {
  const { userId } = useUserStore();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { client } = useClientsQueries(projectItem.clientId);

  // 마감 날짜 요일 구하기
  const getDayOfWeek = (date: Date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
  };
  const dayOfWeek = getDayOfWeek(new Date(projectItem.deadLine));

  // 등록일이 오늘 기준 몇 일전인지
  const calculateDaysAgo = (targetDate: Date) => {
    const today = new Date();
    const timeDiff = today.getTime() - targetDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24)); // milliseconds in a day
    if (daysAgo === 1) {
      return "1일 전";
    } else if (daysAgo > 1) {
      return `${daysAgo}일 전`;
    } else {
      return "오늘";
    }
  };
  const targetDate = new Date(String(projectItem.created_at).slice(0, 10));
  const daysAgo = calculateDaysAgo(targetDate);

  const HandleProjectApplyButtonClick = () => {};

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              <Button
                type="primary"
                block
                onClick={HandleProjectApplyButtonClick}
              >
                프로젝트 지원하기
              </Button>
            </>
          }
        >
          <ApplyForProjectModal
            projectItem={projectItem}
            clientName={client?.name!}
          />
        </Modal>
      )}
      <S.ProejctCardContainer>
        <div id="clientName">{client?.name}</div>
        <div id="projectNameAndWorkExpCondition">
          <span>
            {projectItem.title} · {projectItem.category}
          </span>
          {projectItem.qualification > 0 ? (
            <span>{projectItem.qualification}년차 이상</span>
          ) : (
            <span>신입 가능</span>
          )}
          {/* <span>{projectItem.qualification}년차 이상</span> */}
        </div>
        <div id="buttonAndDeadLineAndCreatAt">
          <button onClick={() => setIsDetailModalOpen(true)}>
            자세히 보기
          </button>
          <span>{projectItem.volunteer?.length}명 지원 중</span>
          <div>
            <span>
              ~{String(projectItem.deadLine).slice(5, 7)}/
              {String(projectItem.deadLine).slice(8, 10)} ({dayOfWeek})
            </span>
            <span>{daysAgo} 등록</span>
          </div>
        </div>
      </S.ProejctCardContainer>
    </>
  );
};

export default ProjectCard;
