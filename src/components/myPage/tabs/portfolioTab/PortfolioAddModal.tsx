import { Modal, Radio, Space } from "antd";
import React, { useState } from "react";

import useInput from "src/hooks/useInput";
import PortfolioAddFiles from "./PortfolioAddFiles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "src/zustand/useUserStore";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PortfolioAddModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  const [attachmentType, setAttachmentType] = useState<string>("file");
  const fileTitleInput = useInput("");
  const fileDescInput = useInput("");
  const linkTitleInput = useInput("");
  const { userId } = useUserStore();
  const { addPortfolioMutation, portfolios, uploadFileMutation } =
    usePortfolioInfoQueries(userId);
  const { selectedThumbnailFile, selectedPDFFile } = usePortfolioStore();
  const {} = usePortfolioInfoQueries(userId);

  const addPortfolioInfoHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const newPortfolioInfo = {
      title: fileTitleInput.value,
      desc: fileDescInput.value,
    };
    // add textInput into dB
    addPortfolioMutation.mutate({ newPortfolioInfo, userId });

    // add fileInput into dB
    if (selectedPDFFile && selectedThumbnailFile) {
      uploadFileMutation.mutate({
        file: selectedThumbnailFile,
        fileType: "thumbnail",
      });
      uploadFileMutation.mutate({ file: selectedPDFFile, fileType: "pdf" });
    }

    fileTitleInput.reset();
    fileDescInput.reset();
    setOpen(false);
  };
  return (
    <>
      {open && (
        <Modal
          title="첨부 유형 선택"
          open={open}
          onOk={addPortfolioInfoHandler}
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
          {attachmentType === "file" && (
            <>
              <form>
                <label>
                  Title...
                  <br />
                  <input
                    type="text"
                    value={fileTitleInput.value}
                    onChange={fileTitleInput.onChange}
                  />
                </label>
              </form>
              <form>
                <label>
                  Desc...
                  <br />
                  <input
                    type="text"
                    value={fileDescInput.value}
                    onChange={fileDescInput.onChange}
                  />
                </label>
              </form>
              <br />
              <PortfolioAddFiles />
            </>
          )}
          {/* ---------------링크------------------ */}
          {attachmentType === "link" && (
            <>
              <form>
                <label>
                  타이틀
                  <br />
                  <input
                    type="text"
                    value={linkTitleInput.value}
                    onChange={linkTitleInput.onChange}
                  />
                </label>
              </form>
              <br />
              <div>링크</div>
              <br />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default PortfolioAddModal;
