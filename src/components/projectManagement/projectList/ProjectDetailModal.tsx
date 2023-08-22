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
      <S.ProjectMainInfoBox>
        <label htmlFor="projectTitle">프로젝트 이름</label>
        <div id="projectTitle">{project.title}</div>
        <label htmlFor="projectDesc">프로젝트 설명</label>
        <div id="projectDesc">{project.desc}</div>
      </S.ProjectMainInfoBox>
      <S.ProjectSubInfoBox>
        <label htmlFor="projectManager">담당자</label>
        <div id="projectManager">{client}</div>
        <label htmlFor="projectDeadLine">{String(project.deadLine)}</label>
        <div></div>
      </S.ProjectSubInfoBox>
    </div>
  );
};

export default ProjectDetailModal;
