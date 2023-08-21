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
    const { data } = await supabase.from("portfolios").select().eq("freelancerId", id);

    return data;
  } catch (error) {
    throw new Error("포토폴리오 정보를 가져오지 못했습니다.");
  }
};
