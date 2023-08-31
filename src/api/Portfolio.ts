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

// 8/26 수정
export const getPortfolio = async (id: string) => {
  try {
    const { data } = await supabase
      .from("portfolios")
      .select(
        "freelancerId, portfolioId, title, desc, linkURL, thumbNailURL, pdfFileURL"
      )
      .eq("freelancerId", id);

    return data;
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

// pdf
export const uploadPDF = async ({
  userId,
  file,
  pfId,
  PDFFileName,
}: {
  userId: string;
  file: File;
  pfId: string;
  PDFFileName: string;
}) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/pdf/${PDFFileName}`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

//------------------------------------------------------
interface NewPortfolioData {
  portfolioId: string;
  title: string;
  desc: string;
  linkURL?: string;
  thumbNailURL?: string | null;
  pdfFileURL?: string | null;
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
      linkURL: newPortfolioData.linkURL,
      thumbNailURL: newPortfolioData.thumbNailURL,
      pdfFileURL: newPortfolioData.pdfFileURL,
    })
    .select();
};
