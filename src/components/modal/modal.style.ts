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
    z-index: 100;
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
    cursor: pointer;
    background-color: transparent;
    border: none;
  `,
  ModalContents: styled.div`
    height: 90%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #848484;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #f3f3f3;
      border-radius: 10px;
    }
  `,
  ModalBtnBox: styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
  `,
};