import React from "react";
import { S } from "./modal.style";
import { GrFormClose } from "react-icons/gr";

interface ModalProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  children: React.ReactNode;
  buttons?: React.ReactNode;
}
const Modal = ({ setIsModalOpen, children, buttons }: ModalProps) => {
  const toggleModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <S.ModalBox>
        <S.ModalContainer>
          <S.ModalTop>
            <S.CloseButton onClick={toggleModal}>
              <GrFormClose size={"25"} color="gray" />
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
