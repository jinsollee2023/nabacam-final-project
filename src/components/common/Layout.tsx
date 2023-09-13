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
      {window.location.pathname === "/" ? (
        <S.WelcomeLayout>{children}</S.WelcomeLayout>
      ) : (
        <S.ChildrenLayout>{children}</S.ChildrenLayout>
      )}
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

  ChildrenLayout: styled.div`
    width: 73vw;
  `,

  WelcomeLayout: styled.div`
    width: 80vw;
    margin: 0 auto;
  `,
};
