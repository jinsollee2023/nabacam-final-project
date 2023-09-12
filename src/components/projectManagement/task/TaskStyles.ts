import { CommonS } from "src/components/common/button/commonButton";
import { styled } from "styled-components";

interface TaskDetailBoxProps {
  backgroundColor?: string;
  cursor?: string | null;
}
interface TaskDetailBoxWrapperProps {
  width?: string;
}

interface ColumnLabelProps {
  backgroundColor?: string;
  width: string;
}

const S = {
  TaskCardBox: styled.div`
    min-width: 520px;
    display: flex;
    position: relative;
    padding-right: 20px;
  `,
  TaskDetailBoxWrapper: styled.div<TaskDetailBoxWrapperProps>`
    width: ${(props) => props.width};
  `,
  TaskDetailBox: styled.div<TaskDetailBoxProps>`
    cursor: ${(props) => (props.cursor ? props.cursor : null)};
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : "#ffffff"};
    height: 40px;
    margin: 5px 10px 5px 0;
    border: 1.2px solid var(--lighter-gray);
    border-radius: 3px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    font-size: 14px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TaskDeleteButton: styled.button`
    background-color: transparent;
    position: absolute;
    top: 12px;
    right: 0;
    border: none;
    cursor: pointer;
  `,
  SelectAddButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  TaskAddButton: styled(CommonS.CommonBtn)`
    width: 200px;
    height: 30px;
    margin-top: 0px;
    padding: 5px;
  `,
  TaskAddSpan: styled(CommonS.CommonSpan)`
    font-size: 13px;
  `,
  TimelineContainer: styled.div`
    overflow-y: auto;
    height: 80vh;
    margin-top: 20px;
    padding-right: 10px;

    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #848484;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #f3f3f3;
      border-radius: 10px;
    }
  `,
  ColumnLabelWrapper: styled.div`
    display: flex;
    margin: 0 0 5px 10px;
  `,
  ColumnLabel: styled.div<ColumnLabelProps>`
    width: ${(props) => props.width};
    height: 30px;
    margin: 0px 10px 0px 0;

    display: flex;
    align-items: end;
    font-weight: bold;
  `,
  TaskTitleInput: styled.input`
    height: 40px;
    width: 100%;
    text-align: center;
  `,
  CustomDatePicker: styled.div`
    background-color: aliceblue;
    padding: 5px;
    width: 220px;
    display: grid;
    grid-template-columns: 100px 100px;
    grid-auto-rows: 25px;
    gap: 10px;
  `,
  CustomDatePickerBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: aqua;
  `,
};

export default S;
