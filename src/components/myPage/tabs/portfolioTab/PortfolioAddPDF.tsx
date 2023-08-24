import React from "react";
import { useState } from "react";
import { usePortfolioUploadFiles } from "src/hooks/usePortfolioUploadFiles";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";

const PortfolioAddPDF = () => {
  // 상태관리
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { userId } = useUserStore();
  const { uploadFileHandler } = usePortfolioUploadFiles("PDF");

  // Event Handler
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <S.ThumbnailButton onClick={toggleFormVisibility}>
        +파일 첨부하기
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

export default PortfolioAddPDF;

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

// import React from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";
// import { message, Upload } from "antd";

// const PortfolioAddPDF = () => {
//   const { Dragger } = Upload;

//   const props: UploadProps = {
//     name: "file",
//     multiple: true,
//     action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };
//   return (
//     <Dragger {...props}>
//       <p className="ant-upload-drag-icon">
//         <InboxOutlined />
//       </p>
//       <p className="ant-upload-text">포트폴리오 첨부하기</p>
//       <p className="ant-upload-hint">OOMb 이하의 파일만 업로드해주세요.</p>
//     </Dragger>
//   );
// };

// export default PortfolioAddPDF;
