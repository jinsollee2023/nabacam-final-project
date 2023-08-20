import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/common/Layout";
import GlobalStyles from "../GlobalStyles";
import Home from "../pages/Home";
import Chat from "../pages/Chat";

import MyPage from "../pages/MyPage";
import Register from "../pages/Register";
import Review from "../pages/Review";
import ProjectManagement from "../pages/ProjectManagement";
import { PrivateRoute } from "../components/auth/login/PrivateRoute";
import LoginComponent from "../components/auth/login/LoginComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/project-management" element={<ProjectManagement />} />
            <Route path="/review" element={<Review />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
