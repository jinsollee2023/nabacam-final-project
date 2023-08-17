import supabase from "../config/supabaseClient";
import { User } from "../Types";

const getApplicantFreelancers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select().eq("role", "freelancer");

  if (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  return data;
};

export { getApplicantFreelancers };
