import React, { useEffect, useState } from "react";
import { S } from "./portfolioTab.styles";
import PortfolioAddModal from "./PortfolioAddModal";
import usePortfolioInfoQueries from "../../../../hooks/queries/usePortfolioInfoQueries";
import { useUserStore } from "../../../../store/useUserStore";
import { usePortfolioStore } from "../../../../store/usePortfolioStore";
import Modal from "../../../modal/Modal";
import {
  updatePortfolioFile,
  uploadPDF,
  uploadThumbnail,
} from "../../../../api/Portfolio";
import { getPortfolioFileURL } from "../../../../api/User";
import { BsPlusCircleDotted } from "react-icons/bs";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";
import { CommonS } from "src/components/common/button/commonButton";
import { Spin } from "antd";
import { useInView } from "react-intersection-observer";
import PortfolioDetailModal from "./PortfolioDetailModal";
import PortfolioCard from "./PortfolioCard";

export interface Errors {
  title: null | string;
  desc: null | string;
  pdf: null | string;
  link: null | string;
}

const PortfolioTab = () => {
  const { user } = useUserStore();
  const [ref, inView] = useInView();
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
    portfolio,
    error,
    fetchNextPage,
    hasNextPage,
    status,
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

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedPortfolio(null);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedPortfolio(null);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
      const thumbnailFilePath =
        newPortfolio.thumbNailURL &&
        (await uploadThumbnail({
          userId: user.userId,
          file: newPortfolio.thumbNailURL as File,
          pfId: newPortfolio.portfolioId,
        }));
      const thumbNailURL =
        thumbnailFilePath && (await getPortfolioFileURL(thumbnailFilePath));

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
    const pdfFilePath =
      newPortfolio.pdfFileURL instanceof File &&
      (await updatePortfolioFile(
        user.userId,
        newPortfolio.portfolioId,
        "pdf",
        newPortfolio.pdfFileURL as File
      ));
    const pdfURL = pdfFilePath && (await getPortfolioFileURL(pdfFilePath));

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
      const thumbNailURL =
        thumbnailFilePath &&
        (await getPortfolioFileURL(thumbnailFilePath as { path: string }));
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
    setSelectedPortfolio(null);
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const handleDeleteConfirm = () => {
    handleDeleteButtonClick();
    toast.dismiss();
    toast.success("포트폴리오가 삭제되었습니다.");
  };

  const handleDeleteCancel = () => {
    toast.dismiss();
  };

  const showDeleteConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>
          해당 포트폴리오를 삭제하시겠습니까?
        </CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleDeleteConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleDeleteCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };
  const addAvailableClose =
    newPortfolio.desc === "" &&
    newPortfolio.title === "" &&
    newPortfolio.linkURL === "" &&
    newPortfolio.pdfFileURL === "" &&
    newPortfolio.thumbNailURL ===
      "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-porfolio-image.jpg";

  const updateAvailableClose =
    newPortfolio.desc === selectedPortfolio?.desc &&
    newPortfolio.title === selectedPortfolio?.title &&
    newPortfolio.linkURL === selectedPortfolio?.linkURL &&
    newPortfolio.pdfFileURL === selectedPortfolio?.pdfFileURL &&
    newPortfolio.thumbNailURL !==
      "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-porfolio-image.jpg";

  const availableClose = selectedPortfolio
    ? updateAvailableClose
    : addAvailableClose;

  return status === "loading" ? (
    <Spin
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    />
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
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
                  첨부하기
                </S.Button>
              )}
            </>
          }
          availableClose={availableClose}
        >
          <PortfolioAddModal errors={errors} setErrors={setErrors} />
        </Modal>
      )}

      <S.PortfolioListContainer>
        <S.PortfolioTitleAndButtonWrapper>
          <S.PortfolioTabTitle>포트폴리오</S.PortfolioTabTitle>
          <S.PortfolioAddButton onClick={addModalOpenHandler}>
            <BsPlusCircleDotted style={{ marginRight: "10px" }} />
            포트폴리오 첨부하기
          </S.PortfolioAddButton>
        </S.PortfolioTitleAndButtonWrapper>
        <S.PortfolioListWrapper>
          {portfolio &&
            portfolio?.pages.map((page, idx) => (
              <PortfolioCard
                page={page}
                idx={idx}
                setIsDetailModalOpen={setIsDetailModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                setSelectedPortfolio={setSelectedPortfolio}
              />
            ))}
          <div ref={ref}></div>
        </S.PortfolioListWrapper>
      </S.PortfolioListContainer>
    </>
  );
};

export default PortfolioTab;
