import { styled } from "styled-components";
import { Select } from "antd";

interface ProjectCardBoxProps {
  justifyContent: string;
  marginBottom: number;
}

const S = {
  ProjectContainer: styled.div`
    overflow: auto;
    width: 100%;
    height: 73vh;
  `,
  ProjectCardBox: styled.div<ProjectCardBoxProps>`
    background-color: aliceblue;
    width: 100%;
    height: 100px;

    padding: 15px;
    margin-bottom: ${(props) => props.marginBottom}px;

    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: center;

    cursor: pointer;
  `,
  ProjcetTitleBox: styled.div`
    margin: auto 0;
  `,
  ProjectCardButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  `,
  ModalTitle: styled.p`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  `,
  ModalMainInfoBox: styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    border-bottom: 2px solid grey;
  `,
  ModalSubInfoBox: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  `,
  ModalContentsLabel: styled.label`
    margin-bottom: 5px;
  `,
  ModalTitleInput: styled.input`
    height: 30px;
    margin-bottom: 10px;
  `,
  ModalDescTextarea: styled.textarea`
    height: 100px;
    resize: none;
    margin-bottom: 25px;
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
};

export default S;
