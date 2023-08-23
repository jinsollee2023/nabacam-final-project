import React from "react";
import usePortfolioGetFiles from "src/hooks/usePortfolioGetFiles";
import { useUserStore } from "src/zustand/useUserStore";

const PortfolioPDFCard = ({ file }: any) => {
  const { userId } = useUserStore();
  console.log("이거", file);
  console.log("여기", file.thumbnailUrl);

  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolioThumbnail";
  const fileSrc =
    file && file.name ? CDNURL + `/${userId}/PDFFolder/${file.name}` : "";
  // console.log(fileSrc);

  // PDF 파일을 링크로 표시하기
  const viewPdfLink = (
    <a href={fileSrc} target="_blank" rel="noopener noreferrer">
      PDF 열기
    </a>
  );

  // 대표 이미지 링크
  const thumbnailSrc = file && file.thumbnailUrl ? file.thumbnailUrl : "";

  return (
    <div>
      {viewPdfLink}
      <br />
      {thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt="대표 이미지"
          width="30px"
          height="30px"
          style={{ marginLeft: "10px" }}
        />
      )}
      <br />
    </div>
  );

  /** */
};

export default PortfolioPDFCard;
