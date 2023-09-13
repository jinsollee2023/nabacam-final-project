import React from "react";
import { useUserStore } from "../store/useUserStore";
import { styled } from "styled-components";
import ChatComp from "../components/chat/ChatComp";

const Chat = () => {
  const { user } = useUserStore();

  return (
    <>
      {user.role === "freelancer" && <ChatComp />}
      {user.role === "client" && <ChatComp />}
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
