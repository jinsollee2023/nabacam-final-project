import { User } from "../Types";
import supabase from "../config/supabaseClient";

export const getFreelancers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "freelancer");
    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return data as User[];
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getClients = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "client");

    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`
      );
    }
    return data;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`
    );
  }
};

export const getFreelancersBySort = async (sortLabel: string) => {
  try {
    let orderByField = "";
    let ascending = true;

    switch (sortLabel) {
      case "경력 높은 순":
        orderByField = "workExp";
        ascending = false;
        break;
      case "경력 낮은 순":
        orderByField = "workExp";
        ascending = true;
        break;
      case "최근 가입 순":
        orderByField = "signUpDate";
        ascending = false;
        break;
      case "오래된 가입 순":
        orderByField = "signUpDate";
        ascending = true;
        break;
      case "포트폴리오 많은 순":
        orderByField = "portfolioCount";
        ascending = false;
        break;
      case "포트폴리오 적은 순":
        orderByField = "portfolioCount";
        ascending = true;
        break;
      default:
        orderByField = "workExp";
        ascending = false;
        break;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order(orderByField, { ascending });
    if (error) {
      alert(
        `사용자 정보를 가져오는 중 오류가 발생했습니다zz.\n ${error.message}`
      );
    }
    return data;
  } catch (error) {
    throw new Error(
      `사용자 정보를 가져오는 중 오류가 발생했습니다gg.\n ${error}`
    );
  }
};
