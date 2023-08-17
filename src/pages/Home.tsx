import React from "react";
import Logout from "../components/auth/logout/Logout";

// 마켓플레이스 페이지

const Home = () => {
  return (
    <div>
      <button onClick={Logout}>로그아웃</button>
    </div>
  );
};

export default Home;
