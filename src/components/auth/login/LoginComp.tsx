import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/zustand/useUserStore";
import { getUser } from "src/api/User";

const LoginComp = () => {
  // const { email, setUserEmail } = useUserStore();
  const [email, setEmail] = useState("");
  const { setUserId, setUserRole, setUser } = useUserStore();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error(error);
      } else if (data) {
        const user = await getUser(data.user.id as string);
        setUserId(user.userId as string);
        setUserRole(user.role as string);
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }

    navigate("/");
  };

  const emailOnChange = (e: any) => {
    setEmail(e.target.value);
    // setUserEmail(e.target.value);
  };
  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <input type="text" onChange={emailOnChange} />
        <input type="password" onChange={passwordOnChange} />
        <button>로그인</button>
      </form>
    </>
  );
};

export default LoginComp;
