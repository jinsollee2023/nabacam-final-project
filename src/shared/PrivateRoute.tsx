import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

// 프라이빗라우터 토큰을 로컬스토리지로 가져와서 있는 사람만 이용가능 하게 걸러주는 역활

export const PrivateRoute = (): React.ReactElement => {
  const token = localStorage.getItem("sb-iwbhucydhgtpozsnqeec-auth-token");
  const tokenCheck = (token: string | null): boolean => {
    if (token) {
      return true;
    } else {
      toast.error("로그인 후 이용 가능합니다.");
      return false;
    }
  };

  return tokenCheck(token) ? <Outlet /> : <Navigate to="/login" />;
};

export const PrivateRouteLogin = (): React.ReactElement => {
  const token = localStorage.getItem("sb-iwbhucydhgtpozsnqeec-auth-token");

  const tokenCheck = (token: string | null): boolean => {
    if (token) {
      toast.error("로그인 상태입니다.");
      return true;
    } else {
      return false;
    }
  };

  return tokenCheck(token) ? <Navigate to="/home" /> : <Outlet />;
};
