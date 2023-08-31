import { useState } from "react";
import { styled } from "styled-components";
import { useUserStore } from "../../../../zustand/useUserStore";
import { usePortfolioStore } from "../../../../zustand/usePortfolioStore";
import useInput from "../../../../hooks/useInput";
import { v4 as uuidv4 } from "uuid";
import usePortfolioInfoQueries from "../../../../hooks/usePortfolioInfoQueries";
import React from "react";

const PortfolioAddLinkForm = () => {
  const fileTitleInput = useInput("");
  const fileDescInput = useInput("");
  const linkInput = useInput("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    setSelectedLink,
    selectedLink,
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
  };
  const handleLinkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    linkInput.onChange(e);
    setSelectedLink(e.target.value);
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

  return (
    <>
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
      <form>
        <label>
          링크를 입력해주세요
          <br />
          <input
            type="text"
            value={linkInput.value}
            onChange={handleLinkInputChange}
          />
        </label>
      </form>
      <label
        htmlFor="fileInputThumbnail"
        onClick={toggleThumbnailFormVisibility}
      >
        +썸네일 첨부하기
      </label>
      <button onClick={uploadThumbnailHandler}>썸네일 업로드</button>

      {isFormVisible && (
        <>
          <input
            type="file"
            id="fileInputThumbnail"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => handleThumbnailFileInputChange(e)}
          />
        </>
      )}
    </>
  );
};

export default PortfolioAddLinkForm;

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
