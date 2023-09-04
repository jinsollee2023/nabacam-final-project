import { styled } from "styled-components";

interface TitleProps {
  marginTop?: string;
  marginBottom?: string;
}

export const S = {
  ContractInfoContainer: styled.section`
    width: 100%;
    padding: 20px 10px 10px 10px;
  `,
  Title: styled.span<TitleProps>`
    font-size: 18px;
    font-weight: bold;
    margin-top: ${(props) => props.marginTop || "10px"};
    margin-bottom: ${(props) => props.marginBottom};
  `,
  Detail: styled.span<TitleProps>`
    font-size: 14px;
    color: var(--middle-gray);
    margin-top: ${(props) => props.marginTop || "10px"};
    margin-bottom: ${(props) => props.marginBottom};
  `,
  ContractListBox: styled.div`
    /* background-color: aliceblue; */
    margin-top: 20px;
  `,
  ContractInfoBox: styled.div`
    border-radius: 4px;
    border: 1.2px solid var(--lighter-gray);
    padding: 30px 0px 30px 10px;
    margin-top: 5px;
  `,
  ContractInfoGrayBox: styled.div`
    background-color: wheat;
    padding: 10px;
    margin-top: 5px;
  `,
  FilteredListsContainer: styled.div`
    width: 100%;
  `,
};
