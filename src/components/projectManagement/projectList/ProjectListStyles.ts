import { styled } from "styled-components";

const S = {
  ProjectContainer: styled.div`
    overflow: auto;
    width: 100%;
    height: 73vh;
  `,
  ProjectCardBox: styled.div`
    background-color: aliceblue;
    width: 100%;
    height: 100px;

    padding: 15px;
    margin-bottom: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ProjcetTitleBox: styled.div`
    margin: auto 0;
  `,
  ProjectCardButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  `,
  ProjectInfoBox: styled.div``,
};

export default S;
