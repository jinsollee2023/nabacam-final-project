import { useUserStore } from "../store/useUserStore";
import MenuTabBarComp from "../components/common/MenuTabBarComp";

const Home = () => {
  const { user } = useUserStore();

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
