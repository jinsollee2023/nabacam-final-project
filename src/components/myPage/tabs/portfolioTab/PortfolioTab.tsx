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
import {
  updatePortfolioFile,
  uploadPDF,
  uploadThumbnail,
} from "src/api/Portfolio";
import { getPortfolioFileURL } from "src/api/User";

const PortfolioTab = () => {
  const { userId } = useUserStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    selectedPortfolio,
    setSelectedPortfolio,
    newPortfolio,
    changeNewPortfolio,
  } = usePortfolioStore();
  const {
    addPortfolioMutation,
    deletePortfolioMutation,
    updatePortfolioMutation,
    portfolios,
  } = usePortfolioInfoQueries({
    userId,
    pfId: newPortfolio.portfolioId,
  });

  const handleOpenAddModalButtonClick = () => {
    setErrorMessage("");
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

  const handleAddPortfolioButtonClick = async () => {
    // 유효성 검사 변경될 수 있음
    // if (newPortfolio.title === "" && newPortfolio.desc === "") {
    //   return setErrorMessage("포트폴리오 제목과 내용을 입력해주세요.");
    // } else if (newPortfolio.title === "") {
    //   return setErrorMessage("포트폴리오 제목을 입력해주세요.");
    // } else if (newPortfolio.desc === "") {
    //   return setErrorMessage("포트폴리오 내용을 입력해주세요.");
    // } else if (newPortfolio.thumbNailURL instanceof String) {
    //   const isConfirmed = window.confirm(
    //     "썸네일 이미지는 클라이언트에게 포트폴리오를 소개하는 중요한 요소일 수 있습니다.\n 등록없이 진행하시겠습니까?"
    //   );
    //   if (!isConfirmed) {
    //     return setErrorMessage("썸네일 이미지를 등록해주세요.");
    //   }
    // }

    const pdfFilePath = await uploadPDF({
      userId,
      file: newPortfolio.pdfFileURL as File,
      pfId: newPortfolio.portfolioId,
    });
    const pdfURL = await getPortfolioFileURL(pdfFilePath);

    const newPortfolioExceptThumbnail = {
      portfolioId: newPortfolio.portfolioId,
      title: newPortfolio.title,
      desc: newPortfolio.desc,
      freelancerId: userId,
      linkURL: newPortfolio.linkURL,
      pdfFileURL: `${pdfURL}?updated=${new Date().getTime()}`,
    };

    if (newPortfolio.thumbNailURL instanceof File) {
      const thumbnailFilePath = await uploadThumbnail({
        userId,
        file: newPortfolio.thumbNailURL as File,
        pfId: newPortfolio.portfolioId,
      });
      const thumbNailURL = await getPortfolioFileURL(thumbnailFilePath);

      addPortfolioMutation.mutate({
        newPortfolio: {
          ...newPortfolioExceptThumbnail,
          thumbNailURL: `${thumbNailURL}?updated=${new Date().getTime()}`,
        },
        userId,
        pfId: newPortfolio.portfolioId,
      });
    } else {
      addPortfolioMutation.mutate({
        newPortfolio: {
          ...newPortfolioExceptThumbnail,
          thumbNailURL: newPortfolio.thumbNailURL,
        },
        userId,
        pfId: newPortfolio.portfolioId,
      });
    }

    setSelectedPortfolio(null);
    setIsAddModalOpen(!isAddModalOpen);
  };

  const modalOpenHandler = () => {
    changeNewPortfolio({
      portfolioId: "",
      title: "",
      desc: "",
      freelancerId: userId,
      linkURL: "",
      thumbNailURL:
        "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-porfolio-image.jpg",
      pdfFileURL: "",
    });
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleEditPortfolioButtonClick = async () => {
    const pdfFilePath = await updatePortfolioFile(
      userId,
      newPortfolio.portfolioId,
      "pdf",
      newPortfolio.pdfFileURL as File
    );
    const pdfURL = await getPortfolioFileURL(pdfFilePath);
    if (newPortfolio.thumbNailURL instanceof File) {
      const thumbnailFilePath = await (String(
        selectedPortfolio?.thumbNailURL
      ).includes("default")
        ? uploadThumbnail({
            userId,
            file: newPortfolio?.thumbNailURL as File,
            pfId: newPortfolio?.portfolioId,
          })
        : updatePortfolioFile(
            userId,
            newPortfolio?.portfolioId as string,
            "thumbnail",
            newPortfolio.thumbNailURL as File
          ));
      const thumbNailURL = await getPortfolioFileURL(
        thumbnailFilePath as { path: string }
      );
      updatePortfolioMutation.mutate({
        updatedData: {
          freelancerId: newPortfolio.freelancerId,
          title: newPortfolio.title,
          desc: newPortfolio.desc,
          linkURL: newPortfolio.linkURL as string,
          thumbNailURL: `${thumbNailURL}?updated=${new Date().getTime()}`,
          pdfFileURL: `${pdfURL}?updated=${new Date().getTime()}`,
        },
        pfId: newPortfolio.portfolioId,
      });
    } else {
      updatePortfolioMutation.mutate({
        updatedData: {
          freelancerId: newPortfolio.freelancerId,
          title: newPortfolio.title,
          desc: newPortfolio.desc,
          linkURL: newPortfolio.linkURL as string,
          thumbNailURL: `${
            newPortfolio.thumbNailURL
          }?updated=${new Date().getTime()}`,
          pdfFileURL: `${pdfURL}?updated=${new Date().getTime()}`,
        },
        pfId: newPortfolio.portfolioId,
      });
    }

    handleAddModalClose();
  };

  // 삭제
  const handleDeleteButtonClick = () => {
    // db에서 지우기
    deletePortfolioMutation.mutate({
      portfolioId: selectedPortfolio?.portfolioId!,
      freelancerId: selectedPortfolio?.freelancerId!,
    });
    setIsDetailModalOpen(!isDetailModalOpen);
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
              <Button type="primary" block onClick={handleDeleteButtonClick}>
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
                    onClick={handleEditPortfolioButtonClick}
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
          <PortfolioAddModal errorMessage={errorMessage} />
        </Modal>
      )}

      <S.PortfolioListContainer>
        <S.PortfolioListWrapper>
          {portfolios &&
            portfolios.map((portfolio) => {
              return (
                <S.PortfolioList
                  key={portfolio.portfolioId}
                  onClick={() => {
                    handleOpenDetailModalButtonClick(portfolio);
                  }}
                >
                  <img src={portfolio.thumbNailURL} alt="썸네일 이미지" />
                </S.PortfolioList>
              );
            })}

          <S.PortfolioList onClick={modalOpenHandler}>
            <button>
              포트폴리오
              <br />
              첨부하기
            </button>
          </S.PortfolioList>
        </S.PortfolioListWrapper>
      </S.PortfolioListContainer>
    </>
  );
};

export default PortfolioTab;
