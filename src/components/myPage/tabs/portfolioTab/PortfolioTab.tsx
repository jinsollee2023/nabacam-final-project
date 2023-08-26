import React, { useState } from "react";
import { styled } from "styled-components";
import PortfolioAddModal from "./PortfolioAddModal";
import PortfolioFilesCard from "./PortfolioFilesCard";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import Modal from "src/components/modal/Modal";

import { Button } from "antd";

const PortfolioTab = () => {
  const { userId } = useUserStore();
  const { pfId } = usePortfolioStore();
  const [open, setOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  // 썸네일데이터, pdf데이터 각각
  const { thumbnailData, pdfData } = usePortfolioInfoQueries({ userId, pfId });

  return (
    <>
      {/* 썸네일만 */}
      <S.PortfolioListContainer style={{ border: "solid black" }}>
        <S.PortfolioListWrapper>
          {thumbnailData.map((files, index) => (
            <S.PortfolioList
              onClick={() => setIsDetailModalOpen(true)}
              key={index}
            >
              <PortfolioFilesCard files={files} pfId={pfId} />
            </S.PortfolioList>
          ))}

          <S.PortfolioList onClick={() => setOpen(true)}>
            + 포트폴리오 첨부하기
          </S.PortfolioList>
          <PortfolioAddModal open={open} setOpen={setOpen} />
        </S.PortfolioListWrapper>
      </S.PortfolioListContainer>

      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={setIsDetailModalOpen}
          buttons={
            <>
              <Button type="primary" block></Button>
            </>
          }
        >
          <>
            <S.PFTitle>workWave FE 프로젝트</S.PFTitle>
            <S.PFFileContainer>썸네일</S.PFFileContainer>
            <S.PFDetailWrapper>
              <S.PFDetail>
                클라언트(기업 관계자)와 프리랜서가 서로 매칭되어, 상호
                프로젝트를 계약하고 진행하는 프로젝트입니다. <br /> TS와 react로
                개발하였으며, 디자이너와의 협업 하에 진행되었습니다.
              </S.PFDetail>
            </S.PFDetailWrapper>
          </>
        </Modal>
      )}
    </>
  );
};

export default PortfolioTab;

const S = {
  PortfolioListContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  PortfolioListWrapper: styled.div`
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 10px;
  `,
  PortfolioList: styled.div`
    background-color: #8080803d;
    width: 130px;
    height: 130px;
    margin-right: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 13px;
    padding: 10px;
    list-style: none;
  `,
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
