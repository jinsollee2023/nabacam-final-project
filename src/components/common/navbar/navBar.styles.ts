import styled from "styled-components";

export const S = {
  SidebarWrapper: styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    background-color: #ebf4fa;
    width: 17vw;
    max-width: 280px;
    min-width: 210px;

    height: 100vh;
  `,
  LogoWrapper: styled.div`
    width: 100%;
    padding: 40px 20px 20px 20px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 90%;
      cursor: pointer;
    }
  `,
  ProfileWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70px;
    padding: 20px;
  `,
  ProfileImage: styled.img`
    width: 45px;
    height: 45px;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
  `,
  Name: styled.div`
    font-size: 18px;
    font-weight: bold;
  `,
  Role: styled.div`
    margin-top: 7px;
    font-size: 12px;
  `,
  UpperNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  Divider: styled.hr`
    margin: 20px 0;
    border: none;
    height: 1px;
    background-color: var(--lighter-gray);
  `,
  LowerNavLinks: styled.ul`
    list-style: none;
    padding: 0;
  `,
  NavLinkItem: styled.li`
    cursor: pointer;
    padding: 15px 20px;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: var(--hover-blue);
    }
  `,
  LogOutButton: styled.button`
    background-color: transparent;
    border: none;
  `,
};
