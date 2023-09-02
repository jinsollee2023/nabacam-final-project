import { styled } from "styled-components";

export const S = {
  MyPageContainer: styled.div`
    height: 100vh;
  `,
  MyPageContainerInner: styled.div`
    /* background-color: beige; */
    height: 50vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
