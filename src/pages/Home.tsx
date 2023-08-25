import MenuTabBarComp from "../components/common/MenuTabBarComp";

// 프리랜서 구인 페이지

const Home = () => {
  const freelancerOfferMenu = [
    "프리랜서 마켓",
    "지원한 프리랜서 확인",
    "보류한 프리랜서",
    "프로젝트 탐색",
  ];

  const projectNavigationMenu = [
    "프로젝트 탐색",
    "지원한 프로젝트 확인",
    "제안받은 프로젝트 확인",
  ];

  return (
    <>
      <MenuTabBarComp menu={freelancerOfferMenu} />
    </>
  );
};

export default Home;
