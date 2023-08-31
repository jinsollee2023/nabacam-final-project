import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../zustand/useUserStore";
import React from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  if (window.location.pathname === `/register`) {
    return null;
  }
  if (window.location.pathname === `/login`) {
    return null;
  }
  return (
    <S.SidebarWrapper>
      <S.ProfileWrapper>
        <S.ProfileImage src={user.photoURL} alt="img" />
        <S.Name>{user.name}</S.Name>
        <S.Role>{user.role}</S.Role>
      </S.ProfileWrapper>
      <S.UpperNavLinks>
        <S.NavLinkItem onClick={() => navigate("/")}>
          {user.role === "client" ? "프리랜서 구인" : "프로젝트 탐색"}
        </S.NavLinkItem>

        <S.NavLinkItem onClick={() => navigate("/project-management")}>
          프로젝트 관리 도구
        </S.NavLinkItem>
      </S.UpperNavLinks>

      <S.Divider />

      <S.LowerNavLinks>
        <S.NavLinkItem onClick={() => navigate("/my-page")}>
          {user.role === "client" ? "기업 페이지" : "마이 페이지"}
        </S.NavLinkItem>
        <S.NavLinkItem onClick={() => navigate("/chat")}>
          커뮤니케이션
        </S.NavLinkItem>
      </S.LowerNavLinks>
    </S.SidebarWrapper>
  );
};

export default Navbar;

const S = {
  SidebarWrapper: styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    background-color: #333333f7;
    color: white;
    width: 17vw;
    min-width: 210px;
    padding: 20px;
    z-index: 999;
    height: 100vh;
  `,
  ProfileWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  `,
  ProfileImage: styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 5px;
  `,
  Name: styled.div`
    font-size: 18px;
    font-weight: bold;
  `,
  Role: styled.div`
    margin-left: 7px;
    font-size: 5px;
  `,
  UpperNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  Divider: styled.hr`
    margin: 20px 0;
    border: none;
    height: 1px;
    background-color: white;
  `,
  LowerNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  NavLinkItem: styled.li`
    cursor: pointer;
    padding: 10px 5px;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: gray;
    }
  `,
};
