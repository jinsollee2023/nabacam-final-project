import { Select } from "antd";
import { styled } from "styled-components";

export const S = {
  SortContainer: styled.div`
    margin-left: 2%;
    min-width: 20%;
    display: flex;
    align-items: center;
  `,

  Select: styled(Select)`
    .ant-select-selector {
      min-width: 270px;
      height: 48px !important;
      display: flex !important;
      align-items: center !important;
      outline: none !important;
      border-radius: 5px !important;
      margin-bottom: 5px !important;
      border: solid 1px var(--darker-gray) !important;
    }
  `,
};
