import supabase from "../config/supabaseClient";

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
}: {
  profileIntroText: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      userId: userId,
      resumeProfileIntro: profileIntroText,
    })
    .select();
  return data;
};

export const patchFreelancerResumeProfileIntro = async ({
  editedProfileIntroText,
  userId,
}: {
  editedProfileIntroText: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update([
      {
        userId: userId,
        resumeProfileIntro: editedProfileIntroText,
      },
    ])
    .select();

  if (error) {
    throw new Error("Failed to update profile intro");
  }

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
}: {
  newData: object;
  userId: string;
}) => {
  // 기존 데이터 가져오기
  const { data: existingData, error: existingError } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  // 병합된 데이터
  if (existingData && Array.isArray(existingData[0]?.resumeExperience)) {
    // existingData가 존재하고 + 그 안의 resumeExperience가 배열인 경우 (=즉, 기존 데이터가 있을 때)
    const combinedData = {
      resumeExperience: [
        ...(existingData?.[0]?.resumeExperience || []),
        newData,
      ],
    };
    await supabase
      .from("users")
      .update({
        resumeExperience: combinedData.resumeExperience,
        userId: userId,
      })
      .select();
  } else {
    // 기존 데이터가 없거나, resumeExperience가 배열이 아닌 경우 예외처리
    const combinedData = {
      resumeExperience: [newData],
    };
    await supabase
      .from("users")
      .upsert({
        resumeExperience: combinedData.resumeExperience,
        userId: userId,
      })
      .select();
  }
};
