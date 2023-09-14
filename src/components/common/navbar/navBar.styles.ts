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
    position: relative;
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
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
  `,
  ProfileImageWrapper: styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 150px;
    height: 150px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  ProfileContentsWrapper: styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Name: styled.div`
    font-size: 18px;
    font-weight: bold;
    color: var(--middle-gray);
  `,
  Role: styled.div`
    margin: 10px 0;
    font-size: 12px;
    color: var(--main-blue);
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
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    color: dimgray;
  `,
};
