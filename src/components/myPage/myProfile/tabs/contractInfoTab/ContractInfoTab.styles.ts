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
    font-size: 16px;
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
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  `,
  ContractInfoBox: styled.div`
    border-radius: 10px;
    border: 1.2px solid var(--lighter-gray);
    padding: 10px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 670px;
    height: 80px;
  `,
  TitleAndSelectWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
};
