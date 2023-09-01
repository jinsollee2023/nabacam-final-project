import { Radio } from "antd";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useUserStore } from "../../../../../zustand/useUserStore";
import { usePortfolioStore } from "../../../../../zustand/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";
import { Portfolio } from "../../../../../Types";
import PreviewImage from "../../../../../components/auth/join/PreviewImage";
import { css, styled } from "styled-components";

// 유효성 검사...버튼을 클릭했을 때 예를 들이 newPortfolio.title이 "" 이 값이면
// newPortfolio.title을 value로 받는? 아니다 title을 value로 받는 input요소에 className을 추가하고 // 어케 찾아갈건데...ㅋ..props..........
// 해당 className을 가지고 있는 경우에는 이미 어떠한 스타일(빨간 선)을 적용하게끔? ....이게 되냐고...

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
        <div className="formBox">
          <S.InputText
            type="text"
            name="title"
            value={title}
            onChange={allOnChange}
            placeholder="제목"
            title={newPortfolio.title}
          />
        </div>
        <br />
        <div className="formBox">
          <S.InputText
            type="text"
            name="desc"
            value={desc}
            onChange={allOnChange}
            placeholder="내용"
            title={newPortfolio.desc}
          />
        </div>
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
        <S.TestDiv title="">테스트 박스</S.TestDiv>
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
    </>
  );
};

export default PortfolioAddModal;

const S = {
  TestDiv: styled.div`
    ${(props) =>
      props.title === "" &&
      css`
        color: orange;
        font-size: 18px;
      `}
  `,

  InputText: styled.input`
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    ${(props) =>
      props.title === ""
        ? css`
            border: 2px solid red;
          `
        : css`
            border: 1px solid #0086d0;
          `}
  `,
};
