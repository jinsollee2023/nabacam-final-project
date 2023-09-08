import { useState } from "react";
import { S } from "./portfolioTab.styles";
import PortfolioAddModal from "./portfolioAddModal/PortfolioAddModal";
import usePortfolioInfoQueries from "../../../../hooks/usePortfolioInfoQueries";
import { useUserStore } from "../../../../zustand/useUserStore";
import { usePortfolioStore } from "../../../../zustand/usePortfolioStore";
import PortfolioDetailModal from "./portfolioDetailModal/PortfolioDetailModal";
import Modal from "../../../modal/Modal";
import { Portfolio } from "../../../../Types";
import {
  updatePortfolioFile,
  uploadPDF,
  uploadThumbnail,
} from "../../../../api/Portfolio";
import { getPortfolioFileURL } from "../../../../api/User";
import { BsPlusCircleDotted } from "react-icons/bs";
import { toast } from "react-toastify";

const PortfolioTab = () => {
  const { user } = useUserStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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
    userId: user.userId,
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

  const handleAddPortfolioButtonClick = async () => {
    // 유효성 검사 변경될 수 있음
    if (newPortfolio.title === "" && newPortfolio.desc === "") {
    } else if (newPortfolio.title === "") {
    } else if (newPortfolio.desc === "") {
    } else if (newPortfolio.thumbNailURL instanceof String) {
    }

    // --------------------

    const pdfFilePath = await uploadPDF({
      userId: user.userId,
      file: newPortfolio.pdfFileURL as File,
      pfId: newPortfolio.portfolioId,
    });
    const pdfURL = await getPortfolioFileURL(pdfFilePath);

    const newPortfolioExceptThumbnail = {
      portfolioId: newPortfolio.portfolioId,
      title: newPortfolio.title,
      desc: newPortfolio.desc,
      freelancerId: user.userId,
      linkURL: newPortfolio.linkURL,
      pdfFileURL: `${pdfURL}?updated=${new Date().getTime()}`,
    };

    if (newPortfolio.thumbNailURL instanceof File) {
      const thumbnailFilePath = await uploadThumbnail({
        userId: user.userId,
        file: newPortfolio.thumbNailURL as File,
        pfId: newPortfolio.portfolioId,
      });
      const thumbNailURL = await getPortfolioFileURL(thumbnailFilePath);

      addPortfolioMutation.mutate({
        newPortfolio: {
          ...newPortfolioExceptThumbnail,
          thumbNailURL: `${thumbNailURL}?updated=${new Date().getTime()}`,
        },
        userId: user.userId,
        pfId: newPortfolio.portfolioId,
      });
    } else {
      addPortfolioMutation.mutate({
        newPortfolio: {
          ...newPortfolioExceptThumbnail,
          thumbNailURL: newPortfolio.thumbNailURL,
        },
        userId: user.userId,
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
      freelancerId: user.userId,
      linkURL: "",
      thumbNailURL:
        "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-porfolio-image.jpg",
      pdfFileURL: "",
    });
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleEditPortfolioButtonClick = async () => {
    const pdfFilePath = await updatePortfolioFile(
      user.userId,
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
            userId: user.userId,
            file: newPortfolio?.thumbNailURL as File,
            pfId: newPortfolio?.portfolioId,
          })
        : updatePortfolioFile(
            user.userId,
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

  const handleDeleteConfirm = () => {
    handleDeleteButtonClick();

    // 여기에서 실제로 할 일을 수행하세요.

    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleDeleteCancel = () => {
    toast.dismiss();
  };

  const showDeleteConfirmation = () => {
    toast.info(
      <div>
        <p>해당 포트폴리오를 하시겠습니까?</p>
        <button onClick={handleDeleteConfirm}>확인</button>
        <button onClick={handleDeleteCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleEditConfirm = () => {
    handleEditPortfolioButtonClick();

    // 여기에서 실제로 할 일을 수행하세요.

    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleEditCancel = () => {
    toast.dismiss();
  };

  const showEditConfirmation = () => {
    toast.info(
      <div>
        <p>해당 포트폴리오를 삭제하시겠습니까?</p>
        <button onClick={handleEditConfirm}>확인</button>
        <button onClick={handleEditCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      {isDetailModalOpen && (
        <Modal
          setIsModalOpen={handleDetailModalClose}
          buttons={
            <>
              <S.Button type="primary" block onClick={showDeleteConfirmation}>
                삭제하기
              </S.Button>
              <S.Button
                type="primary"
                block
                onClick={handleOpenAddModalButtonClick}
              >
                수정하기
              </S.Button>
            </>
          }
        >
          <PortfolioDetailModal
            setIsDetailModalOpen={handleAddModalClose}
            isAddModalOpen={!isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            userId={user.userId}
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
                  <S.Button
                    type="primary"
                    block
                    onClick={() => {
                      setIsAddModalOpen(!isAddModalOpen);
                      setIsDetailModalOpen(!isDetailModalOpen);
                    }}
                  >
                    취소하기
                  </S.Button>
                  <S.Button type="primary" block onClick={showEditConfirmation}>
                    수정하기
                  </S.Button>
                </>
              ) : (
                <S.Button
                  type="primary"
                  block
                  onClick={handleAddPortfolioButtonClick}
                >
                  추가하기
                </S.Button>
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
            portfolios.map((portfolio) => {
              return (
                <S.PortfolioList
                  key={portfolio.portfolioId}
                  onClick={() => {
                    handleOpenDetailModalButtonClick(portfolio);
                  }}
                >
                  <img
                    style={{ borderRadius: "20px" }}
                    src={portfolio.thumbNailURL}
                    alt="썸네일 이미지"
                  />

                  <S.PortfolioTitle>{portfolio.title}</S.PortfolioTitle>
                </S.PortfolioList>
              );
            })}
        </S.PortfolioListWrapper>
      </S.PortfolioListContainer>
      <S.PortfolioAddButton onClick={modalOpenHandler}>
        <BsPlusCircleDotted style={{ marginRight: "10px" }} /> 포트폴리오
        첨부하기
      </S.PortfolioAddButton>
    </>
  );
};

export default PortfolioTab;
