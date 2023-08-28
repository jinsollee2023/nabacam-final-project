import React, { useState } from "react";
import { Tabs } from "antd";
import JoinComponent from "./JoinForm";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
type TabPosition = "left" | "right" | "top" | "bottom";

const JoinComp = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  const { userRole, setUserRole } = useUserStore();

  return (
    <>
      <Tabs
        tabPosition={tabPosition}
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label:
              id == "1" ? (
                <S.tabsContainer onClick={() => setUserRole("client")}>
                  클라이언트
                </S.tabsContainer>
              ) : (
                <div onClick={() => setUserRole("freelancer")}>프리랜서</div>
              ),
            key: id,
            children:
              id == "1" ? (
                <JoinComponent freelancerOpen={false} role={userRole} />
              ) : (
                <JoinComponent freelancerOpen={true} role={userRole} />
              ),
          };
        })}
      />
    </>
  );
};

export default JoinComp;

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
