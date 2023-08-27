import supabase from "../config/supabaseClient";

export const getExperience = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("resumeExperience")
    .eq("userId", userId);
  return data;
};

interface NewData {
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

export const deleteExperience = async (userId: string) => {
  await supabase
    .from("users")
    .update({ resumeExperience: null })
    .eq("userId", userId)
    .select();
};
