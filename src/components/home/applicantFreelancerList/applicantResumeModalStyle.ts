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
    width: 420px;
    height: 600px;
    border-radius: 20px;
    overflow: auto;
    // 스크롤바 숨기기
    // -ms-overflow-style: none; /* IE, Edge */
    // scrollbar-width: none; /* Firefox */
    // &::-webkit-scrollbar {
    //   display: none; /* Chrome, Safari, Opera */
    // }
  `,
  CloseBtn: styled.button`
    float: right;
  `,
  Title: styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 30px;
  `,
  UserInfoBox: styled.div`
    display: flex;
    gap: 10px;
    text-align: center;
    align-items: center;
  `,
  ProfileImgBox: styled.div`
    width: 80px;
    height: 80px;
    border-radius: 30%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  `,
  UserWorkField: styled.p`
    font-size: 14px;
    color: gray;
  `,
  ResumeContent: styled.p`
    margin: 10px 0;
    font-weight: bold;
  `,
  ProfileBox: styled.div`
    border-radius: 10px;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  BtnBox: styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
  `,
  Btn: styled.button`
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 10px;
  `,
};
