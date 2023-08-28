import supabase from "../config/supabaseClient";

export const getExperience = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);
  return data;
};

interface Userexperience {
  experienceId: string;
  pastWorkField: string;
  pastEmploymentType: string;
  pastWorkDuration: {
    pastWorkEndDate: string;
    pastWorkStartDate: string;
  };
  pastWorkPlace: string;
  pastWorkPosition: string;
}
export const addExperience = async ({
  newData,
  userId,
}: {
  newData: Userexperience;
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
    experienceId: newData.experienceId,
    pastWorkField: newData.pastWorkField,
    pastEmploymentType: newData.pastEmploymentType,
    pastWorkDuration: {
      pastWorkEndDate: newData.pastWorkDuration.pastWorkEndDate,
      pastWorkStartDate: newData.pastWorkDuration.pastWorkStartDate,
    },
    pastWorkPlace: newData.pastWorkPlace,
    pastWorkPosition: newData.pastWorkPosition,
  });

  // 업데이트 데이터 저장
  const { data: accumulatedData } = await supabase
    .from("users")
    .update({ resumeExperience: currentExperience })
    .eq("userId", userId)
    .select();

  console.log("accumulatedData", accumulatedData);
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
    (experience: Userexperience) => experience.experienceId !== experienceId
  );

  // 업데이트 데이터 저장
  const { data: accumulatedData } = await supabase
    .from("users")
    .update({ resumeExperience: updatedExperience })
    .eq("userId", userId)
    .select();
};

export const updateExperience = async ({
  userId,
  experienceId,
  updatedData,
}: {
  userId: string;
  experienceId: string;
  updatedData: {
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
    (experience: Userexperience) => {
      if (experience.experienceId === experienceId) {
        return {
          experienceId, // id
          ...updatedData,
        };
      }
      return experience;
    }
  );

  // 업데이트 데이터 저장
  const { data: updatedUserData } = await supabase
    .from("users")
    .update({ resumeExperience: updatedExperience })
    .eq("userId", userId)
    .select();
};
