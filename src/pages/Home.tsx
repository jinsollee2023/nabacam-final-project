import React from "react";
import supabase from "../config/supabaseClient";
import ApplicantFreelancerLists from "../components/home/ApplicantFreelancerLists";
// 마켓플레이스 페이지

const Home = () => {
  // console.log(supabase);
  return (
    <>
      <div>Home</div>
      <ApplicantFreelancerLists />
    </>
  );
};

export default Home;
