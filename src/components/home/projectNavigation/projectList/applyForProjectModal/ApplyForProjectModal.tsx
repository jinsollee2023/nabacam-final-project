import { Project } from "../../../../../Types";
import { S } from "./applyForProjectModal.styles";

interface ApplyForProjectModalProps {
  projectItem: Project;
  clientName: string;
}

const ApplyForProjectModal = ({
  projectItem,
  clientName,
}: ApplyForProjectModalProps) => {
  return (
    <S.ModalContainer>
      <S.Title>{clientName}</S.Title>
      <div>
        <S.Title>프로젝트 이름</S.Title>
        <span>{projectItem.title}</span>
      </div>
      <div>
        <S.Title>프로젝트 설명</S.Title>
        <span>{projectItem.desc}</span>
      </div>
      <hr />
      <div>
        <S.Title>모집 조건</S.Title>
        <div>
          <div>
            <span>경력</span>
            <span>{projectItem.qualification}년차 이상부터</span>
          </div>
          <div>
            <span>분야</span>
            <span>{projectItem.category}</span>
          </div>
        </div>
      </div>
      <div>
        <S.Title>프로젝트 설정</S.Title>
        <div>
          <span>목표 기간</span>
          <span>{String(projectItem.date.endDate)}</span>
        </div>
        <div>
          <span>담당자</span>
          <span>
            {projectItem.manager.team} {projectItem.manager.name}
          </span>
        </div>
        <div>
          <span>급여</span>
          <div>
            <div>
              <span>최소</span>
              <span>{projectItem.pay.min}₩</span>
            </div>
            <div>
              <span>최대</span>
              <span>{projectItem.pay.max}₩</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </S.ModalContainer>
  );
};

export default ApplyForProjectModal;
