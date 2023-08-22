import { useMutation, useQuery } from "@tanstack/react-query";
import { Project, User } from "src/Types";
import { getClients } from "src/api/User";
import S from "./ProjectListStyles";
import { deleteProject } from "src/api/Project";
import { queryClient } from "src/App";

interface projectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: projectCardProps) => {
  const { data: client } = useQuery(
    ["clients"],
    async () => {
      const clientsData = await getClients();
      return clientsData;
    },
    {
      enabled: !!project,
      select: (clientsData: User[]) =>
        clientsData.find((client) => client.userId === project.clientId),
    }
  );

  const deleteProjectMutation = useMutation(
    (projectId: string) => deleteProject(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const deleteProjectButtonHandler = () => {
    deleteProjectMutation.mutate(project.projectId!);
  };

  return (
    <S.ProjectCardBox>
      <S.ProjcetTitleBox>{project.title}</S.ProjcetTitleBox>
      <S.ProjectInfoBox>
        <S.ProjectCardButtonBox>
          <span>수정</span>
          <span onClick={deleteProjectButtonHandler}>삭제</span>
        </S.ProjectCardButtonBox>
        <div>
          <p>{client && client.name}</p>
          <p>{String(project.deadLine)} 종료</p>
        </div>
      </S.ProjectInfoBox>
    </S.ProjectCardBox>
  );
};

export default ProjectCard;
