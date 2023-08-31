import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/zustand/useUserStore";
import { getUser } from "src/api/User";

import LoginValidation from "./LoginValidation";
import { Tabs } from "antd";

type TabPosition = "left" | "right" | "top" | "bottom";

interface LoginForm {
  email: string;
  password: string;
}

const LoginComp = () => {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  // const { email, setUserEmail } = useUserStore();
  const [values, setValues] = useState<any>(initialValues);
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");

  const [errors, setErrors] = useState<any>("");
  const { setUserId, setUserRole, setUser } = useUserStore();

  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setErrors(LoginValidation(values));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        console.error(error);
      } else if (data) {
        const user = await getUser(data.user.id as string);
        setUserId(user.userId as string);
        setUserRole(user.role as string);
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Tabs
        tabPosition={tabPosition}
        items={new Array(1).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: id == "1" && <div>클라이언트</div>,
            key: id,
            children: (
              <form onSubmit={loginHandler}>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}

                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}

                <button>로그인</button>
              </form>
            ),
          };
        })}
      />
    </>
  );
};

export default LoginComp;
