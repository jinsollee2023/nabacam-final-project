import { Project } from "src/Types";

interface ApplyForProjectModalProps {
  projectItem: Project;
  clientName: string;
}

const ApplyForProjectModal = ({
  projectItem,
  clientName,
}: ApplyForProjectModalProps) => {
  return (
    <div>
      <span>{clientName}</span>
      <span>{projectItem.title}</span>
      <div>
        <span>프로젝트 설명</span>
        <span>{projectItem.title}</span>
      </div>
      <div>
        <div>
          <span>목표 기간</span>
          <span>{String(projectItem.date.endDate)}</span>
        </div>
        <div>
          <span>급여</span>
          <span>
            {projectItem.pay.min}~{projectItem.pay.max}
          </span>
        </div>
        <div>
          <span>모집 분야</span>
          <span>{projectItem.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplyForProjectModal;
