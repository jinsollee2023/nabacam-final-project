import { useUserStore } from "../zustand/useUserStore";
import MenuTabBarComp from "../components/common/MenuTabBarComp";
import React from "react";

const Home = () => {
  const { user, userId } = useUserStore();
  console.log(user, userId);
  const freelancerOfferMenu = [
    "프리랜서 마켓",
    "지원한 프리랜서",
    "보류한 프리랜서",
  ];

  const exploreProjectMenu = [
    "프로젝트 탐색",
    "지원한 프로젝트",
    "제안받은 프로젝트",
  ];

  return (
    <>
      {user.role === "client" && <MenuTabBarComp menu={freelancerOfferMenu} />}
      {user.role === "freelancer" && (
        <MenuTabBarComp menu={exploreProjectMenu} />
      )}
    </>
  );
};

export default Home;
