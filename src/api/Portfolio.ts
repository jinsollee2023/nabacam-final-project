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
export const getFolderName = (fileType: string) => {
  let folder = "";
  switch (fileType) {
    case "thumbnail":
      folder = "thumbnail";
      break;
    case "PDF":
      folder = "pdf";
      break;
    case "link":
      folder = "link";
      break;
    default:
      // 기본값
      folder = "unknownFolder";
      break;
  }
  return folder;
};

export const uploadPortfolioFile = async ({
  userId,
  projectId,
  fileType,
  file,
}: {
  userId: string;
  projectId: string;
  fileType: string;
  file: File;
}) => {
  // 폴더명 변경
  const folder = getFolderName(fileType);

  const { data, error } = await supabase.storage
    .from("portfolios")
    .upload(`${userId}/${projectId}/${folder}/${uuidv4()}`, file);

  if (error) {
    throw new Error("Error uploading image");
  }

  return data;
};

export const getPortfolioFiles = async ({
  userId,
  projectId,
  fileType,
}: {
  userId: string;
  projectId: string;
  fileType: string;
}) => {
  // 폴더명 변경
  const folder = getFolderName(fileType);
  const { data, error } = await supabase.storage
    .from("portfolios")
    .list(`${userId}/${projectId}/${folder}/`, {
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

///////////////////////////////////////////////////////////////

export const getFreelancerPortfolioThumbnail = async (
  userId: string,
  thumbnailFolder: string
) => {
  const { data, error } = await supabase.storage
    .from("portfolios")
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
