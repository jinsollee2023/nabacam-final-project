import ClientMyPageComp from "src/components/myPage/client/common/ClientMyPageComp";
import FreelancerMyPageComp from "src/components/myPage/common/FreelancerMyPageComp";
import { useUserStore } from "src/zustand/useUserStore";
import { styled } from "styled-components";

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

const S = {
  Container: styled.div`
    padding-left: 30px;
  `,
};
