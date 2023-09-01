import { styled } from "styled-components";

export const S = {
  AddMemberBtn: styled.button`
    cursor: pointer;
    width: 120px;
    height: 35px;
    float: right;
    border-radius: 4px;
    border: 1.5px solid #0086d0;
    background-color: transparent;
  `,
  MemberListContainer: styled.div`
    width: 100%;
    height: 61vh;
    overflow: auto;
  `,
  MemberList: styled.div`
    border-radius: 4px;
    border: 1.5px solid #d6d6d6;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  `,
  MemberInfo: styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  MemberName: styled.span`
    font-size: 18px;
    margin-left: 20px;
  `,
  MemberTeam: styled.span`
    color: #595959;
    font-size: 16px;
  `,
  MemberContactBox: styled.div`
    gap: 5px;
    display: flex;
    flex-direction: column;
  `,
  ContactLabel: styled.span`
    width: 60px;
  `,
  ContactBox: styled.div`
    gap: 30px;
    color: #595959;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  `,
  MemberContact: styled.span`
    width: 10rem;
    margin-right: 15px;
    text-align: right;
  `,
  BtnBox: styled.div`
    gap: 10px;
    float: right;
    display: flex;
    flex-direction: row;
  `,
  EditAndDelBtn: styled.button`
    position: relative;
    left: 11rem;
    border: none;
    color: #595959;
    cursor: pointer;
    margin: 5px 0;
    text-decoration: underline;
    background-color: transparent;
  `,
  ModalInnerAddBtn: styled.button`
    color: white;
    cursor: pointer;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #0086d0;
    font-size: 16px;
  `,
};
