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
  SearchSortBtnBox: styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  `,
  SearchSortBtn: styled.span`
    cursor: pointer;
    color: var(--lighter-gray);
    font-size: 14px;
  `,
  SubmitBtn: styled.span``, // 상속
  ProjectContainer: styled.div`
    overflow: auto;
    width: 100%;
    height: 64vh;
    margin-top: 20px;
    position: relative;
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
  ProjectSpanBtn: styled.button`
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
  ProjectCardButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  `,

  // -----------------------------------------------------------//
  ModalTitle: styled.p<ModalTitleProps>`
    font-size: ${(props) => props.fontSize || "18px"};
    font-weight: ${(props) => props.fontWeight || "700"};
    margin-top: ${(props) => props.marginTop || "0px"};
    margin-bottom: ${(props) => props.marginBottom || "0px"};
  `,
  ModalDetail: styled.p<ModalDetailProps>`
    font-size: ${(props) => props.fontSize || "14px"};
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
    margin: 20px 0;
  `,
  ModalMainInfoInnerBox: styled.div`
    width: 50%;
  `,
  ModalMainInfoInnerBoxWrapper: styled.div`
    display: flex;
    width: 100%;
  `,
  ModalSubInfoBox: styled.div`
    display: flex;
    margin-bottom: 10px;
  `,
  ModalSubInfoInnerBox: styled.div`
    width: 50%;
  `,
  ModalInfoColumnBox: styled.div<ModalInfoColumnBoxProps>`
    display: flex;
    flex-direction: column;
    margin-left: ${(props) => props.marginLeft || "0px"};
  `,
  ModalInfoFlexBox: styled.div<ModalInfoFlexBoxProps>`
    display: flex;
    margin-top: ${(props) => props.marginTop || "0px"};
    margin-top: ${(props) => props.marginTop || "0px"};
  `,

  ModalContentsLabel: styled.label`
    margin-bottom: 10px;
  `,
  ModalTitleInput: styled.input<ModalTitleInputProps>`
    height: 30px;
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 4px;

    &:focus {
      outline: none;
    }
  `,
  ModalDescTextarea: styled.textarea<ModalDescTextareaProps>`
    height: 100px;
    resize: none;
    margin-bottom: 25px;
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 4px;

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
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  ModalMinMaxPayBox: styled.div`
    display: flex;
    align-items: center;
  `,
  ModalPostBtn: styled.button`
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 10px;
    margin-top: 8px;
    background-color: var(--main-blue);
    color: white;
  `,
  ModalSubTitle: styled.p`
    margin-bottom: 3px;
  `,
  ModalLine: styled.hr`
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
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
};

S.SubmitBtn = styled(S.SearchSortBtn)`
  border-bottom: solid var(--lighter-gray);
`;

export default S;
