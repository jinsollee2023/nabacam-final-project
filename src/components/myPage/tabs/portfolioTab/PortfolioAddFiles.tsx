import { useState } from "react";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";

const PortfolioAddFiles = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { setSelectedPDFFile, setSelectedThumbnailFile } = usePortfolioStore();
  const { userId } = useUserStore();

  // Event Handler
  const toggleThumbnailFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const togglePDFFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleThumbnailFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    setSelectedThumbnailFile(file);
  };

  const handlePDFFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedPDFFile(file);
  };

  return (
    <>
      <label
        htmlFor="fileInputThumbnail"
        onClick={toggleThumbnailFormVisibility}
      >
        +썸네일 첨부하기
      </label>
      <label htmlFor="fileInputPDF" onClick={togglePDFFormVisibility}>
        +pdf파일 첨부하기
      </label>

      {isFormVisible && (
        <>
          <input
            type="file"
            id="fileInputThumbnail"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => handleThumbnailFileInputChange(e)}
          />
          <input
            type="file"
            id="fileInputPDF"
            style={{ display: "none" }}
            accept="application/pdf, .doc, .docx, .ppt, .pptx"
            onChange={(e) => handlePDFFileInputChange(e)}
          />
        </>
      )}
    </>
  );
};

export default PortfolioAddFiles;

export const S = {
  ThumbnailButton: styled.button`
    cursor: pointer;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-align: center;
    &:hover {
      background-color: #0056b3;
    }
  `,
};
