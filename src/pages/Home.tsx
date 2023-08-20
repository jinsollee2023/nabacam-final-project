import React from "react";

import FreelancerList from "../components/home/freelancerList/FreelancerList";
import ApplicantFreelancerList from "../components/home/applicantFreelancerList/ApplicantFreelancerList";
// 마켓플레이스 페이지

const Home = () => {
  return (
    <>
      <FreelancerList />
      <ApplicantFreelancerList />
    </>
  );
};

export default Home;
