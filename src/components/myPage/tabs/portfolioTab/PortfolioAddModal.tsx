import { Modal, Radio, Space } from "antd";
import React, { useState } from "react";

import useInput from "src/hooks/useInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "src/zustand/useUserStore";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";
import PortfolioAddFilesForm from "./PortfolioAddFilesForm";
import PortfolioAddLinkForm from "./PortfolioAddLinkForm";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PortfolioAddModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  const [attachmentType, setAttachmentType] = useState<string>("file");
  const fileTitleInput = useInput("");
  const fileDescInput = useInput("");
  const linkInput = useInput("");
  const { userId } = useUserStore();
  const {
    selectedTitle,
    selectedDesc,
    selectedLink,
    selectedThumbnailFile,
    pfId,
    thumbnailFileName,
    PDFFileName,
    setThumbnailFileName,
    setPDFFileName,
  } = usePortfolioStore();

  const { addPortfolioMutation } = usePortfolioInfoQueries({ userId, pfId });

  const addPortfolioHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const CDNURL =
      "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios";

    const newPortfolioData = {
      portfolioId: pfId,
      title: selectedTitle,
      desc: selectedDesc,
      linkURL: selectedLink,
      thumbNailURL: `${CDNURL}/${userId}/thumbnail/${thumbnailFileName}`,
      pdfFileURL: `${CDNURL}/${userId}/pdf/${PDFFileName}`,
    };
    // dB
    addPortfolioMutation.mutate({ newPortfolioData, userId, pfId });

    fileTitleInput.reset();
    fileDescInput.reset();
    linkInput.reset();

    setThumbnailFileName("");
    setPDFFileName("");

    setOpen(false);
  };
  console.log(thumbnailFileName);
  console.log(PDFFileName);
  return (
    <>
      {open && (
        <Modal
          title="첨부 유형 선택"
          open={open}
          onOk={addPortfolioHandler}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <Radio.Group
            onChange={(e) => setAttachmentType(e.target.value)}
            value={attachmentType}
          >
            <Radio value="file">파일로 첨부하기</Radio>
            <Radio value="link">링크로 첨부하기</Radio>
          </Radio.Group>
          {/* ---------------파일------------------ */}
          {attachmentType === "file" && <PortfolioAddFilesForm />}
          {/* ---------------링크------------------ */}
          {attachmentType === "link" && <PortfolioAddLinkForm />}
        </Modal>
      )}
    </>
  );
};

export default PortfolioAddModal;
