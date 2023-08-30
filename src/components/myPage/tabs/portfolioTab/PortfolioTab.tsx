import { useState } from "react";
import { S } from "./portfolioTab.styles";
import PortfolioAddModal from "./portfolioAddModal/PortfolioAddModal";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import PortfolioDetailModal from "./portfolioDetailModal/PortfolioDetailModal";
import { Button } from "antd";
import Modal from "src/components/modal/Modal";
import { Portfolio } from "src/Types";
import { uploadThumbnail } from "src/api/Portfolio";

const PortfolioTab = () => {
  const { userId } = useUserStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { selectedPortfolio, setSelectedPortfolio } = usePortfolioStore();
  const { portfolios } = usePortfolioInfoQueries({ userId });
  const { newPortfolio } = usePortfolioStore();
  const { addPortfolioMutation } = usePortfolioInfoQueries({
    userId,
    pfId: newPortfolio.portfolioId,
  });

  const handleOpenAddModalButtonClick = () => {
    setIsAddModalOpen(true);
    setIsDetailModalOpen(false);
  };

  const handleOpenDetailModalButtonClick = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsDetailModalOpen(true);
    setIsAddModalOpen(false);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedPortfolio(null);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedPortfolio(null);
  };

  // const { uploadThumbnailMutation, uploadPDFMutation } =
  //   usePortfolioInfoQueries({ userId });
  // 위의 두 함수를 합쳐보자!
  const uploadFiles = async () => {
    // 스토리지
    if (newPortfolio.thumbNailURL !== null) {
      const filePath = await uploadThumbnail({
        userId,
        file: newPortfolio.thumbNailURL as File,
        pfId: newPortfolio.portfolioId,
      });

      console.log(filePath);
    }
  };
  // uploadThumbnailMutation.mutate({
  //   file: newPortfolio.thumbNailURL as File,
  //   pfId: newPortfolio.portfolioId,
  // });
  // if (newPortfolio.pdfFileURL !== null) {
  //   uploadPDFMutation.mutate({
  //     file: newPortfolio.pdfFileURL as File,
  //     pfId: newPortfolio.portfolioId,
  //   });
  // }
  // console.log(filePath);

  const handleAddPortfolioButtonClick = () => {
    uploadFiles();
    addPortfolioMutation.mutate({
      newPortfolio,
      userId,
      pfId: newPortfolio.portfolioId,
    });
    setSelectedPortfolio(null);
    setIsAddModalOpen(!isAddModalOpen);
    console.log("됐니..?");
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={handleDetailModalClose}
          buttons={
            <>
              <Button
                type="primary"
                block
                onClick={handleOpenAddModalButtonClick}
              >
                수정하기
              </Button>
              <Button type="primary" block>
                삭제하기
              </Button>
            </>
          }
        >
          <PortfolioDetailModal
            setIsDetailModalOpen={handleAddModalClose}
            isAddModalOpen={!isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            userId={userId}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal
          setIsModalOpen={() => {
            setIsAddModalOpen(!isAddModalOpen);
            setSelectedPortfolio(null);
          }}
          buttons={
            <>
              {selectedPortfolio ? (
                <>
                  <Button
                    type="primary"
                    block
                    onClick={() => {
                      setIsAddModalOpen(!isAddModalOpen);
                      setIsDetailModalOpen(!isDetailModalOpen);
                    }}
                  >
                    취소하기
                  </Button>
                  <Button
                    type="primary"
                    block
                    onClick={handleAddPortfolioButtonClick}
                  >
                    수정하기
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  block
                  onClick={handleAddPortfolioButtonClick}
                >
                  추가하기
                </Button>
              )}
            </>
          }
        >
          <PortfolioAddModal />
        </Modal>
      )}

      <S.PortfolioListContainer>
        <S.PortfolioListWrapper>
          {portfolios &&
            portfolios.map((portfolio) => (
              <S.PortfolioList
                key={portfolio.portfolioId}
                onClick={() => {
                  handleOpenDetailModalButtonClick(portfolio);
                }}
              >
                <img src={portfolio.thumbNailURL} alt="썸네일 이미지" />
              </S.PortfolioList>
            ))}

          <S.PortfolioList>
            <button onClick={() => setIsAddModalOpen(!isAddModalOpen)}>
              포트폴리오 첨부하기
            </button>
          </S.PortfolioList>
        </S.PortfolioListWrapper>
      </S.PortfolioListContainer>
    </>
  );
};

export default PortfolioTab;
