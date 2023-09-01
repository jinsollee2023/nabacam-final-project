import React from "react";
import Navbar from "./navbar/Navbar";
import { styled } from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <Navbar />
      <S.LayoutChildren>{children}</S.LayoutChildren>
    </S.LayoutContainer>
  );
};

export default Layout;

const S = {
  LayoutContainer: styled.div`
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
  `,

  LayoutChildren: styled.div`
    width: 73vw;
  `,
};
