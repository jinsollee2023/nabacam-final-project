import React from "react";
import Modal from "src/components/modal/Modal";
import { Button } from "antd";
import { styled } from "styled-components";

interface PortfolioDetailModalProps {
  setIsDetailModalOpen: (isOpen: boolean) => void;
  portfolioData: any;
  userId: string;
}

const PortfolioDetailModal = ({
  setIsDetailModalOpen,
  portfolioData,
  userId,
}: PortfolioDetailModalProps) => {
  return (
    <Modal
      setIsModalOpen={setIsDetailModalOpen}
      buttons={
        <>
          <Button type="primary" block></Button>
        </>
      }
    >
      <>
        <S.PFTitle>{portfolioData.title}</S.PFTitle>
        <S.PFThumbnailContainer>
          <img
            className="portfolioThumbnail"
            src={portfolioData.thumbNailURL}
            alt="등록된 이미지가 없습니다."
            style={{ marginLeft: "10px", width: "50%" }}
          />
        </S.PFThumbnailContainer>
        <S.PFDetailWrapper>
          <S.PFDetail>{portfolioData.desc}</S.PFDetail>
        </S.PFDetailWrapper>
        <S.PFPDFContainer>
          {portfolioData.pdfFileURL &&
          portfolioData.pdfFileURL !==
            `https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/${userId}/pdf/` ? (
            <a
              href={portfolioData.pdfFileURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              pdf 확인 및 다운로드
            </a>
          ) : null}
        </S.PFPDFContainer>
        <S.PFLinkContainer>
          {portfolioData.linkURL ? (
            <a
              href={portfolioData.linkURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              링크 주소 바로가기
            </a>
          ) : null}
        </S.PFLinkContainer>
      </>
    </Modal>
  );
};

export default PortfolioDetailModal;

const S = {
  PFTitle: styled.span`
    font-size: 20px;
  `,
  PFDetailWrapper: styled.div`
    background-color: #8080803d;
    border-radius: 8px;
    margin-top: 35px;
    padding: 10px;
    line-height: 1.4;
  `,
  PFDetail: styled.div`
    line-height: 1.4;
  `,
  PFThumbnailContainer: styled.section`
    margin-top: 20px;
    padding: 5px;
  `,
  PFPDFContainer: styled.section`
    margin-top: 30px;
    padding: 5px;
  `,
  PFLinkContainer: styled.section`
    margin-top: 30px;
    padding: 5px;
  `,
};
