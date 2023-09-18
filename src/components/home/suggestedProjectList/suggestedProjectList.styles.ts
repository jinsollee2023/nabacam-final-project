import { styled } from "styled-components";

export const S = {
  ProjectListContainer: styled.div`
    height: 82vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  AcceptButton: styled.button`
    width: 50%;
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
    background-color: #0086d0;
    color: white;
  `,
  DeclineButton: styled.button`
    width: 50%;
    height: 30px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    cursor: pointer;
  `,
};
