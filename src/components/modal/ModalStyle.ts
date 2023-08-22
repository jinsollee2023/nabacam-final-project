import { styled } from "styled-components";

export const S = {
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ModalContainer: styled.div`
    background-color: #fff;
    padding: 20px;
    width: 500px;
    height: 650px;
    border-radius: 20px;
  `,
  ModalTop: styled.div`
    position: relative;
    height: 30px;
  `,
  CloseBtn: styled.button`
    position: absolute;
    right: 0;
  `,
  ModalContents: styled.div`
    height: 90%;
    overflow: auto;
  `,
  ModalBtnBox: styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 10px;
  `,
};
