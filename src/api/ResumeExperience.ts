import supabase from "../config/supabaseClient";

export const getExperience = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);
  return data;
};

interface NewData {
  experienceId: string;
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
  newData: NewData;
  userId: string;
}) => {
  // 먼저 사용자의 현재 데이터를 가져옴
  const { data: prevData, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  if (error) {
    return;
  }

  // 기존 데이터를 가져온 후, 새로운 데이터를 추가
  const currentExperience = prevData[0].resumeExperience || []; // 데이터가 없으면 빈 배열로 시작
  currentExperience.push({
    experienceId: newData.experienceId,
    pastWorkDuration: {
      pastWorkEndDate: newData.pastWorkDuration.pastWorkEndDate,
      pastWorkStartDate: newData.pastWorkDuration.pastWorkStartDate,
    },
    pastWorkPlace: newData.pastWorkPlace,
    pastWorkPosition: newData.pastWorkPosition,
  });

  // 업데이트된 데이터를 다시 Supabase에 저장
  const { data: accumulatedData } = await supabase
    .from("users")
    .update({ resumeExperience: currentExperience })
    .eq("userId", userId)
    .select();

  console.log("accumulatedData", accumulatedData);
};

// 삭제, 수정
interface Experience {
  experienceId: string;
  pastWorkDuration: {
    pastWorkEndDate: string;
    pastWorkStartDate: string;
  };
  pastWorkPlace: string;
  pastWorkPosition: string;
}
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

  // 기존 데이터를 가져온 후, 특정 경력 데이터를 식별하여 삭제합니다.
  const currentExperience = prevData[0].resumeExperience || [];

  // experienceId와 일치하는 데이터를 찾아서 삭제

  const updatedExperience = currentExperience.filter(
    (experience: Experience) => experience.experienceId !== experienceId
  );

  // 업데이트된 데이터를 다시 Supabase에 저장합니다.
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
    pastWorkDuration: {
      pastWorkEndDate: string;
      pastWorkStartDate: string;
    };
    pastWorkPlace: string;
    pastWorkPosition: string;
  };
}) => {
  // 사용자의 현재 데이터를 가져옵니다.
  const { data: prevData, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);

  if (error) {
    return;
  }

  // 기존 데이터를 가져온 후, 특정 경력 데이터를 식별하여 업데이트합니다.
  const currentExperience = prevData[0].resumeExperience || [];

  // experienceId와 일치하는 데이터를 찾아서 업데이트
  const updatedExperience = currentExperience.map((experience: Experience) => {
    if (experience.experienceId === experienceId) {
      return {
        experienceId,
        ...updatedData,
      };
    }
    return experience;
  });

  // 업데이트된 데이터를 다시 Supabase에 저장합니다.
  const { data: accumulatedData } = await supabase
    .from("users")
    .update({ resumeExperience: updatedExperience })
    .eq("userId", userId)
    .select();
};
