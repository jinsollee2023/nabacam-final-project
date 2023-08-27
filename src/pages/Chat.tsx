import React from "react";
import MemberList from "src/components/myPage/client/MemberList";
import ContractTerminationFreelancerList from "src/components/myPage/client/listOfFreelancersByStatus/ContractTerminationFreelancerList";
import OngoingFreelancerList from "src/components/myPage/client/listOfFreelancersByStatus/OngoingFreelancerList";

//커뮤니케이션 플랫폼: 프리랜서와 클라이언트 간의 메시지, 미팅, 파일 공유를 지원
const Chat = () => {
  return (
    <>
      <OngoingFreelancerList />
      <ContractTerminationFreelancerList />
    </>
  );
};

export default Chat;
