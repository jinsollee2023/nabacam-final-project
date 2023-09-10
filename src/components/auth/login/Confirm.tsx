import React from "react";
import { toast } from "react-toastify";

const Confirm = () => {
  const handleConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.

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
        <p></p>
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
};

export default Confirm;
