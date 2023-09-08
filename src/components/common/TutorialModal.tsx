import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ApplicantFreelancerList from "../home/manageFreelancersByStatus/ApplicantFreelancerList";
import { useTutorialStore } from "src/store/useTutorialStore";

interface TutorialModalProps {
  tutorialOpen: boolean;
  setTutorialOpen: (tutorialOpen: boolean) => void;
}

const TutorialModal = () => {
  const [tutorialIndex, setTutorialIndex] = useState(1);
  const { tutorialModalOpen, changeTutorialModalOpen, tab, changeTab } =
    useTutorialStore();
  console.log(tutorialIndex);
  const navigate = useNavigate();

  const prevButtonHandler = () => {
    if (tutorialIndex !== 1) {
      setTutorialIndex(tutorialIndex - 1);
    }
  };

  const nextButtonHandler = () => {
    setTutorialIndex(tutorialIndex + 1);
  };

  useEffect(() => {
    if (tutorialIndex === 1) {
      navigate("/home");
      changeTab("프리랜서 마켓");
    }
    if (tutorialIndex === 2) {
      changeTab("지원한 프리랜서");
    }
    if (tutorialIndex === 3) {
      navigate("/project-management");
      changeTab("프로젝트 목록");
    }
  }, [tutorialIndex]);

  // 로그인, 회원가입, 비밀번호 찾기에서는 튜토리얼 진행x
  const location = useLocation();
  const notAllowedPaths = ["/register", "/login", "/resetpassword"];

  if (notAllowedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <S.ModalBackGround>
        <S.TutorialContents>
          {tutorialIndex === 1 && <p>튜토리얼 1</p>}
          <button onClick={prevButtonHandler}>이전</button>
          <button onClick={nextButtonHandler}>다음</button>
        </S.TutorialContents>
      </S.ModalBackGround>
    </>
  );
};

export default TutorialModal;

const S = {
  ModalBackGround: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9998;
  `,
  TutorialContents: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 9999;
  `,
};
