import MenuTabBarComp from "../components/common/MenuTabBarComp";

// 프리랜서 구인 페이지

const Home = () => {
  // const [activeTab, setActiveTab] = useState("freelancerMarket");
  const freelancerOfferMenu = ["프리랜서 마켓", "지원한 프리랜서 확인", "보류한 프리랜서"];

  return (
    <>
      <MenuTabBarComp menu={freelancerOfferMenu} />
    </>
  );
};

export default Home;
