import { Button } from "antd";
import { styled } from "styled-components";

export const S = {
  ProjectListContainer: styled.div`
    height: 74vh;
    overflow-y: auto;
    margin-top: 10px;
    padding: 0 10px 0 0;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  Button: styled(Button)`
    background-color: var(--main-blue);

    &:hover {
      background-color: var(--hover-blue);
    }
  `,
};
