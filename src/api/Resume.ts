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
      name: name,
      photoURL: photoURL,
    })
    .select();
  return data;
};

export const patchFreelancerResumeProfileIntro = async ({
  editedProfileIntroText,
  userId,
  freelancerRole,
  name,
  photoURL,
}: {
  editedProfileIntroText: string;
  userId: string;
  freelancerRole: string;
  name: string;
  photoURL: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .upsert([
      {
        userId: userId,
        resumeProfileIntro: editedProfileIntroText,
        role: freelancerRole,
        name: name,
        photoURL: photoURL,
      },
    ])
    .select();

  if (error) {
    throw new Error("Failed to update profile intro");
  }

  return data;
};
