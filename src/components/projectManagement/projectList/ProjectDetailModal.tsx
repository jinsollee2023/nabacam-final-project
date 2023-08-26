import { Project } from "src/Types";
import S from "./ProjectListStyles";

interface ProjectDetailModalProps {
  project: Project;
  client: string;
}

const ProjectDetailModal = ({ project, client }: ProjectDetailModalProps) => {
  return (
    <div>
      <p>{project.title}</p>
      <S.ModalMainInfoBox>
        <label htmlFor="projectTitle">프로젝트 이름</label>
        <div id="projectTitle">{project.title}</div>
        <label htmlFor="projectDesc">프로젝트 설명</label>
        <div id="projectDesc">{project.desc}</div>
      </S.ModalMainInfoBox>
      <S.ModalSubInfoBox>
        <label htmlFor="projectManager">담당자</label>
        <div id="projectManager">{client}</div>
        <label htmlFor="projectDeadLine">{String(project.date.endDate)}</label>
        <div></div>
      </S.ModalSubInfoBox>
    </div>
  );
};

export default ProjectDetailModal;
