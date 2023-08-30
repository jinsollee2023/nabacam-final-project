import { useState } from "react";
import { styled } from "styled-components";

interface MyPageMenuTabBarCompProps {
  menu: string[];
}

const MyPageMenuTabBarComp = ({ menu }: MyPageMenuTabBarCompProps) => {
  const [currentTab, setCurrentTab] = useState(menu[0]);
  return (
    <>
      <S.MenuTabBar>
        {menu.map((item, index) => (
          <S.MenuTab
            key={index}
            onClick={() => setCurrentTab(item)}
            fontWeight={currentTab === item ? 600 : 400}
          >
            {item}
          </S.MenuTab>
        ))}
      </S.MenuTabBar>
    </>
  );
};

export default MyPageMenuTabBarComp;

interface MenuTabProps {
  fontWeight?: number;
}

const S = {
  MenuTabBar: styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid var(--main-blue);
    display: flex;
    align-items: center;
    padding: 0 20px;
  `,
  MenuTab: styled.span<MenuTabProps>`
    margin: 0 20px;
    font-size: 32px;
    font-weight: ${(props) => props.fontWeight};
    cursor: pointer;
  `,
};
