import React from "react";
import { useUserStore } from "src/zustand/useUserStore";

const PortfolioFilesCard = ({ file }: any) => {
  const { userId } = useUserStore();

  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios";

  const thumbnailSrc =
    file && file.name ? CDNURL + `/${userId}/thumbnail/${file.name}` : "";
  const PDFSrc =
    file && file.name ? CDNURL + `/${userId}/pdf/${file.name}` : "";

  const viewPdfLink = (
    <>
      <img
        className="portfolioThumbnail"
        src={thumbnailSrc}
        alt="img"
        width="120px"
        height="120px"
        style={{ marginLeft: "10px" }}
      />
      <a href={PDFSrc} target="_blank" rel="noopener noreferrer">
        PDF 열기
      </a>
    </>
  );

  return <div>{viewPdfLink}</div>;
};

export default PortfolioFilesCard;
