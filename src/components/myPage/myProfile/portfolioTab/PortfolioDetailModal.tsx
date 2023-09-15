import React from "react";
import { S } from "./portfolioDetailModal.styles";
import { usePortfolioStore } from "src/store/usePortfolioStore";

interface PortfolioDetailModalProps {
  setIsDetailModalOpen?: (isOpen: boolean) => void;
  isAddModalOpen?: boolean;
  setIsAddModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const PortfolioDetailModal = ({ userId }: PortfolioDetailModalProps) => {
  const { selectedPortfolio } = usePortfolioStore();
  return (
    <>
      <S.PFTitle>{selectedPortfolio?.title}</S.PFTitle>
      <S.PFThumbnailContainer>
        <img
          className="portfolioThumbnail"
          src={selectedPortfolio?.thumbNailURL as string}
          alt="썸네일 이미지"
        />
      </S.PFThumbnailContainer>
      <S.PFDetailWrapper>
        <S.PFDetail>{selectedPortfolio?.desc}</S.PFDetail>
      </S.PFDetailWrapper>
      <S.PFPDFContainer>
        {selectedPortfolio?.pdfFileURL &&
        selectedPortfolio?.pdfFileURL !==
          `https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/${userId}/pdf/` ? (
          <a
            href={selectedPortfolio?.pdfFileURL as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF 확인 및 다운로드
          </a>
        ) : null}
      </S.PFPDFContainer>
      <S.PFLinkContainer>
        {selectedPortfolio?.linkURL ? (
          <a
            href={selectedPortfolio.linkURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            링크 주소 바로가기
          </a>
        ) : null}
      </S.PFLinkContainer>
    </>
  );
};

export default PortfolioDetailModal;
