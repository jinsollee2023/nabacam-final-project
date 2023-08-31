import { Radio } from "antd";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useUserStore } from "../../../../../zustand/useUserStore";
import { usePortfolioStore } from "../../../../../zustand/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";
import { Portfolio } from "../../../../../Types";
import PreviewImage from "../../../../../components/auth/join/PreviewImage";

interface PortfolioAddModalProps {
  errorMessage: string;
}

const PortfolioAddModal = ({ errorMessage }: PortfolioAddModalProps) => {
  const [attachmentType, setAttachmentType] = useState<string>("file");
  const { selectedPortfolio, setSelectedPortfolio } = usePortfolioStore();
  const [pfId, setPfId] = useState(
    selectedPortfolio ? selectedPortfolio?.portfolioId : uuidv4()
  );
  const [title, setTitle] = useState(
    selectedPortfolio ? selectedPortfolio?.title : ""
  );
  const [desc, setDesc] = useState(
    selectedPortfolio ? selectedPortfolio?.desc : ""
  );
  const [thumbNailFile, setThumbNailFile] = useState<File | string>(
    selectedPortfolio
      ? selectedPortfolio.thumbNailURL
      : "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-porfolio-image.jpg"
  );
  const [pdfFile, setPdfFile] = useState<File | string>(
    selectedPortfolio ? selectedPortfolio.pdfFileURL || "" : ""
  );
  const [linkURL, setLinkURL] = useState(selectedPortfolio?.linkURL || "");

  const { userId } = useUserStore();

  const allOnChange = (e: ChangeEvent<HTMLInputElement>, fileType?: string) => {
    const {
      target: { files, name, value },
    } = e;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "desc") {
      setDesc(value);
    }
    if (fileType === "thumbnail" && files && files[0]) {
      setThumbNailFile(files[0]);
    }
    if (fileType === "pdf" && files && files[0]) {
      setPdfFile(files[0]);
    }
    if (name === "link") {
      setLinkURL(value);
    }
  };

  const { changeNewPortfolio } = usePortfolioStore();
  const newPortfolio: Portfolio = {
    portfolioId: pfId,
    freelancerId: userId,
    title,
    desc,
    thumbNailURL: thumbNailFile,
    pdfFileURL: pdfFile,
    linkURL,
  };

  useEffect(() => {
    changeNewPortfolio(newPortfolio);
  }, [pfId, userId, title, desc, linkURL, thumbNailFile, pdfFile]);

  //-----------------------

  //  const useValid = (changeValue: any) => {
  //   const [validText, setValidText] = useState("");
  //   const [isValid, setIsValid] = useState({
  //     isTitle: false,
  //     isDesc: false,
  //     isThumbnail: false,
  //     isPdf: false,
  //     isLink: false,
  //   });

  //   useEffect(() => {
  //     if (changeValue.title === "") {
  //       setValidText("제목을 입력해주세요.");
  //       setIsValid({ ...isValid, isTitle: false });
  //     } else {
  //       setValidText("");
  //       setIsValid({ ...isValid, isTitle: true });
  //     }
  //   }, [changeValue.title]);

  //   useEffect(() => {
  //     if (changeValue.desc === "") {
  //       setValidText("내용을 입력해주세요.");
  //       setIsValid({ ...isValid, isDesc: false });
  //     } else {
  //       setValidText("");
  //       setIsValid({ ...isValid, isDesc: true });
  //     }
  //   }, [changeValue.desc]);
  // };

  //   //------------------------
  //   const useRevalidator = (changeValue: IValidType) => {

  //   }

  return (
    <>
      <Radio.Group
        onChange={(e) => setAttachmentType(e.target.value)}
        value={attachmentType}
      >
        <Radio value="file">파일로 첨부하기</Radio>
        <Radio value="link">링크로 첨부하기</Radio>
      </Radio.Group>

      <form>
        <input
          type="text"
          name="title"
          value={title}
          onChange={allOnChange}
          placeholder="제목"
          // valid={"title"}
        />
        <br />
        <input
          type="text"
          name="desc"
          value={desc}
          onChange={allOnChange}
          placeholder="내용"
        />
        <br />

        <PreviewImage
          handlePhotoURLOnChange={setThumbNailFile}
          defaultImage={newPortfolio.thumbNailURL as string}
        />
        <br />

        {/* attachmentType에 따라서 pdf파일이거나 링크이거나 */}
        {attachmentType === "file" ? (
          <>
            <label htmlFor="fileInputPDF">PDF 파일 첨부</label>
          </>
        ) : (
          <input
            type="text"
            name="link"
            value={linkURL}
            onChange={allOnChange}
            placeholder="링크"
          />
        )}
        <input
          type="file"
          id="fileInputThumbnail"
          style={{ display: "none" }}
          accept="image/*"
          name="thumbnail"
          onChange={(e) => allOnChange(e, "thumbnail")}
        />
        <input
          type="file"
          id="fileInputPDF"
          style={{ display: "none" }}
          name="pdf"
          accept="application/pdf, .doc, .docx, .ppt, .pptx"
          onChange={(e) => allOnChange(e, "pdf")}
        />
      </form>
      {/* <span>{errorMessage}</span> */}
      {/* <div>{validText}</div> */}
    </>
  );
};

export default PortfolioAddModal;
