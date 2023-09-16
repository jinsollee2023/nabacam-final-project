import React from "react";
import { styled } from "styled-components";
import ChatComp from "src/components/chat/ChatComp";

const Chat = () => {
  return (
    <>
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
