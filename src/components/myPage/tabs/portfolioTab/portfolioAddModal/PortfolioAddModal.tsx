import { Radio } from "antd";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../../../store/useUserStore";
import { usePortfolioStore } from "../../../../../store/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";
import { Portfolio } from "../../../../../Types";
import PreviewImage from "../../../../../components/auth/join/PreviewImage";
import { FcOk } from "react-icons/fc";
import { S } from "./portfolioAddModal.styles";
import { Errors } from "../PortfolioTab";
import useValidation from "src/hooks/useValidation";

interface PortfolioAddModalProps {
  errors: Errors;
  setErrors: (errors: Errors) => void;
}
const PortfolioAddModal = ({ errors, setErrors }: PortfolioAddModalProps) => {
  const { userId } = useUserStore();
  const { selectedPortfolio } = usePortfolioStore();

  const [attachmentType, setAttachmentType] = useState<string>(
    selectedPortfolio?.pdfFileURL
      ? "file"
      : selectedPortfolio?.linkURL
      ? "link"
      : "file"
  );
  const [thumbNailFile, setThumbNailFile] = useState<File | string | null>(
    selectedPortfolio
      ? selectedPortfolio.thumbNailURL
      : "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolios/default-porfolio-image.jpg"
  );

  const initialValues = {
    pfId: selectedPortfolio ? selectedPortfolio?.portfolioId : uuidv4(),
    title: selectedPortfolio ? selectedPortfolio?.title : "",
    desc: selectedPortfolio ? selectedPortfolio?.desc : "",
    pdfFile: selectedPortfolio ? selectedPortfolio.pdfFileURL || "" : "",
    linkURL: selectedPortfolio?.linkURL || "",
  };
  const [values, setValues] = useState(initialValues);

  const allOnChange = (name: string, value: string | File) => {
    setValues({ ...values, [name]: value });
  };

  // portfolioTab에서 사용하기 위해 newPortfolio가 담긴 changeNewPortfolio를 zustand로 보내는..
  const { changeNewPortfolio } = usePortfolioStore();
  const newPortfolio: Portfolio = {
    portfolioId: values.pfId,
    freelancerId: userId,
    title: values.title,
    desc: values.desc,
    thumbNailURL: thumbNailFile,
    pdfFileURL: values.pdfFile,
    linkURL: values.linkURL,
  };

  useEffect(() => {
    changeNewPortfolio(newPortfolio);
  }, [values]);

  const { validateInput } = useValidation();
  return (
    <>
      {selectedPortfolio ? null : (
        <S.RadioWrapper>
          <Radio.Group
            onChange={(e) => {
              setAttachmentType(e.target.value);
              setErrors({ title: null, desc: null, pdf: null, link: null });
            }}
            value={attachmentType}
          >
            <Radio
              value="file"
              onClick={() => setValues({ ...values, linkURL: "" })}
            >
              파일로 첨부하기
            </Radio>
            <Radio
              value="link"
              onClick={() => setValues({ ...values, pdfFile: "" })}
            >
              링크로 첨부하기
            </Radio>
          </Radio.Group>
        </S.RadioWrapper>
      )}

      <S.ModalForm>
        <PreviewImage
          handlePhotoURLOnChange={setThumbNailFile}
          defaultImage={newPortfolio.thumbNailURL as string}
        />
        <S.InputText
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => allOnChange("title", e.target.value)}
          onBlur={(e) => {
            const titleError = validateInput("제목", e.target.value);
            setErrors({ ...errors, title: titleError });
          }}
          placeholder="제목"
          title={newPortfolio.title}
        />
        <p>{errors.title}</p>
        <S.TextareaDesc
          rows={5}
          name="desc"
          value={values.desc}
          onChange={(e) => allOnChange("desc", e.target.value)}
          onBlur={(e) => {
            const descError = validateInput("내용", e.target.value);
            setErrors({ ...errors, desc: descError });
          }}
          placeholder="내용"
          title={newPortfolio.desc}
        />
        <p>{errors.desc}</p>

        <S.PdfInputWrapper>
          {/* attachmentType에 따라서 pdf파일이거나 링크이거나 */}
          {attachmentType === "file" || selectedPortfolio?.pdfFileURL ? (
            <>
              <S.PdfInputLabel htmlFor="fileInputPDF">
                PDF 파일 첨부
              </S.PdfInputLabel>
            </>
          ) : (
            <>
              <S.InputText
                type="text"
                name="link"
                value={values.linkURL}
                onChange={(e) => allOnChange("linkURL", e.target.value)}
                onBlur={(e) => {
                  const linkError = validateInput("링크", e.target.value);
                  setErrors({ ...errors, link: linkError });
                }}
                placeholder="링크"
              />
              <p>{attachmentType !== "file" ? errors.link : null}</p>
            </>
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
              allOnChange("pdfFile", e.target.files![0]);
              const pdfError = validateInput("PDF", e.target.files![0]);
              setErrors({ ...errors, pdf: pdfError });
            }}
          />
          <span>{values.pdfFile && <FcOk />}</span>
        </S.PdfInputWrapper>
        <p>{attachmentType === "file" ? errors.pdf : null}</p>
      </S.ModalForm>
    </>
  );
};

export default PortfolioAddModal;
