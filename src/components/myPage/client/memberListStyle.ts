import { styled } from "styled-components";

export const S = {
  AddMemberButton: styled.button`
    cursor: pointer;
    height: 47px;
    min-width: 120px;
    width: 15%;
    border-radius: 5px;
    border: solid 1px var(--main-blue);
    background-color: transparent;
    margin-left: 15px;
  `,
  MemberListContainer: styled.div`
    width: 100%;
    height: 58vh;
    overflow: auto;
    margin-top: -15px;
  `,
  MemberList: styled.div`
    height: 80px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1.5px solid #d6d6d6;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  MemberInfo: styled.div`
    min-width: 150px;
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
    width: 9%;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: end;
    padding: 1px;
  `,
  ContactBoxWrapper: styled.div`
    width: 100%;
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  ContactBox: styled.div`
    width: 100%;
    color: #595959;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  MemberContact: styled.span`
    text-align: right;
  `,
  ButtonBox: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  `,
  EditAndDeleteButton: styled.button`
    position: relative;
    left: 11rem;
    border: none;
    color: #595959;
    cursor: pointer;
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
  SearchItemBarAndAddMemberButtonWrapper: styled.div`
    display: flex;
    width: 100%;
    min-width: 400px;
    margin-bottom: 30px;
  `,
};
