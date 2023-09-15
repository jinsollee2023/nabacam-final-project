import { styled } from "styled-components";

export const S = {
  RadioWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
  `,
  InputText: styled.input`
    padding: 10px 15px;
    width: 370px;
    outline: none;
    border: 1px solid var(--lighter-gray);
    border-radius: 5px;
    margin-top: 10px;
  `,
  LinkInputAndErrorMessageWrapper: styled.div`
    text-align: center;
  `,
  TextareaDesc: styled.textarea`
    width: 370px;
    padding: 10px 15px;
    border-radius: 5px;
    resize: none;
    border: 1px solid var(--lighter-gray);
    outline: none;
    line-height: 1.5;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  ModalForm: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  PdfInputWrapper: styled.div`
    display: flex;
  `,
  PdfInputLabel: styled.label`
    margin-right: 5px;
    color: var(--darker-gray);
  `,
  ErrorMessage: styled.div<{ hasError: boolean }>`
    height: ${(props) => (props.hasError ? "20px" : "0")};
    margin: 10px 0 20px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
  `,
};
