import { styled } from "styled-components";

export const S = {
  AddMemberBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  ClientInfo: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ProfileImgBox: styled.div`
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 15px;
    margin: 20px 0;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ModalTitle: styled.span`
    font-size: 20px;
  `,
  WriteBox: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: start;
  `,
  Label: styled.label`
    color: #595959;
  `,
  Input: styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid var(--lighter-gray);
    margin: 5px 0 5px 0;
  `,

  ErrorMessage: styled.div<{ hasError: boolean }>`
    height: ${(props) => (props.hasError ? "20px" : "0")};
    margin: 2px 0 5px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
  `,
};
