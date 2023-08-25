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

//-------------------------------------------------------------------------------------------
export const getPortfolioInfo = async (userId: string) => {
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .eq("freelancerId", userId)
    //.eq("portfolioId", pfId)
    .order("created_at", { ascending: true });

  return portfolios;
};

interface NewPortfolioInfo {
  title: string;
  desc: string;
}
export const addPortfolioInfo = async ({
  newPortfolioInfo,
  userId,
  pfId,
}: {
  newPortfolioInfo: NewPortfolioInfo;
  userId: string;
  pfId: string;
}) => {
  await supabase
    .from("portfolios")
    .insert({
      title: newPortfolioInfo.title,
      desc: newPortfolioInfo.desc,
      freelancerId: userId,
      portfolioId: pfId,
    })
    .select();
};
// 파일
export const uploadPortfolioFile = async ({
  userId,
  file,
  fileType,
  pfId,
}: {
  userId: string;
  file: File;
  fileType: "thumbnail" | "pdf";
  pfId: string;
}) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/${pfId}/${fileType}/${uuidv4()}`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};
export const getPortfolioFile = async ({
  userId,
  fileType,
  pfId,
}: {
  userId: string;
  fileType: "thumbnail" | "PDF";
  pfId: string;
}) => {
  // console.log("get pfId", pfId);
  const { data: filesData, error } = await supabase.storage
    .from("portfolios")
    .list(`${userId}/${pfId}/${fileType}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    throw new Error("Error loading images");
  }

  const filteredFilesData = filesData.filter(
    (file) => file.name !== ".emptyFolderPlaceholder"
  );

  filteredFilesData.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();

    return timeB - timeA;
  });

  console.log("filteredFilesData>", filteredFilesData);

  return filteredFilesData || [];
};
