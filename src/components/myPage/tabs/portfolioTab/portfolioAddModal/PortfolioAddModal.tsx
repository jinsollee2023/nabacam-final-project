import { Radio } from "antd";
import React, { ChangeEvent, useState, useEffect } from "react";
// import useInput from "src/hooks/useInput";
import { useUserStore } from "src/zustand/useUserStore";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";
import { Portfolio } from "src/Types";
import usePortfolioInfoQueries from "src/hooks/usePortfolioInfoQueries";

const PortfolioAddModal = () => {
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
    selectedPortfolio ? selectedPortfolio.thumbNailURL : ""
  );
  const [pdfFile, setPdfFile] = useState<File | string>(
    selectedPortfolio ? selectedPortfolio.pdfFileURL || "" : ""
  );
  const [linkURL, setLinkURL] = useState(selectedPortfolio?.linkURL || "");

  const { userId } = useUserStore();

  // const selectedTitle = useInput(selectedPortfolio?.title || "");
  // const selectedDesc = useInput(selectedPortfolio?.desc || "");
  // const selectedLink = useInput(selectedPortfolio?.linkURL || "");

  // const handlePortfolioUpdate = () => {
  //   const updatedPortfolio = {
  //     portfolioId: selectedPortfolio?.portfolioId || "",
  //     freelancerId: userId,
  //     // title: selectedTitle.value,
  //     // desc: selectedDesc.value,
  //     title: selectedTitle,
  //     desc: selectedDesc,
  //     linkURL: "",
  //     thumbNailURL: "",
  //     pdfFileURL: "",
  //   };
  //   setSelectedPortfolio(updatedPortfolio);
  // };

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
      console.log(thumbNailFile);
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
    console.log("newPortfolio", newPortfolio);
  }, [pfId, userId, title, desc, linkURL, thumbNailFile, pdfFile]);

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
          // value={fileTitleInput.value}
          value={title}
          onChange={allOnChange}
          placeholder="제목"
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

        <label htmlFor="fileInputThumbnail">썸네일 사진 선택</label>
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
      </form>

      <>
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
      </>
    </>
  );
};

export default PortfolioAddModal;
