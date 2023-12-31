import { IInpiniteUser, User } from "../Types";
import supabase from "../config/supabaseClient";

export const getUser = async (userId: string): Promise<User> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("userId", userId)
      .maybeSingle();
    if (error) {
      console.error(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.???\n ${error.message}`
      );
    }
    return data as User;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getFreelancers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "freelancer");
    if (error) {
      console.error(
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
      console.error(
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
      .eq("userId", id)
      .maybeSingle();

    if (error) {
      console.error(
        `사용자 정보를 가져오는 중 오류가 발생했습니다????.\n ${error.message}`
      );
    }
    return data as User;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

// 선택한 SortLabel를 기준으로 정렬된 프리랜서 데이터 불러오기
export const getFreelancersBySort = async (
  sortLabel: string,
  page: number
): Promise<IInpiniteUser> => {
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
      default:
        orderByField = "workExp";
        ascending = false;
        break;
    }

    const {
      data: users,
      error,
      count,
    } = await supabase
      .from("users")
      .select("*", { count: "exact" })
      .eq("role", "freelancer")
      .range(page * 6 - 6, page * 6 - 1)
      .order(orderByField, { ascending });
    if (error) {
      console.error(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return { user: users as User[], total_count: count as number };
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

// 마이페이지
export const getFreelancer = async (userId: string) => {
  let { data: freelancer, error } = await supabase
    .from("users")
    .select("name, contact, workField, projectId, resumeProfileIntro, photoURL")
    .eq("userId", userId)
    .maybeSingle();
  return freelancer;
};

export const updateUser = async ({
  updatedData,
  userId,
  setUser,
}: {
  updatedData: {
    name?: string;
    workField?: {
      workField: string;
      workSmallField: string;
    };
    contact?: {
      email: string;
      phone: string;
    };
    projectId?: string;
    photoURL?: string;
    members?: [
      {
        name: string;
        team: string;
        contact: {
          email: string;
          phone: string;
        };
      }
    ];
  };
  userId: string;
  setUser: (user: User) => void;
}) => {
  try {
    const { data } = await supabase
      .from("users")
      .update(updatedData)
      .eq("userId", userId)
      .select();
    if (data && data.length > 0) {
      setUser(data[0]);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const getPhotoURL = async (filePath: {
  path: string;
}): Promise<string> => {
  const { data } = await supabase.storage
    .from("users") // 사용한 버킷 이름
    .getPublicUrl(filePath.path);
  return data.publicUrl;
};

export const getPortfolioFileURL = async (filePath: {
  path: string;
}): Promise<string> => {
  const { data } = await supabase.storage
    .from("portfolios") // 사용한 버킷 이름
    .getPublicUrl(filePath.path);
  return data.publicUrl;
};

export const uploadUserImage: (
  userId: string | undefined,
  file: File
) => Promise<{
  path: string;
}> = async (userId: string | undefined, file: File) => {
  const { data, error } = await supabase.storage
    .from("users")
    .upload(`${userId}/profileImage`, file);

  if (error) {
    throw new Error("Error uploading image");
  }
  return data;
};

export const updateUserImage = async (userId: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("users")
    .update(`${userId}/profileImage`, file, {
      cacheControl: "1",
      upsert: true,
    });

  if (error) {
    throw new Error("Error uploading image");
  }
  return data;
};

export const updateClientMembers = async ({
  updatedData,
  userId,
}: {
  updatedData: object;
  userId: string;
}) => {
  await supabase
    .from("users")
    .update(updatedData)
    .eq("userId", userId)
    .select();
};

export const addProjectIdToUser = async (
  userId: string,
  projectIds: string[]
) => {
  return await supabase
    .from("users")
    .update({ projectId: projectIds })
    .eq("userId", userId);
};
