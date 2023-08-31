import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const updatePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (data) {
      alert("Password updated successfully!");
      setNewPassword("");
      navigate("/");
    }
    if (error) alert("There was an error updating your password.");
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => updatePasswordHandler(e)}>
        <input type="password" value={newPassword} onChange={passwordHandler} />
        <button>비밀번호변경</button>
      </form>
    </div>
  );
};

export default ResetPassword;
