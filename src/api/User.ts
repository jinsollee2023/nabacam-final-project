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

export const getClients = async () => {
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
    return data;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getLoggedInFreelancer = async (userId: string) => {
  let { data: users, error } = await supabase
    .from("users")
    .select("name, contact, workField, projectId")
    .eq("userId", userId);
  // .single();
  return users;
};

// Add: 회원가입 시 추가
// export const addLoggedInFreelancer = async () => {
//   await supabase.from("users").insert().select()
// }

export const updateLoggedInFreelancer = async ({
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
export const getLoggedInFreelancerImage = async (userId: string) => {
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
  /**
   * storage에서 시간순으로 정렬해주는 api를 못찾아서 직접 정렬해줌
   */
  data.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();

    return timeB - timeA;
  });

  return data || [];
};

export const uploadLoggedInFreelancerImage = async (
  userId: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from("users")
    .upload(userId + "/" + uuidv4(), file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};
