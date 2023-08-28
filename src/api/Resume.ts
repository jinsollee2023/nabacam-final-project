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
