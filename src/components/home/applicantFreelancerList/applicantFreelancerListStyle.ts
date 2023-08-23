import { styled } from "styled-components";

export const S = {
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
  `,
  ListContainer: styled.div`
    overflow: auto;
    height: 47rem;
  `,
  List: styled.div`
    margin-top: 30px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    margin-bottom: 25px;
    border-radius: 10px;
    align-items: center;
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
  FreelancerName: styled.span`
    width: 80px;
    text-align: left;
  `,
  ListProjectTitle: styled.div`
    width: 80%;
  `,
  ProjectTitle: styled.span`
    color: gray;
    float: right;
    /* text-align: right; */
  `,
  CheckingBtn: styled.button`
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
    background-color: #1fc17d;
    color: white;

    /* position: absolute;
    right: 0; */
    float: right;
    margin-right: 10px;
    cursor: pointer;
  `,
  Btn: styled.button`
    width: 50%;
    height: 35px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    margin-top: 8px;
    cursor: pointer;
  `,
  ModalTitle: styled.div`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: 30px;
  `,
};
