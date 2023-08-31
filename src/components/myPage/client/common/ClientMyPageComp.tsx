import MenuTabBarComp from "../../../../components/common/MenuTabBarComp";
import Account from "../../myProfile/Account";
import React from "react";

const ClientMyPageComp = () => {
  const menu = [
    "우리 기업 구성원",
    "진행 중인 프리랜서",
    "계약이 끝난 프리랜서",
  ];
  return (
    <div>
      <MenuTabBarComp menu={menu}>
        <Account />
      </MenuTabBarComp>
    </div>
  );
};

export default ClientMyPageComp;
