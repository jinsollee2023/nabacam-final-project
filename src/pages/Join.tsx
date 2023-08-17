import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import JoinComponent from "../components/join/JoinComponent";

const Join = () => {
  return (
    <>
      <JoinComponent />
    </>
  );
};

export default Join;
