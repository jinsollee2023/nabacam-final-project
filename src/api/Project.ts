import { Project } from "../Types";
import supabase from "../config/supabaseClient";

export const getProjects = async (): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });
  return projects as Project[];
};

export const getPublishedProjects = async (id: string): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", id);
  return projects as Project[];
};
