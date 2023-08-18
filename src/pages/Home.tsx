import React from "react";
import FreelancerList from "../components/home/freelancerList/FreelancerList";
import ApplicantFreelancerLists from "../components/home/ApplicantFreelancerLists";
// 마켓플레이스 페이지

const Home = () => {
  return (
    <>
      <FreelancerList />
      <ApplicantFreelancerLists />
    </>
  );
};

export default Home;
