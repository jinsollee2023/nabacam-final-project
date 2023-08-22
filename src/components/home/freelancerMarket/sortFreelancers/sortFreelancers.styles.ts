import { Select } from "antd";
import { styled } from "styled-components";

export const S = {
  SortContainer: styled.div`
    margin-left: 3%;
    width: 20%;
    display: flex;
    align-items: center;
  `,

  Select: styled(Select)`
    width: 200px;

    &:hover {
      border-color: gray !important;
    }
  `,
};
