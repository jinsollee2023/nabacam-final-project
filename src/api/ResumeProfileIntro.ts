import supabase from "../config/supabaseClient";

export const getFreelancerResumeProfileIntro = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("resumeProfileIntro")
    .eq("userId", userId)
    .maybeSingle();
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
  return data;
};

export const updateFreelancerResumeProfileIntro = async ({
  editedProfileIntroInput,
  userId,
}: {
  editedProfileIntroInput: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update([
      {
        userId: userId,
        resumeProfileIntro: editedProfileIntroInput,
      },
    ])
    .select();

  if (error) {
    throw new Error("Failed to update profile intro");
  }

  return data;
};
