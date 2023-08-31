import React from "react";
import { usePortfolioStore } from "../../../../../zustand/usePortfolioStore";
import { S } from "./portfolioDetailModal.styles";

interface PortfolioDetailModalProps {
  setIsDetailModalOpen: (isOpen: boolean) => void;
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
          alt="등록된 이미지가 없습니다."
          style={{ marginLeft: "10px", width: "50%" }}
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
            pdf 확인 및 다운로드
          </a>
        ) : (
          "첨부된 pdf 없음"
        )}
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
        ) : (
          "첨부된 링크 주소 없음"
        )}
      </S.PFLinkContainer>
    </>
  );
};

export default PortfolioDetailModal;
