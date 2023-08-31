import React, { useState } from "react";
import { Tabs } from "antd";
import { styled } from "styled-components";
import { useUserStore } from "src/zustand/useUserStore";
import JoinForm from "./JoinForm";
type TabPosition = "left" | "right" | "top" | "bottom";

const JoinComp = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  const { userRole, setUserRole } = useUserStore();

  return (
    <>
      <S.TabsBack>
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
                  <S.tabsContainer onClick={() => setUserRole("freelancer")}>
                    프리랜서
                  </S.tabsContainer>
                ),
              key: id,
              children: <JoinForm role={userRole} />,
            };
          })}
        />
      </S.TabsBack>
    </>
  );
};

export default JoinComp;

const S = {
  tabsContainer: styled.div`
    position: relative;
    top: 150px;
    height: 250px;
    width: 200px;
    font-size: 40px;
    margin-top: 30%;
    margin-bottom: 30%;
  `,
  Tabs: styled.div`
    border: none;
  `,
  TabsBack: styled.div`
    && {
      position: relative;
      border: none;
      top: 100px;
      left: 100px;
    }
  `,
};
