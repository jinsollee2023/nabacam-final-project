import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space, Tabs } from "antd";
import JoinComponent from "../join/JoinComponent";
import { styled } from "styled-components";
type TabPosition = "left" | "right" | "top" | "bottom";

const JoinTab: React.FC = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  const [role, setRole] = useState("");

  return (
    <>
      <Tabs
        tabPosition={tabPosition}
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label:
              id == "1" ? (
                <S.tabsContainer onClick={() => setRole("client")}>
                  클라이언트
                </S.tabsContainer>
              ) : (
                <div onClick={() => setRole("freelancer")}>프리랜서</div>
              ),
            key: id,
            children:
              id == "1" ? (
                <JoinComponent freelancerOpen={false} role={role} />
              ) : (
                <JoinComponent freelancerOpen={true} role={role} />
              ),
          };
        })}
      />
    </>
  );
};

export default JoinTab;

const S = {
  tabsContainer: styled.div`
    height: 100%;
    padding: 10px;
  `,
  Tabs: styled.div`
    height: 100%;
    padding: 10px;
  `,
};
