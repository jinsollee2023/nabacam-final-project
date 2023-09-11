import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRouteLogin = (): React.ReactElement => {
  console.log("test");
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
