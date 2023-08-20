import { styled } from "styled-components";

export const S = {
  TapBtn: styled.button`
    cursor: pointer;
    background: transparent;
    border: none;
  `,
  FilterBtn: styled.button`
    float: right;
    margin-bottom: 10px;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
  `,
  List: styled.div`
    width: 70%;
    background-color: #0000001a;
    display: flex;
    gap: 10px;
    margin: 10px;
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
    width: 35px;
    height: 35px;
    border-radius: 20%;
    overflow: hidden;
    margin: 8px;
    background-color: #0000001a;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ProjectTitle: styled.span``,
  BtnBox: styled.div`
    width: 100%;
  `,
  CheckingBtn: styled.button`
    float: right;
    margin-right: 10px;
  `,
};
