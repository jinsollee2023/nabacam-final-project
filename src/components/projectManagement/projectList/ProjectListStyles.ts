import { styled } from "styled-components";

interface ProjectCardBoxProps {
  justifyContent?: string;
  marginBottom?: number;
  fontSize?: string;
  fontWeight?: number;
}

const S = {
  SearchSortWrapper: styled.div`
    display: flex;
  `,
  ProjectContainer: styled.div`
    overflow: auto;
    width: 100%;
    height: 65vh;
    margin-top: 20px;
  `,
  ProjectCardBox: styled.div<ProjectCardBoxProps>`
    border: 1.5px solid var(--main-blue);
    border-radius: 4px;
    width: 100%;
    height: 100px;

    padding: 15px;
    margin-bottom: ${(props) => props.marginBottom}px;

    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: center;
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
  ModalTitle: styled.p<ProjectCardBoxProps>`
    font-size: ${(props) => props.fontSize || "20px"};
    font-weight: ${(props) => props.fontWeight || "700"};
    margin-bottom: 10px;
  `,
  ModalDetail: styled.p<ProjectCardBoxProps>`
    font-size: ${(props) => props.fontSize || "16px"};
    margin-bottom: ${(props) => props.marginBottom || "10"}px;
    line-height: 1.5;
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
  ModalInfoColumnBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ModalInfoFlexBox: styled.div`
    display: flex;
  `,

  ModalContentsLabel: styled.label`
    margin-bottom: 10px;
  `,
  ModalTitleInput: styled.input`
    height: 30px;
    margin-bottom: 10px;
    border: 1.5px solid var(--main-blue);
    border-radius: 4px;
  `,
  ModalDescTextarea: styled.textarea`
    height: 100px;
    resize: none;
    margin-bottom: 25px;
    border: 1.5px solid var(--main-blue);
    border-radius: 4px;
  `,
  ModalPayInfoBox: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-top: 10px;
  `,
  ModalPayBox: styled.div`
    width: 35%;
  `,
  ModalPostBtn: styled.button`
    width: 100%;
    height: 35px;
    cursor: pointer;
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
    margin-bottom: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  `,
};

export default S;
