import { Project } from "../Types";
import supabase from "../config/supabaseClient";

export const getProjects = async (id: string): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  return projects as Project[];
};

export const getProjectOfClientBySort = async (
  id: string,
  sortLabel: string
): Promise<Project[]> => {
  let ascending = false;

  switch (sortLabel) {
    case "최신순":
      ascending = false;
      break;
    case "오래된순":
      ascending = true;
      break;
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", id)
    .order("created_at", { ascending });
  return projects as Project[];
};

export const getProjectByClientWithBeforeProgress = async (
  clientId: string
): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("status", "진행 전");

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
        manager: newProject.manager,
        date: { startDate: "", endDate: newProject.date.endDate },
        pay: newProject.pay,
        status: newProject.status,
        category: newProject.category,
        qualification: newProject.qualification,
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
    volunteer?: string[];
    status?: string;
    SuggestedFreelancers?: string[];
    qualification?: number;
  }
): Promise<void> => {
  await supabase
    .from("projects")
    .update(column)
    .eq("projectId", projectId)
    .select();
};

export const getSuggestedFreelancers = async (
  selectedProject: Project
): Promise<{ SuggestedFreelancers: string[] }> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("SuggestedFreelancers")
      .match({ projectId: selectedProject?.projectId })
      .single();

    if (error) {
      console.error("프로젝트 정보 가져오기 오류:", error.message);
    }
    return data as { SuggestedFreelancers: string[] };
  } catch (error) {
    throw new Error(
      `제안한 프리랜서 목록을 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getProjectOfFreelancerBySort = async (sortLabel: string) => {
  try {
    let orderByField = "";
    let ascending = true;

    switch (sortLabel) {
      case "최근 등록 순":
        orderByField = "created_at";
        ascending = false;
        break;
      case "오래된 등록 순":
        orderByField = "created_at";
        ascending = true;
        break;
      case "마감기한 빠른 순":
        orderByField = "deadLine";
        ascending = true;
        break;
      case "마감기한 느린 순":
        orderByField = "deadLine";
        ascending = false;
        break;
      case "지원자 많은 순":
        orderByField = "volunteer";
        ascending = false;
        break;
      case "지원자 적은 순":
        orderByField = "volunteer";
        ascending = true;
        break;
      case "자격 연차 높은 순":
        orderByField = "qualification";
        ascending = false;
        break;
      case "자격 연차 낮은 순":
        orderByField = "qualification";
        ascending = true;
        break;
      default:
        orderByField = "created_at";
        ascending = false;
        break;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order(orderByField, { ascending })
      .eq("status", "진행 전");
    if (error) {
      alert(
        `프로젝트 목록을 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return data;
  } catch (error) {
    throw new Error(
      `프로젝트 목록을 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};
