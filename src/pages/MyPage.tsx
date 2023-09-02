import ClientMyPageComp from "../components/myPage/client/common/ClientMyPageComp";
import FreelancerMyPageComp from "../components/myPage/common/FreelancerMyPageComp";
import { useUserStore } from "../zustand/useUserStore";
import { S } from "./MyPage.styles";
import React from "react";

const MyPage = () => {
  const { userRole } = useUserStore();
  return (
    <S.MyPageContainer>
      {userRole === "freelancer" && <FreelancerMyPageComp />}
      {userRole === "client" && <ClientMyPageComp />}
    </S.MyPageContainer>
  );
};

export default MyPage;
