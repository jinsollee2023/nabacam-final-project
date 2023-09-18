import { Button } from "antd";
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

  Button: styled(Button)`
    background-color: var(--main-blue);
  `,
};
