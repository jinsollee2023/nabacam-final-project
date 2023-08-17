import { styled } from "styled-components";
import React from "react";

const Navbar = () => {
  return (
    <S.SidebarWrapper>
      <S.ProfileWrapper>
        <S.ProfileImage src="path_to_your_image.jpg" alt="img" />
        <S.Name>이름</S.Name>
        <S.Role>프리랜서</S.Role>
      </S.ProfileWrapper>
      <S.UpperNavLinks>
        <S.NavLinkItem>
          <S.NavLink href="#">프로젝트 탐색</S.NavLink>
        </S.NavLinkItem>
        <S.NavLinkItem>
          <S.NavLink href="#">프로젝트 관리 도구</S.NavLink>
        </S.NavLinkItem>
      </S.UpperNavLinks>

      <S.Divider />

      <S.LowerNavLinks>
        <S.NavLinkItem>
          <S.NavLink href="#">내 프로필</S.NavLink>
        </S.NavLinkItem>
      </S.LowerNavLinks>
    </S.SidebarWrapper>
  );
};

export default Navbar;

const S = {
  SidebarWrapper: styled.div`
    position: sticky;
    left: 30px;
    display: flex;
    flex-direction: column;
    background-color: #333333f7;
    color: white;
    width: 200px;
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
    margin-right: 10px;
  `,
  Name: styled.div`
    font-size: 24px;
    font-weight: bold;
  `,
  Role: styled.div`
    margin-left: 15px;
    font-size: 13px;
  `,
  UpperNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  Divider: styled.hr`
    margin: 0px 0 20px;
    border: none;
    height: 1px;
    background-color: white;
  `,
  LowerNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  NavLinkItem: styled.li`
    margin-bottom: 20px;
  `,
  NavLink: styled.a`
    text-decoration: none;
    color: white;
  `,
};
