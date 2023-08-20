import supabase from "../config/supabaseClient";

export const getPortfolios = async () => {
  try {
    const { data, error } = await supabase.from("portfolios").select("*");
    if (error) {
      alert(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`);
  }
};

export const getPortfolio = async (id: string) => {
  try {
    const { data, error } = await supabase.from("portfolios").select().eq("freelancerId", id);

    if (error) {
      return alert(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`사용자 정보를 가져오는 중 오류가 발생했습니다.\n ${error}`);
  }
};
