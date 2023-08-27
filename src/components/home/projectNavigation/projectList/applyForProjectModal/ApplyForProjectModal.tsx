import { useState } from "react";
import DatePicker from "react-datepicker";
import { Radio, RadioChangeEvent, Slider, Space } from "antd";
import { Project } from "src/Types";

interface ApplyForProjectModalProps {
  projectItem: Project;
  clientName: string;
}

const ApplyForProjectModal = ({
  projectItem,
  clientName,
}: ApplyForProjectModalProps) => {
  const [radioValue, setRadioValue] = useState("disable");
  const [inputEnabled, setInputEnabled] = useState(false);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [selectDeadLine, setSelectDeadLine] = useState<Date>(
    projectItem.deadLine
  );
  // const [paySlideOff, setPaySlideOff] = useState(false);
  const [minPay, setMinPay] = useState(projectItem.pay.min);
  const [maxPay, setMaxPay] = useState(projectItem.pay.max);

  const handleRadioChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setRadioValue(value);
    value === "enable" ? setInputEnabled(true) : setInputEnabled(false);
  };

  const handleDeadLineDateChange = (date: Date) => {
    setSelectDeadLine(date);
    setIsCalenderOpen(!isCalenderOpen);
  };

  const handleOnClick = () => {
    if (inputEnabled) {
      setIsCalenderOpen(!isCalenderOpen);
    }
  };

  const formatDate = (selectDeadLine: string) => {
    const date = new Date(selectDeadLine);
    return date.toISOString().slice(0, 10);
  };

  const minPayOnChange = (value: number) => {
    setMinPay(value);
  };
  const maxPayOnChange = (value: number) => {
    setMaxPay(value);
  };

  return (
    <div>
      <span>{clientName}</span>
      <span>{projectItem.title}</span>
      <div>
        <span>프로젝트 설명</span>
        <span>{projectItem.title}</span>
      </div>
      <div>
        <div>
          <span>목표 기간</span>
          <span>{String(projectItem.deadLine)}</span>
        </div>
        <div>
          <span>급여</span>
          <span>
            {projectItem.pay.min}~{projectItem.pay.max}
          </span>
        </div>
        <div>
          <span>모집 분야</span>
          <span>{projectItem.category}</span>
        </div>
      </div>
      <div>
        <div>
          <Radio.Group onChange={handleRadioChange} value={radioValue}>
            <Space direction="vertical">
              <Radio value={"disable"}>협의 없이 지원하기</Radio>
              <Radio value={"enable"}>협의 하고 지원하기</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div>
          <div>
            <span>목표 기간</span>
            <span onClick={handleOnClick}>
              {formatDate(String(selectDeadLine))}
            </span>
            {isCalenderOpen && (
              <DatePicker
                selected={inputEnabled ? new Date(projectItem.deadLine) : null}
                disabled={!inputEnabled}
                onChange={handleDeadLineDateChange}
                inline
              />
            )}
          </div>
          <div>
            <span>급여</span>
            <div>
              <label>최소 {inputEnabled ? null : `${minPay}만원`}</label>
              <Slider
                min={100}
                max={1000}
                defaultValue={Number(minPay)}
                disabled={!inputEnabled}
                onChange={minPayOnChange}
                tooltip={{ formatter: null }}
              />
            </div>
            <div>
              <label>최대 {inputEnabled ? null : `${maxPay}만원`}</label>
              <Slider
                min={100}
                max={1000}
                defaultValue={Number(maxPay)}
                disabled={!inputEnabled}
                onChange={maxPayOnChange}
                tooltip={{ formatter: null }}
              />
            </div>
          </div>
          <div>
            <span>수정 이유</span>
            <input type="text" disabled={!inputEnabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForProjectModal;
