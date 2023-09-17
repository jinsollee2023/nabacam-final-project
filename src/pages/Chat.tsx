import React from "react";
import { styled } from "styled-components";
import ChatComp from "../components/chat/ChatComp";
import { useUserStore } from "../store/useUserStore";

const Chat = () => {
  const { user } = useUserStore();
  return (
    <>
      {/* {user.role === "client" && <ChatComp />}
      {user.role === "freelancer" && <ChatComp />} */}
      <ChatComp />
    </>
  );
};

export default Chat;

const S = {
  Text: styled.div`
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
  `,
};
