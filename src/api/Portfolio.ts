import supabase from "../config/supabaseClient";

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
  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/${pfId}/pdf/`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

//------------------------------------------------------
interface NewPortfolio {
  portfolioId: string;
  title: string;
  desc: string;
  linkURL?: string;
  thumbNailURL?: string | File | null;
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
    .insert({
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
