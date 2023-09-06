import { useState } from "react";

import { useUserStore } from "../../../zustand/useUserStore";
import JoinForm from "./JoinForm";
import { S } from "./joinComp.styles";

const JoinComp = () => {
  const { userRole, setUserRole } = useUserStore();

  return (
    // ant design 사용 삼항연산자로 탭 클릭시 변경
    <>
      <S.JoinCompContainer>
        <S.TabsBack>
          <S.Tabs
            tabPosition="left"
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
