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
            <S.CloseBtn onClick={toggleModal}>
              <GrFormClose size={"25"} color="gray" />
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
