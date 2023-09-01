import supabase from "../config/supabaseClient";

export const getFreelancerResumeProfileIntro = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("resumeProfileIntro")
    .eq("userId", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to update profile intro");
  }
  return data;
};

export const addFreelancerResumeProfileIntro = async ({
  newProfileIntroInput,
  userId,
}: {
  newProfileIntroInput: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      resumeProfileIntro: newProfileIntroInput,
    })
    .eq("userId", userId)
    .select();

  if (error) {
    throw new Error("Failed to update profile intro");
  }
  return data;
};

export const updateFreelancerResumeProfileIntro = async ({
  newProfileIntroInput,
  userId,
}: {
  newProfileIntroInput: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      resumeProfileIntro: newProfileIntroInput,
    })
    .eq("userId", userId)
    .select();

  if (error) {
    throw new Error("Failed to update profile intro");
  }

  return data;
};
