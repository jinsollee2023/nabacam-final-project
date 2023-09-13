import { styled } from "styled-components";
import { CommonS } from "../common/button/commonButton";

interface MessageContentProps {
  isMessageUser: boolean;
}

interface RoomBoxProps {
  isSelected: boolean;
}

interface ButtonProps {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  height?: string;
  padding?: string;
}

export const S = {
  Container: styled.section`
    width: 100%;
    display: flex;
    // scroll
    height: 86vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  LeftRoomListContainer: styled.div`
    display: flex;
    flex-direction: column;

    width: 30%;

    padding: 0 0 37px 20px;

    height: 86vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    border-right: solid rgba(0, 0, 0, 0.25);
    padding: 20px;
  `,
  RoomListWrapper: styled.div``,
  RoomBox: styled.div<RoomBoxProps>`
    box-sizing: border-box;
    /* width: 360px; */
    width: 100%;
    height: 153px;
    background: #ffffff;
    border: 1px solid #cacaca;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin: 8px 8px 8px 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    background-color: ${(props) =>
      props.isSelected ? "var(--main-blue)" : "transparent"};
  `,
  RoomListImg: styled.img`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-left: 18px;
    margin-right: 12px;
  `,
  RoomListTextColumnWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  RoomListTextFlexWrapper: styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 14px;
  `,
  RoomListSenderName: styled.p`
    font-size: 16px;
    font-weight: bold;
  `,
  RoomListSenderWorkField: styled.p`
    font-size: 12px;
    color: #6f6f6f;
  `,
  RoomListSenderLatestTextContent: styled.p`
    font-size: 14px;
  `,
  CreateRoomButton: styled.button`
    /* background-color: var(--main-blue);

    padding: 1px 2px;
    border-radius: 5px; */
  `,
  //=====================================================//
  RightDMRoomContainer: styled.section`
    width: 70.87%;
    height: 86vh;
    /* MessageWrapper와 겹쳐서 뺌 */
    display: flex;
    flex: column;
    align-items: center;
    justify-content: center;
  `,
  DMWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: stretch;
    padding: 24px 24px 0 24px;
  `,
  DMHeader: styled.div`
    background-color: var(--chat-navy);
    display: flex;
    align-items: center;
    padding: 10px 16px;

    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `,
  DMHeaderBackButton: styled.span`
    margin-right: 3px;
    color: white;
    cursor: pointer;
    font-size: 18px;
  `,
  DMRoomName: styled.span`
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: white;
    margin-left: 5px;
  `,
  DMHamburgerMenuButton: styled.span`
    font-size: 20px;
    color: white;
    cursor: pointer;
  `,
  DMRoomNameInput: styled.input`
    width: 100%;
    border-radius: 3px;
  `,
  DMRoomInviteModalButton: styled.button<ButtonProps>`
    background-color: var(--main-blue);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--hover-blue);
    }
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding || "7px"};
  `,

  DMMain: styled.div`
    width: 100%;

    background: var(--chat-navy);
    border-radius: 8px;
  `,
  DMForm: styled.form`
    width: 100%;
    height: 10%;

    border: none;
    background: var(--chat-navy);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

    position: relative;
  `,
  DMInput: styled.input`
    width: 100%;
    height: 100%;
    border: none;
    background: var(--chat-gray);
    border-radius: 8px;
  `,
  DMSubmitButton: styled.button`
    width: 7%;
    height: 45%;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 18px;
    letter-spacing: -0.005em;
    color: #ffffff;
    background: var(--main-blue);
    border-radius: 8px;
    padding: 4px 16px;
    border: none;

    z-index: 999;
    position: absolute;
    right: 1.5%;
    top: 25%;
  `,
  //=====================================================//
  MessageWrapper: styled.div`
    background: var(--chat-navy);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--chat-navy);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #051930;
    }

    flex: 1;
    padding: 12px;
  `,
  MessageUl: styled.ul``,
  MessageLi: styled.li<MessageContentProps>`
    display: flex;
    /* flex-direction: column; */
    padding-bottom: 8px;

    align-self: ${(props) => (props.isMessageUser ? "flex-start" : "flex-end")};
    text-align: ${(props) => (props.isMessageUser ? "start" : "end")};
    //
    flex-direction: ${(props) => (props.isMessageUser ? "row" : "row-reverse")};
  `,
  MessageContent: styled.div<MessageContentProps>`
    border-radius: 6px;
    padding: 4px 8px;

    background-color: ${(props) =>
      props.isMessageUser ? "#FFFFFF" : "var(--main-blue)"};
    align-self: ${(props) => (props.isMessageUser ? "flex-start" : "flex-end")};
    text-align: ${(props) => (props.isMessageUser ? "start" : "end")};

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.005em;
    color: #000000;
  `,
  ParticipantContentWrapper: styled.div<MessageContentProps>`
    align-self: ${(props) => (props.isMessageUser ? "flex-start" : "flex-end")};
    text-align: ${(props) => (props.isMessageUser ? "start" : "end")};
    margin: 5px;
  `,
  ParticipantProfileImg: styled.img<MessageContentProps>`
    border-radius: 8px;
    width: 30px;
    height: 30px;
    align-self: ${(props) => (props.isMessageUser ? "flex-start" : "flex-end")};
  `,
  ParticipantProfileName: styled.span`
    color: #000000;
    font-size: 16px;
    display: block;
    margin-bottom: 3px;
  `,
};
