import React, { useState } from "react";
import { S } from "./ModalStyle";

interface ModalProps {
  triggerButtonLabel: string;
  children: React.ReactNode;
  triggerButtonStyle?: React.CSSProperties;
  buttons?: React.ReactNode;
}

const Modal = ({ triggerButtonLabel, children, triggerButtonStyle, buttons }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button onClick={toggleModal} style={triggerButtonStyle}>
        {triggerButtonLabel}
      </button>

      {isModalOpen && (
        <S.ModalBox>
          <S.ModalContainer>
            <S.ModalTop>
              <S.CloseBtn onClick={toggleModal}>X</S.CloseBtn>
            </S.ModalTop>
            <S.ModalContents>{children}</S.ModalContents>
            {buttons && <S.ModalBtnBox>{buttons}</S.ModalBtnBox>}
          </S.ModalContainer>
        </S.ModalBox>
      )}
    </>
  );
};

export default Modal;
