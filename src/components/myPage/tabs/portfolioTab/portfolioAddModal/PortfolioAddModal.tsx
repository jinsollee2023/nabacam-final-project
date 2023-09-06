import { Radio } from "antd";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../../../zustand/useUserStore";
import { usePortfolioStore } from "../../../../../zustand/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";
import { Portfolio } from "../../../../../Types";
import PreviewImage from "../../../../../components/auth/join/PreviewImage";
import { FcOk } from "react-icons/fc";
import { S } from "./portfolioAddModal.styles";

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
  const allOnChange = (name: string, value: string | File) => {
    if (name === "title") {
      setTitle(value as string);
    }
    if (name === "desc") {
      setDesc(value as string);
    }
    if (name === "thumbnail") {
      setThumbNailFile(value as File);
    }
    if (name === "pdf") {
      setPdfFile(value);
    }
    if (name === "link") {
      setLinkURL(value as string);
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
      <S.RadioWrapper>
        <Radio.Group
          onChange={(e) => setAttachmentType(e.target.value)}
          value={attachmentType}
        >
          <Radio value="file" onClick={() => setLinkURL("")}>
            파일로 첨부하기
          </Radio>
          <Radio value="link" onClick={() => setPdfFile("")}>
            링크로 첨부하기
          </Radio>
        </Radio.Group>
      </S.RadioWrapper>

      <S.ModalForm>
        <PreviewImage
          handlePhotoURLOnChange={setThumbNailFile}
          defaultImage={newPortfolio.thumbNailURL as string}
        />
        <S.InputText
          type="text"
          name="title"
          value={title}
          onChange={(e) => allOnChange("title", e.target.value)}
          placeholder="제목"
          title={newPortfolio.title}
        />
        <S.TextareaDesc
          rows={5}
          name="desc"
          value={desc}
          onChange={(e) => allOnChange("desc", e.target.value)}
          placeholder="내용"
          title={newPortfolio.desc}
        />

        <S.PdfInputWrapper>
          {/* attachmentType에 따라서 pdf파일이거나 링크이거나 */}
          {attachmentType === "file" ? (
            <>
              <S.PdfInputLabel htmlFor="fileInputPDF">
                PDF 파일 첨부
              </S.PdfInputLabel>
            </>
          ) : (
            <S.InputText
              type="text"
              name="link"
              value={linkURL}
              onChange={(e) => allOnChange("link", e.target.value)}
              placeholder="링크"
            />
          )}
          <input
            type="file"
            id="fileInputThumbnail"
            style={{ display: "none" }}
            accept="image/*"
            name="thumbnail"
            onChange={(e) => allOnChange("thumbnail", e.target.value)}
          />
          <input
            type="file"
            id="fileInputPDF"
            style={{ display: "none" }}
            name="pdf"
            accept="application/pdf, .doc, .docx, .ppt, .pptx"
            onChange={(e) => {
              allOnChange("pdf", e.target.files![0]);
            }}
          />
          <span>{pdfFile && attachmentType === "file" && <FcOk />}</span>
        </S.PdfInputWrapper>
      </S.ModalForm>
    </>
  );
};

export default PortfolioAddModal;
