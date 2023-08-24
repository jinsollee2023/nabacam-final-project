import { Project } from "../Types";
import supabase from "../config/supabaseClient";

export const getProjects = async (): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });
  return projects as Project[];
};

export const getProjectByClient = async (id: string): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", id);
  return projects as Project[];
};

export const addProject = async (newProject: Project): Promise<void> => {
  await supabase
    .from("projects")
    .insert([
      {
        title: newProject.title,
        desc: newProject.desc,
        clientId: newProject.clientId,
        deadLine: newProject.deadLine,
        pay: newProject.pay,
        status: newProject.status,
        volunteer: newProject.volunteer,
      },
    ])
    .select();
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await supabase.from("projects").delete().eq("projectId", projectId);
};

export const updateProject = async (
  projectId: string,
  column: {
    title?: string;
    desc?: string;
    clientId?: string;
    deadLine?: Date;
    pay?: {
      min: number | string;
      max: number | string;
    };
    status?: string;
  }
): Promise<void> => {
  await supabase
    .from("projects")
    .update(column)
    .eq("projectId", projectId)
    .select();
};
