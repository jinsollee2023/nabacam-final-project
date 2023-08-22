import { useQuery } from "@tanstack/react-query";
import { getProjects } from "src/api/Project";
import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import S from "./ProjectListStyles";

const ProjectList = () => {
  const { data: projects } = useQuery(["projects"], async () => {
    const tasksData = await getProjects();
    return tasksData;
  });

  return (
    <>
      <div>
        {projects &&
          projects.map((project) => {
            return <ProjectCard project={project} />;
          })}
      </div>
      <S.ProjectCardBox justifyContent="center">
        <RiAddBoxLine size="23" />
        <span>프로젝트 게시하기</span>
      </S.ProjectCardBox>
    </>
  );
};

export default ProjectList;
