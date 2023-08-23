import React from "react";
import { usePortfolioFiles } from "src/hooks/usePortfolioFiles";
import usePortfolioGetFiles from "src/hooks/usePortfolioGetFiles";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import { useUserStore } from "src/zustand/useUserStore";

const PortfolioThumbnailCard = () => {
  const { userId } = useUserStore();
  const { files } = usePortfolioGetFiles("thumbnail");
  console.log(files[0]);

  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolioThumbnail";
  const fileSrc =
    files.length > 0
      ? CDNURL + `/${userId}/thumbnailFolder/${files[0].name}`
      : "";
  console.log(fileSrc);

  return (
    <img
      className="portfolioThumbnail"
      src={fileSrc}
      alt="img"
      width="120px"
      height="120px"
      style={{ marginLeft: "10px" }}
    />
  );
};

export default PortfolioThumbnailCard;
