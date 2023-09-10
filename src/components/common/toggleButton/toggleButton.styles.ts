import styled from "styled-components";

interface toggleButtonProps {
  left: string;
  right: string;
}

export const S = {
  CheckBox: styled.input<toggleButtonProps>`
    z-index: 9999;
    width: 5rem;
    height: 2rem;
    background: gray;
    border-radius: 2em;
    /* 선택X 텍스트 */
    ::before {
      position: absolute;
      content: "${(props) => props.left ?? "Yes"}";
      padding-left: 1em;
      width: 5rem;
      height: 2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: white;
      font-weight: bold;
      /* 텍스트 트랜지션 */
      transition: all 0.2s ease-in-out;
    }
    /* 선택X 원 */
    ::after {
      position: relative;
      content: "";
      display: block;
      width: 1.6em;
      height: 1.6em;
      top: calc((2rem - 1.6em) / 2);
      left: calc(5rem - 1.9em);
      border-radius: 50%;
      background: white;
      /* 원 이동 트랜지션 */
      transition: all 0.2s ease-in-out;
    }
    &:checked {
      background: black;
      /* 배경색 변경 트랜지션 */
      transition: all 0.2s ease-in-out;
      /* 선택 O 텍스트 */
      ::before {
        position: absolute;
        padding-right: 1em;
        content: "${(props) => props.right ?? "No"}";
        align-items: center;
        justify-content: flex-end;
        color: white;
      }
      /* 선택 O 원 */
      ::after {
        content: "";
        z-index: 2;
        top: calc((2rem - 1.6em) / 2);
        left: calc((2rem - 1.6em) / 2);
        width: 1.6em;
        height: 1.6em;
        display: block;
        border-radius: 50%;
        background: white;
        position: relative;
      }
    }
  `,
};
