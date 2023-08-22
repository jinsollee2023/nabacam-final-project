import { styled } from "styled-components";

export const S = {
  TapBtn: styled.button`
    cursor: pointer;
    background: transparent;
    border: none;
  `,
  FilterBtn: styled.button`
    width: 80px;
    height: 25px;
    float: right;
    margin-bottom: 20px;
    border: none;
    border-radius: 10px;
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
  `,
  List: styled.div`
    margin-top: 30px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    margin-bottom: 25px;
    border-radius: 10px;
    align-items: center;
    overflow: auto;
    // 스크롤바 숨기기
    //  -ms-overflow-style: none; /* IE, Edge */
    //  scrollbar-width: none; /* Firefox */
    //  &::-webkit-scrollbar {
    // display: none; /* Chrome, Safari, Opera */
    //  }
  `,
  ListContents: styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    text-align: center;
  `,
  ImgBox: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20%;
    overflow: hidden;
    margin: 8px;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ProjectTitle: styled.span`
    color: gray;
    float: right;
    /* text-align: right; */
  `,
  CheckingBtn: styled.button`
    float: right;
    margin-right: 10px;
  `,
  Btn: styled.button`
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 10px;
  `,
  ModalTitle: styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 30px;
  `,
};
