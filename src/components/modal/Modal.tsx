import React from "react";
import { S } from "./modal.style";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { CommonS } from "../common/button/commonButton";

interface ModalProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  availableClose?: boolean;
}

const Modal = ({
  setIsModalOpen,
  children,
  buttons,
  availableClose,
}: ModalProps) => {
  const toggleModal = () => {
    if (availableClose === undefined || availableClose) {
      setIsModalOpen(false);
    } else {
      showConfirmation();
    }
  };
  console.log("availableClose==>", availableClose);
  const handleConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    setIsModalOpen(false);
    toast.dismiss();
  };

  const handleCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>
          입력한 내용이 전부없어지게됩니다.
        </CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      <S.ModalBox>
        <S.ModalContainer>
          <S.ModalTop>
            <S.CloseBtn onClick={toggleModal}>
              <GrFormClose size={"25"} />
            </S.CloseBtn>
          </S.ModalTop>
          <S.ModalContents>{children}</S.ModalContents>
          {buttons && <S.ModalBtnBox>{buttons}</S.ModalBtnBox>}
        </S.ModalContainer>
      </S.ModalBox>
    </>
  );
};
export default Modal;
