import { Project } from "../Types";
import supabase from "../config/supabaseClient";
import dayjs from "dayjs";

// 프로젝트의 전체 항목 생성일 순으로 가져온다.
export const getProjects = async (id: string): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  return projects as Project[];
};

export const getOngoingProjectsOfFreelancer = async (
  id: string
): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("freelancerId", id)
    .eq("status", "진행 중")
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

// 현재 로그인한 클라이언트의 프로젝트 중에서
// 상태가 진행 전인 프로젝트 리스트 불러오기
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
        expectedStartDate: newProject.expectedStartDate,
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
    expectedStartDate?: string;
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

// 선택한 프로젝트에 제안했던 프리랜서 리스트 가져오기
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
      case "시작 예정일 빠른 순":
        orderByField = "expectedStartDate";
        ascending = true;
        break;
      case "시작 예정일 느린 순":
        orderByField = "expectedStartDate";
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
      .order(orderByField, { ascending });
    // .eq("status", "진행 전");
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

export const getOngoingProjectsOfClient = async (
  clientId: string
): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("status", "진행 중")
    .order("created_at", { ascending: true });

  return projects as Project[];
};

export const getTerminationedProjects = async (
  clientId: string
): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("status", "진행 완료");

  return projects as Project[];
};

export const getTerminationedProjectsWithFreelancer = async (
  clientId: string,
  freelancerId: string
): Promise<Project[]> => {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("clientId", clientId)
    .eq("freelancerId", freelancerId)
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

/* 지원한 프리랜서&보류한 프리랜서 탭에서 계약된 프리랜서 목록 삭제 API */
export const deleteVolunteerAndPendingFreelancer = async (
  projectId: string,
  updateVolunteer: string[],
  updatePendingFreelancer: string[]
) => {
  return await supabase
    .from("projects")
    .update({
      volunteer: updateVolunteer,
      pendingFreelancer: updatePendingFreelancer,
    })
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
