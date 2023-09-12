import React from "react";
import { S } from "./welcome.styles";

const ChatInformation = () => {
  return (
    <div>
      <S.MenuTitleBox>
        <S.MenuTitle>커뮤니케이션 💬</S.MenuTitle>
        <S.MenuDesc>
          간편한 채팅 기능을 제공하여 실시간으로 의견을 교환하고, 프로젝트의
          세부 사항을 논의할 수 있도록 도와드려요.
        </S.MenuDesc>
      </S.MenuTitleBox>
      <S.MenuContainer>
        <S.MenuContentsInnerBox width="48%" margin="1%" height="450px">
          <img src="" alt="채팅 스크린샷" />
        </S.MenuContentsInnerBox>
        <S.MenuContentsInnerBox
          width="48%"
          margin="1%"
          flexDirection="column"
          height="450px"
        >
          <div style={{ marginLeft: "auto" }}>
            <S.BalloonContainer>
              <S.TabDesc fontWeight="600" marginBottom="10px">
                ⚡️ 빠른 피드백{" "}
              </S.TabDesc>
              <S.TabDesc>
                직접적인 소통으로 인해 오해 없이 빠르게 피드백을 주고 받을 수
                있어요.
              </S.TabDesc>
              <S.BalloonTail
                right="30px"
                borderLeft="40px"
                borderRight="0px"
              ></S.BalloonTail>
            </S.BalloonContainer>
          </div>
          <div style={{ marginRight: "auto" }}>
            <S.BalloonContainer>
              <S.TabDesc fontWeight="600" marginBottom="10px">
                📎 문서 공유{" "}
              </S.TabDesc>
              <S.TabDesc>
                채팅방에서는 파일이나 문서를 쉽게 공유할 수 있어, <br />
                프로젝트 관련 자료를 실시간으로 전달할 수 있어요.
              </S.TabDesc>
              <S.BalloonTail
                left="30px"
                borderLeft="0px"
                borderRight="40px"
              ></S.BalloonTail>
            </S.BalloonContainer>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <S.BalloonContainer>
              <S.TabDesc fontWeight="600" marginBottom="10px">
                🔔 알림 기능{" "}
              </S.TabDesc>
              <S.TabDesc>
                새로운 메시지가 도착하면 알림을 통해 바로 확인할 수 있어요.
                <br />
                놓치는 정보 없이 프로젝트를 진행하세요!
              </S.TabDesc>
              <S.BalloonTail
                right="30px"
                borderLeft="40px"
                borderRight="0px"
              ></S.BalloonTail>
            </S.BalloonContainer>
          </div>
        </S.MenuContentsInnerBox>
      </S.MenuContainer>
    </div>
  );
};

export default ChatInformation;
