import React from "react";
import supabase from "../../config/supabaseClient";

const Logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
  } catch (error) {
    alert(error);
  }
};

export default Logout;
