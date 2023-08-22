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

//------------------------------------------------------------------//
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

export const uploadFreelancerImage = async (userId: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("users")
    .upload(userId + "/" + uuidv4(), file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

//------------------------------------------------------------------//
// 이력서 tab
export const getFreelancerResumeProfileIntro = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("resumeProfileIntro")
    .eq("userId", userId);
  return data;
};

export const addFreelancerResumeProfileIntro = async ({
  profileIntroText,
  userId /** zustand */,
  freelancerRole /** zustand */,
  name /** zustand */,
  photoURL,
}: {
  profileIntroText: string;
  userId: string;
  freelancerRole: string;
  name: string;
  photoURL: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .upsert({
      userId: userId,
      role: freelancerRole,
      resumeProfileIntro: profileIntroText,
      name: name /**info탭의 zustand name으로 upsert를 하는데, name이 ""으로 업데이트되는 issue*/,
      photoURL: photoURL,
    })
    .select();
  return data;
};

export const getFreelancerResumeExperience = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);
  return data;
};

export const addFreelancerResumeExperience = async ({
  newData,
  userId,
  freelancerRole,
  name,
  photoURL,
}: {
  newData: object;
  userId: string;
  freelancerRole: string;
  name: string;
  photoURL: string;
}) => {
  // 기존 데이터 가져오기
  const { data: existingData, error: existingError } = await supabase // existingData: [{resumeExperience: {…}}]
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  // console.log(existingData);

  /**
   * existingData = [
  {
    resumeExperience: [
      // 여기에 기존 경력 데이터가 배열로 들어갑니다.
      {
        pastWorkDuration: {
          pastWorkEndDate: "2023-01-31",
          pastWorkStartDate: "2022-01-01",
        },
        pastWorkPlace: "Company A",
        pastWorkPosition: "Developer",
      },
      {
        pastWorkDuration: {
          pastWorkEndDate: "2022-12-31",
          pastWorkStartDate: "2022-06-01",
        },
        pastWorkPlace: "Company B",
        pastWorkPosition: "Designer",
      },
    ],
  },
];
   */

  /**
   * newData = {
    pastWorkDuration: {
      pastWorkEndDate: "2023-12-31",
      pastWorkStartDate: "2023-06-01",
    },
    pastWorkPlace: "Company C",
    pastWorkPosition: "Project Manager",
  };
  */

  // 병합된 데이터
  if (existingData && Array.isArray(existingData[0]?.resumeExperience)) {
    // existingData가 존재하고 + 그 안의 resumeExperience가 배열인 경우 (=즉, 기존 데이터가 있을 때)
    const combinedData = {
      resumeExperience: [
        ...(existingData?.[0]?.resumeExperience || []),
        newData,
      ],
    };
    const { data, error } = await supabase
      .from("users")
      .upsert({
        resumeExperience: combinedData.resumeExperience,
        userId: userId,
        role: freelancerRole,
        name: name,
        photoURL: photoURL,
      })
      .select();
  } else {
    // 기존 데이터가 없거나, resumeExperience가 배열이 아닌 경우 예외처리
    const combinedData = {
      resumeExperience: [newData],
    };
    const { data, error } = await supabase
      .from("users")
      .upsert({
        resumeExperience: combinedData.resumeExperience,
        userId: userId,
        role: freelancerRole,
        name: name,
        photoURL: photoURL,
      })
      .select();
  }
};

// export const addFreelancerResumeExperience = async ({
//   newData,
//   userId,
//   freelancerRole,
//   name,
//   photoURL,
// }: {
//   newData: object;
//   userId: string;
//   freelancerRole: string;
//   name: string;
//   photoURL: string;
// }) => {
//   const { data, error } = await supabase
//     .from("users")
//     .upsert({
//       resumeExperience: newData,
//       userId: userId,
//       role: freelancerRole,
//       name: name,
//       photoURL: photoURL,
//     })
//     .select();
//   return data;
// };
