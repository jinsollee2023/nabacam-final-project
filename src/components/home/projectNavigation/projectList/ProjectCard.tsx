import { Button } from "antd";
import React, { useState } from "react";
import { Project } from "src/Types";
import Modal from "src/components/modal/Modal";

interface ProjectCardProps {
  projectItem: Project;
}

const ProjectCard = ({ projectItem }: ProjectCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 마감 날짜 요일 구하기
  const getDayOfWeek = (date: Date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
  };
  const dayOfWeek = getDayOfWeek(new Date(projectItem.deadLine));
  console.log(dayOfWeek);

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
                // onClick={HandleProjectSuggestionButtonClick}
                // disabled={
                //   !selectedProject?.title ||
                //   !(
                //     projectDataForSuggestions &&
                //     projectDataForSuggestions.length > 0
                //   )
                // }
              >
                프로젝트 지원하기
              </Button>
            </>
          }
        >
          {/* <OneTouchModal /> */}
        </Modal>
      )}
      <div id="proejctCardContainer">
        <div id="clientName">{projectItem.clientId}</div>
        <div id="projectNameAndWorkExpCondition">
          <span>{projectItem.title}</span>
          <span>N년차 이상</span>
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
      </div>
    </>
  );
};

export default ProjectCard;
