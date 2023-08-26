import { User } from "../Types";
import supabase from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const getFreelancers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "freelancer");
    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return data as User[];
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getClients = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "client");

    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return data as User[];
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getClientByProject = async (id: string): Promise<User> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "client")
      .match({ userId: id })
      .maybeSingle();

    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return data as User;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getFreelancersBySort = async (sortLabel: string) => {
  try {
    let orderByField = "";
    let ascending = true;

    switch (sortLabel) {
      case "경력 높은 순":
        orderByField = "workExp";
        ascending = false;
        break;
      case "경력 낮은 순":
        orderByField = "workExp";
        ascending = true;
        break;
      case "최근 가입 순":
        orderByField = "signUpDate";
        ascending = false;
        break;
      case "오래된 가입 순":
        orderByField = "signUpDate";
        ascending = true;
        break;
      case "포트폴리오 많은 순":
        orderByField = "portfolioCount";
        ascending = false;
        break;
      case "포트폴리오 적은 순":
        orderByField = "portfolioCount";
        ascending = true;
        break;
      default:
        orderByField = "workExp";
        ascending = false;
        break;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "freelancer")
      .order(orderByField, { ascending });
    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다zz.\n ${error.message}`
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다gg.\n ${error}`
    );
  }
};

// 마이페이지
export const getFreelancer = async (userId: string) => {
  let { data: users, error } = await supabase
    .from("users")
    .select("name, contact, workField, projectId, resumeProfileIntro")
    .eq("userId", userId);
  return users;
};

export const updateFreelancer = async ({
  updatedData,
  userId,
}: {
  updatedData: object;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("userId", userId)
    .select();
  // console.log(data);
};

// 프로필 이미지
export const getFreelancerImage = async (userId: string) => {
  const { data, error } = await supabase.storage
    .from("users")
    .list(userId + "/", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    throw new Error("Error loading images");
  }
  data.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();

    return timeB - timeA;
  });

  return data || [];
};

export const uploadFreelancerImage = async (userId: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("users")
    .upload(userId + "/" + uuidv4(), file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

export const uploadUserImage = async (userId: any, file: File) => {
  const { data, error } = await supabase.storage
    .from("users")
    .upload(userId + "/" + uuidv4(), file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};
