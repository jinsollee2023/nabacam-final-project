import { styled } from "styled-components";

export const S = {
  AddMemberBox: styled.div`
    top: 15%;
    gap: 30px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  ModalTitle: styled.span`
    font-size: 20px;
    line-height: 50px;
  `,
  WriteBox: styled.div`
    gap: 20px;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
  `,
  Label: styled.label`
    width: 5rem;
    color: #595959;
  `,
  Input: styled.input`
    width: 200px;
    height: 35px;
    padding-left: 10px;
  `,
};
