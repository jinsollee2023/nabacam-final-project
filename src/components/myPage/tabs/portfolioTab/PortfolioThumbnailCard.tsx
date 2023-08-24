import React from "react";
import { usePortfolioUploadFiles } from "src/hooks/usePortfolioUploadFiles";
import usePortfolioGetFiles from "src/hooks/usePortfolioGetFiles";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import { useUserStore } from "src/zustand/useUserStore";

const PortfolioThumbnailCard = ({ file }: any) => {
  const { userId, projectId } = useUserStore();
  // console.log("thumbnailfile", file);

  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios";
  const thumbnailFileSrc =
    file && file.name
      ? CDNURL + `/${userId}/${projectId}/thumbnail/${file.name}`
      : "";
  // console.log("thumbnailfilesrc", thumbnailFileSrc);

  return (
    <img
      className="portfolioThumbnail"
      src={thumbnailFileSrc}
      alt="img"
      width="120px"
      height="120px"
      style={{ marginLeft: "10px" }}
    />
  );
};

export default PortfolioThumbnailCard;
