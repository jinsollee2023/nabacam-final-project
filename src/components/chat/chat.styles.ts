import { styled } from "styled-components";
import { CommonS } from "../common/button/commonButton";

interface MessageContentProps {
  isMessageUser: boolean;
}

interface BtnProps {
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
  RoomBox: styled.div`
    box-sizing: border-box;
    /* width: 360px; */
    width: 100%;
    height: 153px;
    background: #ffffff;
    border: 1px solid #cacaca;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin: 8px 8px 8px 0;
  `,
  CreateRoomBtn: styled.button`
    /* background-color: var(--main-blue);

    padding: 1px 2px;
    border-radius: 5px; */
  `,
  //=====================================================//
  RightDMRoomContainer: styled.section`
    width: 70.87%;
    height: 86vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

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
    padding: 4px 16px 0;

    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `,
  DMRoomName: styled.span`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: white;
  `,
  DMRoomNameInput: styled.input`
    width: 100%;
    border-radius: 3px;
  `,
  DMRoomInviteModalBtn: styled.button<BtnProps>`
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
  DMSubmitBtn: styled.button`
    width: 53px;
    height: 26px;
    font-size: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.005em;
    color: #ffffff;
    background: var(--main-blue);
    border-radius: 8px;
    padding: 4px 16px;

    z-index: 999;
    position: absolute;
    right: 1.5%;
    top: 25%;
  `,

  //=====================================================//
  MessageWrapper: styled.div`
    background: var(--chat-navy);
    overflow-y: scroll;
    flex: 1;
    padding: 12px;
  `,
  MessageUl: styled.ul``,
  MessageLi: styled.li`
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
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
  ParticipantProfileWrapper: styled.div<MessageContentProps>`
    align-self: ${(props) => (props.isMessageUser ? "flex-start" : "flex-end")};
    text-align: ${(props) => (props.isMessageUser ? "start" : "end")};
    margin-bottom: 5px;
  `,
  ParticipantProfileImg: styled.img<MessageContentProps>`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    align-self: ${(props) => (props.isMessageUser ? "flex-start" : "flex-end")};
  `,
  ParticipantProfileName: styled.span`
    color: #000000;
    font-size: 16px;
    display: block;
  `,
};
