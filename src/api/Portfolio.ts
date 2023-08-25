import { useUserStore } from "src/zustand/useUserStore";
import supabase from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const getPortfolios = async () => {
  try {
    const { data, error } = await supabase.from("portfolios").select("*");
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

export const getPortfolio = async (id: string) => {
  try {
    const { data } = await supabase
      .from("portfolios")
      .select()
      .eq("freelancerId", id);

    return data;
  } catch (error) {
    throw new Error("포토폴리오 정보를 가져오지 못했습니다.");
  }
};

//
export const getPortfolioInfo = async (userId: string) => {
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .eq("freelancerId", userId)
    .order("created_at", { ascending: true });
  console.log(portfolios);

  return portfolios;
};

interface NewPortfolioInfo {
  title: string;
  desc: string;
}
export const addPortfolioInfo = async ({
  newPortfolioInfo,
  userId,
}: {
  newPortfolioInfo: NewPortfolioInfo;
  userId: string;
}) => {
  await supabase
    .from("portfolios")
    .insert({
      title: newPortfolioInfo.title,
      desc: newPortfolioInfo.desc,
      freelancerId: userId,
    })
    .select();
};
// 파일
export const uploadPortfolioFile = async ({
  userId,
  file,
}: {
  userId: string;
  file: File;
}) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/${uuidv4()}`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};
