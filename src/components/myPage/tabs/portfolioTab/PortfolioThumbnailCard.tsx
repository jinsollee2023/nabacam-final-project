import React from "react";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";

const PortfolioThumbnailCard = () => {
  const { portfolioThumbnailSrc } = usePortfolioStore();
  // console.log(portfolioThumbnailSrc);
  return (
    <img
      className="portfolioThumbnail"
      src={portfolioThumbnailSrc}
      alt="img"
      width="120px"
      height="120px"
      style={{ marginLeft: "10px" }}
    />
  );
};

export default PortfolioThumbnailCard;
