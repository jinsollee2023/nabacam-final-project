import { useState } from "react";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import useInput from "src/hooks/useInput";
import { v4 as uuidv4 } from "uuid";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";

const PortfolioAddForm = () => {
  const fileTitleInput = useInput("");
  const fileDescInput = useInput("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    setSelectedPDFFile,
    setSelectedThumbnailFile,
    setSelectedTitle,
    setSelectedDesc,
    selectedThumbnailFile,
    selectedPDFFile,
    setPfId,
    setThumbnailFileName,
    setPDFFileName,
  } = usePortfolioStore();
  const { userId } = useUserStore();

  const { uploadThumbnailMutation, uploadPDFMutation } =
    usePortfolioInfoQueries({ userId });

  // Event Handler
  const toggleThumbnailFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const togglePDFFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // zustand
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileTitleInput.onChange(e); // useInput 훅의 onChange를 호출하여 값을 변경
    setSelectedTitle(e.target.value);
  };
  const handleDescInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileDescInput.onChange(e);
    setSelectedDesc(e.target.value);
  };
  const handleThumbnailFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    setSelectedThumbnailFile(file);
    // console.log(selectedThumbnailFile);
  };
  //
  const uploadThumbnailHandler = async () => {
    // uuidv4()로 직접 pfId, 파일명 생성
    const pfId = uuidv4();
    const thumbnailFileName = uuidv4();

    if (selectedThumbnailFile !== null) {
      // 스토리지
      uploadThumbnailMutation.mutate({
        file: selectedThumbnailFile,
        pfId,
        thumbnailFileName,
      });
      // 전역
      setPfId(pfId);
      setThumbnailFileName(thumbnailFileName);
      console.log("썸네일pfId저장완료>", pfId);
      console.log("thumbnailFileName저장완료>", thumbnailFileName);
    }
  };
  const handlePDFFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedPDFFile(file);
  };
  const uploadPDFHandler = async () => {
    const pfId = uuidv4();
    const PDFFileName = uuidv4();

    if (selectedPDFFile !== null) {
      // uuidv4()로 직접 pfId, 파일명 생성
      // 스토리지
      uploadPDFMutation.mutate({
        file: selectedPDFFile,
        pfId,
        PDFFileName,
      });
      // 전역
      setPfId(pfId);
      setPDFFileName(PDFFileName);
      console.log("PDF pfId저장완료>", pfId);
      console.log("PDFName저장완료>", PDFFileName);
    }
  };

  return (
    <>
      {/* --------------------------텍스트------------------------------- */}
      <form>
        <label>
          Title...
          <br />
          <input
            type="text"
            value={fileTitleInput.value}
            onChange={handleTitleInputChange}
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
            onChange={handleDescInputChange}
          />
        </label>
      </form>
      {/* --------------------------파일------------------------------- */}
      <label
        htmlFor="fileInputThumbnail"
        onClick={toggleThumbnailFormVisibility}
      >
        +썸네일 첨부하기
      </label>
      <button onClick={uploadThumbnailHandler}>썸네일 업로드</button>
      <label htmlFor="fileInputPDF" onClick={togglePDFFormVisibility}>
        +pdf파일 첨부하기
      </label>
      <button onClick={uploadPDFHandler}>pdf 업로드</button>

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

export default PortfolioAddForm;

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
