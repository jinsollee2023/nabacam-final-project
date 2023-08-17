import React from "react";
import { styled } from "styled-components";

const ContractInfoTab = () => {
  return (
    <S.ContractInfoContainer>
      <div>프리랜서 이력</div>
      <S.ContractInfoBox>hx1</S.ContractInfoBox>
      <S.ContractInfoBox>hx2</S.ContractInfoBox>
      <S.ContractInfoBox>hx3</S.ContractInfoBox>
      <S.ContractInfoBox>hx4</S.ContractInfoBox>
    </S.ContractInfoContainer>
  );
};

export default ContractInfoTab;

const S = {
  ContractInfoContainer: styled.section`
    width: 100%;
    padding: 10px;
  `,
  ContractInfoBox: styled.div`
    background-color: #8080803d;
    padding: 10px;
    margin-top: 5px;
  `,
};
