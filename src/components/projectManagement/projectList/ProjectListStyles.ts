import { styled } from "styled-components";

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
  ProjectMainInfoBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProjectSubInfoBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

export default S;
