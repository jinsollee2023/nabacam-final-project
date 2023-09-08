import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { styled } from "styled-components";
import TutorialModal from "./TutorialModal";
import { useTutorialStore } from "src/store/useTutorialStore";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { tutorialModalOpen } = useTutorialStore();
  return (
    <S.LayoutContainer>
      <Navbar />
      {/* {tutorialModalOpen && <TutorialModal />} */}
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
