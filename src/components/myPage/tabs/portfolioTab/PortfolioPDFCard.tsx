import React from "react";
import usePortfolioGetFiles from "src/hooks/usePortfolioGetFiles";
import { useUserStore } from "src/zustand/useUserStore";

const PortfolioPDFCard = ({ file }: any) => {
  const { userId, projectId } = useUserStore();
  // console.log("pdffile", file); // files 배열 중 한 요소
  // console.log("여기", file.thumbnailUrl);

  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios";
  const PDFfileSrc =
    file && file.name
      ? CDNURL + `/${userId}/${projectId}/pdf/${file.name}`
      : "";
  // console.log("pdffilesrc", PDFfileSrc);

  // PDF 파일을 링크로 표시하기
  const viewPdfLink = (
    <a href={PDFfileSrc} target="_blank" rel="noopener noreferrer">
      PDF 열기
    </a>
  );

  return <div>{viewPdfLink}</div>;

  /** */
};

export default PortfolioPDFCard;
