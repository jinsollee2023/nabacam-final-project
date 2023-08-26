import { useState } from "react";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import useInput from "src/hooks/useInput";
import { v4 as uuidv4 } from "uuid";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getThumbnailURL, uploadThumbnail } from "src/api/Portfolio";
import { queryClient } from "src/App";

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
    setPfId,
    setThumbnailFileName,
  } = usePortfolioStore();
  const { userId } = useUserStore();

  const { uploadThumbnailMutation } = usePortfolioInfoQueries({ userId });

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
    setSelectedTitle(e.target.value); // Zustand를 통해 전역 상태를 변경
  };
  const handleDescInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileDescInput.onChange(e); // useInput 훅의 onChange를 호출하여 값을 변경
    setSelectedDesc(e.target.value); // Zustand를 통해 전역 상태를 변경
  };
  const handleThumbnailFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    setSelectedThumbnailFile(file);
    // console.log(selectedThumbnailFile);
  };
  //
  const uploadHandler = async () => {
    // 업로드
    // uuidv4()로 직접 pfId 생성
    const pfId = uuidv4();
    const thumbnailFileName = uuidv4();

    if (selectedThumbnailFile) {
      // 스토리지
      uploadThumbnailMutation.mutate({
        file: selectedThumbnailFile,
        pfId,
        thumbnailFileName,
      });
      // 전역
      setPfId(pfId);
      setThumbnailFileName(thumbnailFileName);
      console.log("pfId저장완료>", pfId);
      console.log("thumbnailFileName저장완료>", thumbnailFileName);
    }
  };
  const handlePDFFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedPDFFile(file);
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
      <button onClick={uploadHandler}>썸네일 업로드</button>
      <label htmlFor="fileInputPDF" onClick={togglePDFFormVisibility}>
        +pdf파일 첨부하기
      </label>
      {/* <button>pdf 업로드</button> */}

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
