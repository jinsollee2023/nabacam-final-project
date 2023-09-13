import { Select } from "antd";
import { styled } from "styled-components";

interface ProjectCardBoxProps {
  justifyContent?: string;
  marginTop?: number;
  marginBottom?: number;
  fontSize?: string;
  fontWeight?: number;
  backgroundColor?: string;
}
interface ModalTitleProps {
  fontSize?: string;
  fontWeight?: number;
  marginTop?: string;
  marginBottom?: string;
}
interface ModalDetailProps {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  fontSize?: string;
  color?: string;
}
interface ModalInfoColumnBoxProps {
  marginLeft?: string;
}

interface ModalInfoFlexBoxProps {
  marginTop?: string;
}

interface ModalTitleInputProps {
  borderColor: string;
}

interface ModalDescTextareaProps {
  borderColor: string;
}

const S = {
  SearchSortWrapper: styled.div`
    display: flex;
  `,
  SearchSortButtonBox: styled.div`
    width: 100px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  `,
  SearchSortButton: styled.span`
    cursor: pointer;
    color: var(--darker-gray);
    font-size: 14px;
    transition: color 0.5s ease-in-out;

    &.selected {
      color: var(--main-blue);
      font-weight: 700;
    }

    &:hover {
      color: var(--main-blue);
      font-weight: 700;
    }
  `,
  SubmitButton: styled.button`
    color: var(--darker-gray);
    font-size: 14px;
    border: none;
    outline: none;
    background-color: transparent;
  `,
  ProjectContainer: styled.div`
    overflow: auto;

    width: 100%;
    height: 65vh;
    position: relative;
    padding-right: 10px;

    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #848484;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #f3f3f3;
      border-radius: 10px;
    }
  `,
  ProjectCardBox: styled.div<ProjectCardBoxProps>`
    border: 1.5px solid var(--lighter-gray);
    border-radius: 8px;
    width: 100%;
    height: 100px;

    padding: 15px;
    margin-bottom: ${(props) => props.marginBottom}px;

    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
  `,
  ProjectSpanButton: styled.button`
    background-color: var(--main-blue);
    color: white;
    border: none;
    border-radius: 15px;
    width: 500px;
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 35px;
    left: 50%;
    z-index: 1;
    transform: translateX(-25%);
  `,
  ProjcetTitleBox: styled.div`
    margin: auto 0;
    cursor: pointer;
  `,
  ProfileCardRightContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: end;
  `,
  ProjectCardButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ProjectManager: styled.div`
    margin: 10px 0 3px 0;
  `,

  // -----------------------------------------------------------//
  ModalTitle: styled.p<ModalTitleProps>`
    font-size: ${(props) => props.fontSize || "18px"};
    font-weight: ${(props) => props.fontWeight || "700"};
    margin-top: ${(props) => props.marginTop || "0px"};
    margin-bottom: ${(props) => props.marginBottom || "10px"};
  `,
  ModalDetail: styled.p<ModalDetailProps>`
    font-size: ${(props) => props.fontSize || "16px"};
    margin-top: ${(props) => props.marginTop || "0px"};
    margin-bottom: ${(props) => props.marginBottom || "0px"};
    margin-left: ${(props) => props.marginLeft || "0px"};
    margin-right: ${(props) => props.marginRight || "0px"};
    color: ${(props) => props.color};
    height: 28px;

    line-height: 1.5;
    text-align: justify;
  `,
  ModalDetailDesc: styled.p<ModalDetailProps>`
    font-size: ${(props) => props.fontSize || "16px"};
    margin-top: ${(props) => props.marginTop || "0px"};
    margin-bottom: ${(props) => props.marginBottom || "0px"};
    margin-left: ${(props) => props.marginLeft || "0px"};
    margin-right: ${(props) => props.marginRight || "0px"};
    color: ${(props) => props.color};
    line-height: 1.5;
    text-align: justify;
  `,
  ModalMainInfoBox: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
  `,
  ModalMainInfoInnerBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 49%;
  `,
  ModalMainInfoInnerBoxWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  `,
  ModalSubInfoBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  `,
  ModalSubInfoInnerBox: styled.div`
    flex-direction: column;
    align-items: flex-start;
    width: 49%;
  `,
  ModalInfoColumnBox: styled.div<ModalInfoColumnBoxProps>`
    display: flex;
    flex-direction: column;
    margin-left: ${(props) => props.marginLeft || "0px"};
  `,
  ModalInfoFlexBox: styled.div<ModalInfoFlexBoxProps>`
    display: flex;
    margin-top: ${(props) => props.marginTop || "0px"};
  `,

  ModalContentsLabel: styled.label`
    color: #595959;
  `,
  ModalTitleInput: styled.input<ModalTitleInputProps>`
    height: 30px;
    margin: 5px 0;
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 4px;
    width: 100%;

    &:focus {
      outline: none;
    }
  `,
  ModalDescTextarea: styled.textarea<ModalDescTextareaProps>`
    height: 80px;
    resize: none;
    margin: 5px 0;
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 4px;
    width: 100%;

    &:focus {
      outline: none;
    }
  `,
  ModalPayInfoBox: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-top: 10px;
  `,
  ModalPayBox: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  ModalMinMaxPayBox: styled.div`
    display: flex;
    align-items: center;
  `,
  ModalDeleteButton: styled.button`
    width: 50%;
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
  `,
  ModalPostButton: styled.button`
    width: 50%;
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    background-color: #0086d0;
    color: white;
  `,
  ModalSubTitle: styled.p`
    margin-bottom: 3px;
  `,
  ModalLine: styled.hr`
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    margin: 15px 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  `,
  DetailModalContainer: styled.div`
    margin-right: 10px;
  `,
  ImageBox: styled.div`
    width: 130px;
    height: 130px;
    border-radius: 5px;
    object-fit: cover;

    img {
      width: 100%;
      height: 100%;
    }
  `,
  SearchSortButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    padding-right: 25px;
  `,
  ProjectSelect: styled(Select)`
    .ant-select-selector {
      border: 1px solid var(--lighter-gray) !important;
      box-shadow: none !important;

      &.ant-select-focused {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;

        &:focus {
          border: none !important;
          outline: 0 !important;
          box-shadow: none !important;
        }
      }
    }
  `,
  ErrorMessage: styled.div<{ hasError: boolean }>`
    height: ${(props) => (props.hasError ? "15px" : "0")};
    margin: 2px 0;
    color: #ef0000;
    font-size: 14px;
    overflow: hidden;
    transition: height 0.3s;
    margin-bottom: 15px;
  `,
  WriteBox: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
  `,
  PayLabelAndCheckBoxWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
};

export default S;
