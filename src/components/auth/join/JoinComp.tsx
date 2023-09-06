import React, { useState } from "react";
import { Tabs } from "antd";

import { useUserStore } from "../../../zustand/useUserStore";
import JoinForm from "./JoinForm";
import { S } from "./joinComp.styles";
type TabPosition = "left" | "right" | "top" | "bottom";

const JoinComp = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  const { userRole, setUserRole } = useUserStore();

  return (
    <>
      <S.JoinCompContainer>
        <S.TabsBack>
          <S.Tabs
            tabPosition={tabPosition}
            items={new Array(2).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label:
                  id === "1" ? (
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
      </S.JoinCompContainer>
    </>
  );
};

export default JoinComp;
