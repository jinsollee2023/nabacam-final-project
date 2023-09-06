import { Radio } from "antd";
import { styled } from "styled-components";

export const S = {
  RadioWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 30px 0;
  `,
  InputText: styled.input`
    margin: 10px 0;
    padding: 10px 15px;
    width: 370px;
    outline: none;
    border: 1px solid var(--lighter-gray);
    border-radius: 5px;
  `,
  TextareaDesc: styled.textarea`
    width: 370px;
    padding: 10px 15px;
    border-radius: 5px;
    resize: none;
    border: 1px solid var(--lighter-gray);
    outline: none;
  `,
  ModalForm: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  PdfInputWrapper: styled.div`
    display: flex;
    margin-top: 20px;
  `,
  PdfInputLabel: styled.label`
    margin-right: 5px;
    color: var(--darker-gray);
  `,
};
