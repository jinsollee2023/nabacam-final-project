import ClientMyPageComp from "../components/myPage/client/common/ClientMyPageComp";
import FreelancerMyPageComp from "../components/myPage/myProfile/FreelancerMyPageComp";
import { useUserStore } from "../store/useUserStore";
import React from "react";

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
