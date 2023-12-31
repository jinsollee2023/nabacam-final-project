import supabase from "../config/supabaseClient";
import type { ResumeExperience } from "../Types";

export const getExperience = async (userId: string) => {
  let { data } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId)
    .maybeSingle();

  const resumeExperienceArray = data?.resumeExperience || [];

  return resumeExperienceArray;
};

export const addExperience = async ({
  newExperience,
  userId,
}: {
  newExperience: ResumeExperience;
  userId: string;
}) => {
  // 기존 데이터
  const { data: prevData, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  if (error) {
    return;
  }
  // + 새로운 데이터
  const currentExperience = prevData[0].resumeExperience || [];
  currentExperience.push({
    experienceId: newExperience.experienceId,
    pastWorkField: newExperience.pastWorkField,
    pastEmploymentType: newExperience.pastEmploymentType,
    pastWorkDuration: {
      pastWorkEndDate: newExperience.pastWorkDuration.pastWorkEndDate,
      pastWorkStartDate: newExperience.pastWorkDuration.pastWorkStartDate,
    },
    pastWorkPlace: newExperience.pastWorkPlace,
    pastWorkPosition: newExperience.pastWorkPosition,
  });
  // 업데이트 데이터 저장
  await supabase
    .from("users")
    .update({ resumeExperience: currentExperience })
    .eq("userId", userId)
    .select();
};

// 삭제, 수정
export const deleteExperience = async ({
  userId,
  experienceId,
}: {
  userId: string;
  experienceId: string;
}) => {
  const { data: prevData, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  if (error) {
    return;
  }

  // 기존 데이터에서, experienceId와 일치하는 데이터를 찾아서 삭제
  const currentExperience = prevData[0].resumeExperience || [];
  const updatedExperience = currentExperience.filter(
    (experience: ResumeExperience) => experience.experienceId !== experienceId
  );

  // 업데이트 데이터 저장
  await supabase
    .from("users")
    .update({ resumeExperience: updatedExperience })
    .eq("userId", userId)
    .select();
};

export const updateExperience = async ({
  userId,
  experienceId,
  newExperience,
}: {
  userId: string;
  experienceId: string;
  newExperience: {
    pastWorkField: string;
    pastEmploymentType: string;
    pastWorkDuration: {
      pastWorkEndDate: string;
      pastWorkStartDate: string;
    };
    pastWorkPlace: string;
    pastWorkPosition: string;
  };
}) => {
  // 기존 데이터
  const { data: prevData, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  if (error) {
    return;
  }
  // experienceId와 일치하는 데이터 찾아서 업데이트
  const currentExperience = prevData[0].resumeExperience || [];
  const updatedExperience = currentExperience.map(
    (experience: ResumeExperience) => {
      if (experience.experienceId === experienceId) {
        return {
          experienceId,
          ...newExperience,
        };
      }
      return experience;
    }
  );
  // 업데이트 데이터 저장
  await supabase
    .from("users")
    .update({ resumeExperience: updatedExperience })
    .eq("userId", userId)
    .select();
};

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
