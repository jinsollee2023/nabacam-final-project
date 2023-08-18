import supabase from "../config/supabaseClient";
import { User } from "../Types";

const getApplicantFreelancers = async (): Promise<User[]> => {
  // supabase 'users'테이블에서 'role'이 'freelancer'인 데이터만 가져오기
  const { data, error } = await supabase.from("users").select().eq("role", "freelancer");

  if (error) {
    console.error("데이터 가져오기 오류:", error);
    throw error;
  }

  return data;
};

export { getApplicantFreelancers };
