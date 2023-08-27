import { Project } from "../Types";
import supabase from "../config/supabaseClient";
import dayjs from "dayjs";

export const getProjects = async (): Promise<Project[]> => {
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
        volunteer: newProject.volunteer,
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
    status?: string;
    SuggestedFreelancers?: string[];
    qualification?: number;
  }
): Promise<void> => {
  console.log(column);
  await supabase.from("projects").update(column).eq("projectId", projectId).select();
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
    throw new Error(`제안한 프리랜서 목록을 가져오는 중 오류가 발생했습니다.\n ${error}`);
  }
};

export const getPendingFreelancers = async (
  clientId: string,
  pendingFreelancer: string | null | string[]
): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("pendingFreelancer", pendingFreelancer);

  return projects as Project[];
};

export const getOngoingProjects = async (clientId: string): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("status", "진행 중");

  return projects as Project[];
};

export const getTerminationedProjects = async (clientId: string): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("status", "진행 완료");

  return projects as Project[];
};

/* 프리랜서 승인 API */
export const updateApprovalFreelancer = async (
  userId: string,
  projectId: string,
  endDate: string
) => {
  return await supabase
    .from("projects")
    .update({
      freelancerId: userId,
      status: "진행 중",
      date: { endDate, startDate: dayjs().format("YYYY-MM-DD") },
    })
    .match({ projectId });
};

/* 신청 및 보류된 프리랜서 목록 초기화 API */
export const deleteVolunteerAndPendingFreelancer = async (projectId: string) => {
  return await supabase
    .from("projects")
    .update({ volunteer: [], pendingFreelancer: [] })
    .match({ projectId });
};

/* 프리랜서 보류 */
export const updatePendingFreelancer = async (
  projectId: string,
  updateVolunteer: string[],
  pendingFreelancer: string[]
) => {
  return await supabase
    .from("projects")
    .update({ volunteer: updateVolunteer, pendingFreelancer })
    .match({ projectId });
};

/* 보류된 프리렌서 거절 */
export const deletePendingFreelancer = async (
  projectId: string,
  updatePendingFreelancer: string[]
) => {
  return await supabase
    .from("projects")
    .update({ pendingFreelancer: updatePendingFreelancer })
    .match({ projectId });
};
