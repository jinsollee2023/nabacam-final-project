import supabase from "../config/supabaseClient";

export const getExperience = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);
  return data;
};

export const addExperience = async ({
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

export const deleteExperience = async (userId: string) => {
  await supabase
    .from("users")
    .update({ resumeExperience: null })
    .eq("userId", userId)
    .select();
};
