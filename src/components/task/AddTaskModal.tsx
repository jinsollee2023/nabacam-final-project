import { styled } from "styled-components";

const AddTaskModal = () => {
  return (
    <S.ModalBackGround>
      <S.ModalContent>
        <form>
          <input />
        </form>
      </S.ModalContent>
    </S.ModalBackGround>
  );
};

export default AddTaskModal;

const S = {
  ModalBackGround: styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
  `,
  ModalContent: styled.div`
    background-color: #fff;
    padding: 20px;
    width: 420px;
    height: 500px;
    border-radius: 10px;
  `,
};
