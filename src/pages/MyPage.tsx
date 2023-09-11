import ClientMyPageComp from "../components/myPage/client/common/ClientMyPageComp";
import FreelancerMyPageComp from "../components/myPage/common/FreelancerMyPageComp";
import { useUserStore } from "../store/useUserStore";
import React from "react";

const MyPage = () => {
  const { user } = useUserStore();
  return (
    <>
      {user.role === "freelancer" && <FreelancerMyPageComp />}
      {user.role === "client" && <ClientMyPageComp />}
    </>
  );
};

export default MyPage;
