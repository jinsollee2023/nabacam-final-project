import { Tabs, TabsProps } from "antd";
import { S } from "./WorkFiledCategory.style";

interface WorkFieldCategoryProps {
  onSelectWorkField: (selectedLabel: string) => void;
}

const WorkFieldCategory = ({ onSelectWorkField }: WorkFieldCategoryProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `전체보기`,
    },
    {
      key: "2",
      label: `개발`,
    },
    {
      key: "3",
      label: `디자인`,
    },
    {
      key: "4",
      label: `마케팅`,
    },
    {
      key: "5",
      label: `운영`,
    },
    {
      key: "6",
      label: `기획`,
    },
    {
      key: "7",
      label: `기타`,
    },
  ];

  const onChange = (key: string) => {
    const selectedLabel = items?.find((item) => item.key === key)?.label;
    onSelectWorkField(selectedLabel as string);
  };

  return (
    <S.CategoryContainer>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {items.map((item) => (
        <Tabs.TabPane key={item.key} tab={item.label}>
          {item.children}
        </Tabs.TabPane>
      ))}
    </S.CategoryContainer>
  );
};

export default WorkFieldCategory;
