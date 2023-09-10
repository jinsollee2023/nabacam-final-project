import React from "react";
import { S } from "./modal.style";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { useProjectValuesStore } from "src/store/useProjectValuesStore";
import useMemberValuesStore from "src/store/useMemberModal";

interface ModalProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  children: React.ReactNode;
  buttons?: React.ReactNode;
}

const Modal = ({ setIsModalOpen, children, buttons }: ModalProps) => {
  const { values } = useProjectValuesStore();
  const mamber = useMemberValuesStore();

  const toggleModal = () => {
    if (
      values.title === "" &&
      values.desc === "" &&
      values.category === "" &&
      values.minPay === "" &&
      values.maxPay === "" &&
      values.expectedStartDate === "" &&
      values.manager.name === "" &&
      values.manager.contact.email === "" &&
      values.manager.contact.phone === "" &&
      values.manager.team === "" &&
      values.qualification === null &&
      mamber.values.email === "" &&
      mamber.values.name === "" &&
      mamber.values.phone === "" &&
      mamber.values.team === ""
    ) {
      setIsModalOpen(false);
    } else {
      showConfirmation();
    }
  };
  console.log("buttons==>", buttons);
  const handleConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.
    setIsModalOpen(false);
    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <div>
        <p>입력한 내용이 전부없어지게됩니다.</p>
        <button onClick={handleConfirm}>확인</button>
        <button onClick={handleCancel}>취소</button>
      </div>,
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
              <GrFormClose size={"25"} color="red" />
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
