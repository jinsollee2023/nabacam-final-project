import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/common/Layout";
import GlobalStyles from "../GlobalStyles";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import MyPage from "../pages/MyPage";
import Register from "../pages/Register";
import ProjectManagement from "../pages/ProjectManagement";

import LoginComp from "../components/auth/login/LoginComp";
import ResetPassword from "../components/auth/resetpassword/ResetPassword";

import Welcome from "src/pages/Welcome";
import { PrivateRoute, PrivateRouteLogin } from "./PrivateRoute";

const Router = () => {
  console.log("test1234");
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/project-management" element={<ProjectManagement />} />
          </Route>
          <Route element={<PrivateRouteLogin />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<LoginComp />} />{" "}
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
