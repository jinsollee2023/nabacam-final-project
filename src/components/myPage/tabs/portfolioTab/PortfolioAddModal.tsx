import { Modal, Radio, Space } from "antd";
import React, { useState } from "react";
import PortfolioAddFile from "./PortfolioAddFile";
import PortfolioAddThumbnail from "./PortfolioAddThumbnail";
import useInput from "src/hooks/useInput";
import Image from "../../myProfile/Image";

interface EditFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PortfolioAddModal: React.FC<EditFormProps> = ({ open, setOpen }) => {
  // 상태관리
  const [attachmentType, setAttachmentType] = useState<string>("file");
  const fileTitleInput = useInput("");
  const linkTitleInput = useInput("");

  const addFreelancerPortfolioHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 선택된 첨부 유형(파일 또는 링크)에 따라 다른 작업 수행
    if (attachmentType === "file") {
      // 파일 첨부 방식 선택 시 처리
    } else {
      // 링크 첨부 방식 선택 시 처리
    }

    // 추가

    // 입력필드 비우고 닫기
    setOpen(false);
  };
  return (
    <>
      {open && (
        <Modal
          title="첨부 유형 선택"
          open={open}
          onOk={addFreelancerPortfolioHandler}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <Radio.Group
            onChange={(e) => setAttachmentType(e.target.value)}
            value={attachmentType}
          >
            <Radio value="file">파일로 첨부하기</Radio>
            <Radio value="link">링크로 첨부하기</Radio>
          </Radio.Group>
          {/* ---------------파일------------------ */}
          {attachmentType === "file" && (
            <>
              <form>
                <label>
                  타이틀
                  <br />
                  <input
                    type="text"
                    value={fileTitleInput.value}
                    onChange={fileTitleInput.onChange}
                  />
                </label>
              </form>
              <br />
              <PortfolioAddThumbnail />
              <br />
              {/* <form>
                <label>
                  글쓰기
                  <br />
                  <input
                    type="text"
                    value={}
                    onChange={}
                  />
                </label>
              </form> */}
              <br />
              <PortfolioAddFile />
            </>
          )}
          {/* ---------------링크------------------ */}
          {attachmentType === "link" && (
            <>
              <form>
                <label>
                  타이틀
                  <br />
                  <input
                    type="text"
                    value={linkTitleInput.value}
                    onChange={linkTitleInput.onChange}
                  />
                </label>
              </form>
              <br />
              <div>링크</div>
              <br />
              {/* <form>
                <label>
                  글쓰기
                  <br />
                  <input
                    type="text"
                    // value={}
                    // onChange={}
                  />
                </label>
              </form> */}
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default PortfolioAddModal;
