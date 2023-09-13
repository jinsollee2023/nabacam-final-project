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
  const handleConfirm = () => {
    setIsModalOpen(false);
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>
          입력한 내용이 저장되지 않습니다.
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
            <S.CloseButton onClick={toggleModal}>
              <GrFormClose size={"25"} />
            </S.CloseButton>
          </S.ModalTop>
          <S.ModalContents>{children}</S.ModalContents>
          {buttons && <S.ModalButtonBox>{buttons}</S.ModalButtonBox>}
        </S.ModalContainer>
      </S.ModalBox>
    </>
  );
};
export default Modal;
