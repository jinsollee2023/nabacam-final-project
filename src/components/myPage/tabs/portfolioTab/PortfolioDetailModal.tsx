import React from "react";
import Modal from "src/components/modal/Modal";
import { Button } from "antd";
import { styled } from "styled-components";

interface PortfolioDetailModalProps {
  setIsDetailModalOpen: (isOpen: boolean) => void;
  portfolioData: any;
}

const PortfolioDetailModal = ({
  setIsDetailModalOpen,
  portfolioData,
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
        <S.PFFileContainer>
          <img
            className="portfolioThumbnail"
            src={portfolioData.thumbNailURL}
            alt="img"
            style={{ marginLeft: "10px", width: "50%" }}
          />
        </S.PFFileContainer>
        <S.PFDetailWrapper>
          <S.PFDetail>{portfolioData.desc}</S.PFDetail>
        </S.PFDetailWrapper>
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
  PFFileContainer: styled.section`
    border: solid;
    margin-top: 20px;
    padding: 5px;
  `,
};
