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

export const uploadThumbnail = async ({
  userId,
  file,
  pfId,
  thumbnailFileName,
}: {
  userId: string;
  file: File;
  pfId: string;
  thumbnailFileName: string;
}) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/thumbnail/${thumbnailFileName}`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

export const getThumbnailURL = async ({ userId }: { userId: string }) => {
  const { data: thumbnailURLData, error } = await supabase.storage
    .from("portfolios")
    .list(`${userId}/thumbnail`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    throw new Error("Error loading images");
  }

  return thumbnailURLData || [];
};

//------------------------------------------------------
interface NewPortfolioData {
  portfolioId: string;
  title: string;
  desc: string;
  thumbNailURL: string | null;
  // pdfURL: string;
}
export const addPortfolio = async ({
  newPortfolioData,
  userId,
  pfId,
}: {
  newPortfolioData: NewPortfolioData;
  userId: string;
  pfId: string;
}) => {
  const { data: portfolioData, error: portfolioError } = await supabase
    .from("portfolios")
    .insert({
      portfolioId: pfId,
      title: newPortfolioData.title,
      desc: newPortfolioData.desc,
      freelancerId: userId,
      thumbNailURL: newPortfolioData.thumbNailURL,
      // pdfURL: newPortfolioData.pdfURL,
    })
    .select();
};
