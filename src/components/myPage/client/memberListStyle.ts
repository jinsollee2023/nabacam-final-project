import { styled } from "styled-components";

export const S = {
  AddMemberButton: styled.button`
    cursor: pointer;
    width: 120px;
    height: 30px;
    float: right;
    border-radius: 6px;
    border: 1.5px solid #0086d0;
    background-color: transparent;
    margin-bottom: 10px;
  `,
  MemberListContainer: styled.div`
    width: 100%;
    height: 58vh;
    overflow: auto;
  `,
  MemberList: styled.div`
    height: 70px;
    padding: 10px;
    border-radius: 4px;
    border: 1.5px solid #d6d6d6;
    margin-bottom: 10px;
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
    font-size: 16px;
    margin-left: 10px;
  `,
  MemberTeam: styled.span`
    color: #595959;
    font-size: 14px;
  `,
  MemberContactBox: styled.div`
    gap: 2px;
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
  `,
  MemberContact: styled.span`
    width: 10rem;
    margin-right: 15px;
    text-align: right;
  `,
  ButtonBox: styled.div`
    gap: 10px;
    float: right;
    display: flex;
    flex-direction: row;
  `,
  EditAndDeleteButton: styled.button`
    position: relative;
    left: 11rem;
    border: none;
    color: #595959;
    cursor: pointer;
    text-decoration: underline;
    background-color: transparent;
  `,
  ModalInnerAddButton: styled.button`
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
