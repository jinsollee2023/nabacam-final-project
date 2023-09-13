import styled from "styled-components";

export const S = {
  EmailCheckdModalBG: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  EmailCheckdModalContents: styled.form`
    position: absolute;
    background-color: #fff;
    padding: 20px;
    width: 430px;
    height: 230px;
    border-radius: 12px;
  `,
  EmailInput: styled.input`
    background-color: #f0f0f0;
    width: 100%;
    font-size: 12px;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 17px 15px;
    margin: 10px 0 20px 0;
  `,
  EmailSendButton: styled.button`
    border-radius: 10px;
    width: 100%;
    background-color: var(--main-blue);
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
  `,
  Title: styled.h2`
    width: 100%;
    text-align: center;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0 20px 0;
  `,
  InfoText: styled.span`
    text-align: center;
    margin: 20px 0;
    width: 100%;
  `,
  CloseButton: styled.button`
    position: absolute;
    top: 0px;
    left: 90%;
    width: 15px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background-color: white;
    cursor: pointer;
  `,
};
