import { IPortfolio, Portfolio } from "src/Types";
import supabase, { supabaseService } from "../config/supabaseClient";

export const getPortfolios = async () => {
  // 프리랜서 마켓에서 뿌려주기 위해 전체 포트폴리오 가져오기
  try {
    const { data, error } = await supabase.from("portfolios").select("*");
    if (error) {
      console.error(`전체 포트폴리오를 가져오는 중 오류가 발생했습니다.\n ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`전체 포트폴리오를 가져오는 중 오류가 발생했습니다.\n ${error}`);
  }
};

export const getFreelancerPortfolio = async (id: string) => {
  try {
    const { data } = await supabase.from("portfolios").select("*").eq("freelancerId", id);

    return data;
  } catch (error) {
    throw new Error("포토폴리오 정보를 가져오지 못했습니다.");
  }
};

// 8/26 수정
export const getPortfolio = async (id: string) => {
  try {
    const { data } = await supabase.from("portfolios").select("*").eq("freelancerId", id);

    return data;
  } catch (error) {
    throw new Error("포토폴리오 정보를 가져오지 못했습니다.");
  }
};

export const getMyPortfolio = async (id: string, page: number): Promise<IPortfolio> => {
  try {
    const { data: portfolio, count } = await supabase
      .from("portfolios")
      .select("*", { count: "exact" })
      .eq("freelancerId", id)
      .range(page * 10 - 10, page * 10 - 1);

    return { portfolio: portfolio as Portfolio[], total_count: count as number };
  } catch (error) {
    throw new Error("포토폴리오 정보를 가져오지 못했습니다.");
  }
};

//-------------------------------------------------------------------------------------------
// 썸네일
export const uploadThumbnail = async ({
  userId,
  file,
  pfId,
}: {
  userId: string;
  file: File;
  pfId: string;
}) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/${pfId}/thumbnail/`, file);
  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

// pdf
export const uploadPDF = async ({
  userId,
  file,
  pfId,
}: {
  userId: string;
  file: File;
  pfId: string;
}) => {
  const { data, error } = await supabaseService.storage
    .from("portfolios")
    .upload(`${userId}/${pfId}/pdf`, file);

  if (error) {
    throw new Error("Error uploading PDF");
  }
  return data;
};

//------------------------------------------------------
interface NewPortfolio {
  portfolioId: string;
  freelancerId: string;
  title: string;
  desc: string;
  linkURL?: string;
  thumbNailURL: string | File | null;
  pdfFileURL?: string | File | null;
}
export const addPortfolio = async ({
  newPortfolio,
  userId,
  pfId,
}: {
  newPortfolio: NewPortfolio;
  userId: string;
  pfId: string;
}) => {
  const { data: portfolioData, error: portfolioError } = await supabase
    .from("portfolios")
    .upsert({
      portfolioId: pfId,
      title: newPortfolio.title,
      desc: newPortfolio.desc,
      freelancerId: userId,
      linkURL: newPortfolio.linkURL,
      thumbNailURL: newPortfolio.thumbNailURL,
      pdfFileURL: newPortfolio.pdfFileURL,
    })
    .select();
};

export const deletePortfolio = async (portfolioId: string, freelancerId: string): Promise<void> => {
  await supabase.from("portfolios").delete().eq("portfolioId", portfolioId);
  await supabase.storage
    .from("portfolios")
    .remove([`${freelancerId}/${portfolioId}/pdf`, `${freelancerId}/${portfolioId}/thumbnail`]);
};

export const updatePortfolioFile = async (
  userId: string,
  pfId: string,
  fileType: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
    .update(`${userId}/${pfId}/${fileType}`, file, {
      cacheControl: "1",
      upsert: true,
    });
  if (error) {
    throw new Error("Error uploading file");
  }
  return data;
};

export const updatePortfolio = async ({
  updatedData,
  pfId,
}: {
  updatedData: {
    freelancerId: string;
    title: string;
    desc: string;
    linkURL: string;
    thumbNailURL: string;
    pdfFileURL: string;
  };
  pfId: string;
}) => {
  try {
    await supabase.from("portfolios").update(updatedData).eq("portfolioId", pfId).select();
  } catch (error) {
    console.error("Error updating portfolio:", error);
  }
};
