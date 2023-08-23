import { useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";
import { usePortfolioFiles } from "src/hooks/usePortfolioFiles";

const PortfolioAddThumbnail = () => {
  // 상태관리
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { userId } = useUserStore();
  const { uploadFileHandler } = usePortfolioFiles("thumbnail");

  // Event Handler
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <S.ThumbnailButton onClick={toggleFormVisibility}>
        +썸네일 첨부하기
      </S.ThumbnailButton>
      {isFormVisible && (
        <input
          type="file"
          accept="image/*, application/pdf, .doc, .docx, .ppt, .pptx"
          onChange={(e) => uploadFileHandler(e)}
        />
      )}
    </>
  );
};

export default PortfolioAddThumbnail;

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

/**
 * 의도 : 얘를 하고 나면 dB 업로드 + get + 전역상태 저장까지
 */
