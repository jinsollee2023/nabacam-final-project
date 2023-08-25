import React from "react";
import { useUserStore } from "src/zustand/useUserStore";

const PortfolioFilesCard = ({ files, pfId }: { files: any; pfId: string }) => {
  const { userId } = useUserStore();

  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios";

  const thumbnailSrc =
    files[0] && files[0].name
      ? CDNURL + `/${userId}/${pfId}/thumbnail/${files[0].name}`
      : "";
  const PDFSrc =
    files[0] && files[0].name
      ? CDNURL + `/${userId}/${pfId}/pdf/${files[0].name}`
      : "";
  console.log(thumbnailSrc);
  console.log(PDFSrc);

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
