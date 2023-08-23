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

//--------------------------------------------------------------//
// ❶커스텀훅
export const uploadPortfolioFile = async ({
  userId,
  fileType,
  file,
}: {
  userId: string;
  fileType: string;
  file: File;
}) => {
  // thumbnail => thumbnailFolder로 명 변경해준뒤
  const getFolderName = (fileType: string) => {
    let folder = "";
    switch (fileType) {
      case "thumbnail":
        folder = "thumbnailFolder";
        break;
      case "PDF":
        folder = "PDFFolder";
        break;
      case "link":
        folder = "linkFolder";
        break;
      default:
        // 기본값
        folder = "unknownFolder";
        break;
    }
    return folder;
  };
  const folder = getFolderName(fileType);

  //
  const { data, error } = await supabase.storage
    .from("portfolioThumbnail")
    .upload(`${userId}/${folder}/${uuidv4()}`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

///////////////////////////////////////////////////////////////
// ❶포트폴리오 썸네일
export const uploadFreelancerPortfolioThumbnail = async (
  userId: string,
  file: File,
  thumbnailFolder: string
) => {
  const { data, error } = await supabase.storage
    .from("portfolioThumbnail")
    .upload(userId + "/" + thumbnailFolder + "/" + uuidv4(), file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};
export const getFreelancerPortfolioThumbnail = async (
  userId: string,
  thumbnailFolder: string
) => {
  const { data, error } = await supabase.storage
    .from("portfolioThumbnail")
    .list(userId + "/" + thumbnailFolder + "/", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    throw new Error("Error loading images");
  }
  data.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();

    return timeB - timeA;
  });

  return data || [];
};

// ❷포트폴리오 pdf
export const uploadFreelancerPortfolioPDF = async (
  userId: string,
  file: File,
  PDFFolder: string
) => {
  const { data, error } = await supabase.storage
    .from("portfolioThumbnail")
    .upload(userId + "/" + PDFFolder + "/" + uuidv4(), file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

export const getFreelancerPortfolioPDF = async (
  userId: string,
  PDFFolder: string
) => {
  const { data, error } = await supabase.storage
    .from("portfolioThumbnail")
    .list(userId + "/" + PDFFolder + "/", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    throw new Error("Error loading images");
  }
  data.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();

    return timeB - timeA;
  });

  return data || [];
};
