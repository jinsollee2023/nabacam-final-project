import React from "react";
import { useUserStore } from "../store/useUserStore";
import { styled } from "styled-components";
import ChatComp from "../components/chat/ChatComp";
import ChatCompForFreelancerAsSender from "../components/chat/ChatCompForFreelancerAsSender";

const Chat = () => {
  const { user } = useUserStore();

  return (
    <>
      {user.role === "client" && <ChatComp />}
      {user.role === "freelancer" && <ChatCompForFreelancerAsSender />}
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
