import ClientMyPageComp from "../components/myPage/client";
import FreelancerMyPageComp from "../components/myPage/myProfile";
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
