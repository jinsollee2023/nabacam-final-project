import { useEffect, useState } from "react";
import { S } from "./portfolioTab.styles";
import PortfolioAddModal from "./portfolioAddModal/PortfolioAddModal";
import usePortfolioInfoQueries from "../../../../hooks/usePortfolioInfoQueries";
import { useUserStore } from "../../../../store/useUserStore";
import { usePortfolioStore } from "../../../../store/usePortfolioStore";
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
import useValidation from "src/hooks/useValidation";

export interface Errors {
  title: null | string;
  desc: null | string;
  pdf: null | string;
  link: null | string;
}

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

  const initialErrors: Errors = {
    title: null,
    desc: null,
    pdf: null,
    link: null,
  };
  const [errors, setErrors] = useState(initialErrors);
  const { validateInput } = useValidation();
  const [addPortfolioButtonClicked, setAddPortfolioButtonClicked] =
    useState(false);
  const [updateProtfolioButtonClicked, setUpdatePortfolioButtonClicked] =
    useState(false);

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

  useEffect(() => {
    const validatePdfPortfolio =
      newPortfolio.pdfFileURL && !errors.title && !errors.desc && !errors.pdf;
    const validateLinkPortfolio =
      newPortfolio.linkURL && !errors.title && !errors.desc && !errors.link;

    if (
      updateProtfolioButtonClicked &&
      (validatePdfPortfolio || validateLinkPortfolio)
    ) {
      updatePortfolio();
      handleAddModalClose();
      setUpdatePortfolioButtonClicked(false);
    } else if (
      addPortfolioButtonClicked &&
      (validatePdfPortfolio || validateLinkPortfolio)
    ) {
      addPortfolio();
      handleAddModalClose();
      setAddPortfolioButtonClicked(false);
    }
    setUpdatePortfolioButtonClicked(false);
    setAddPortfolioButtonClicked(false);
  }, [
    addPortfolioButtonClicked,
    updateProtfolioButtonClicked,
    errors,
    selectedPortfolio,
  ]);

  const handlePortfolioSubmitButtonHandler = () => {
    const titleError = validateInput("제목", newPortfolio.title);
    const descError = validateInput("내용", newPortfolio.desc);
    const linkError = validateInput("링크", newPortfolio.linkURL as string);
    const pdfError = validateInput("PDF", newPortfolio.pdfFileURL as File);
    setErrors({
      title: titleError,
      desc: descError,
      link: linkError,
      pdf: pdfError,
    });
    selectedPortfolio
      ? setUpdatePortfolioButtonClicked(true)
      : setAddPortfolioButtonClicked(true);
  };

  const addPortfolio = async () => {
    const pdfFilePath =
      newPortfolio.pdfFileURL &&
      (await uploadPDF({
        userId: user.userId,
        file: newPortfolio.pdfFileURL as File,
        pfId: newPortfolio.portfolioId,
      }));
    const pdfURL = pdfFilePath && (await getPortfolioFileURL(pdfFilePath));

    const newPortfolioExceptThumbnail = {
      portfolioId: newPortfolio.portfolioId,
      title: newPortfolio.title,
      desc: newPortfolio.desc,
      freelancerId: user.userId,
      linkURL: newPortfolio.linkURL,
      pdfFileURL: pdfURL
        ? `${pdfURL}?updated=${new Date().getTime()}`
        : undefined,
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
  };
  const updatePortfolio = async () => {
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
  };

  // const addModalOpenHandler = () => {
  //   setIsDetailModalOpen(false);
  // };

  const addModalOpenHandler = () => {
    setIsAddModalOpen(true);
    setErrors({ title: null, desc: null, pdf: null, link: null });

    if (selectedPortfolio) {
      setIsDetailModalOpen(false);
    } else {
      setSelectedPortfolio(null);
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
    }
  };

  // 삭제
  const handleDeleteButtonClick = () => {
    deletePortfolioMutation.mutate({
      portfolioId: selectedPortfolio?.portfolioId!,
      freelancerId: selectedPortfolio?.freelancerId!,
    });
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const handleDeleteConfirm = () => {
    handleDeleteButtonClick();
    toast.dismiss();
  };

  const handleDeleteCancel = () => {
    toast.dismiss();
  };

  const showDeleteConfirmation = () => {
    toast.info(
      <div>
        <p>해당 포트폴리오를 삭제하시겠습니까?</p>
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
              <S.Button type="primary" block onClick={addModalOpenHandler}>
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
                  <S.Button
                    type="primary"
                    block
                    onClick={handlePortfolioSubmitButtonHandler}
                  >
                    수정하기
                  </S.Button>
                </>
              ) : (
                <S.Button
                  type="primary"
                  block
                  onClick={handlePortfolioSubmitButtonHandler}
                >
                  추가하기
                </S.Button>
              )}
            </>
          }
        >
          <PortfolioAddModal errors={errors} setErrors={setErrors} />
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
      <S.PortfolioAddButton onClick={addModalOpenHandler}>
        <BsPlusCircleDotted style={{ marginRight: "10px" }} /> 포트폴리오
        첨부하기
      </S.PortfolioAddButton>
    </>
  );
};

export default PortfolioTab;
