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
    margin: 10px;
    padding: 20px;
    width: 25%;
    height: 50%;
    border-radius: 12px;
    overflow: auto;
    // 스크롤바 숨기기
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  `,
  CloseBtn: styled.button`
    float: right;
  `,
  Title: styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  `,
};
