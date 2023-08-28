import ClientMyPageComp from "src/components/myPage/client/common/ClientMyPageComp";
import FreelancerMyPageComp from "src/components/myPage/common/FreelancerMyPageComp";
import { useUserStore } from "src/zustand/useUserStore";

const MyPage = () => {
  const { userRole } = useUserStore();
  return (
    <>
      {userRole === "freelancer" && <FreelancerMyPageComp />}
      {userRole === "client" && <ClientMyPageComp />}
    </>
  );
};

export default MyPage;
