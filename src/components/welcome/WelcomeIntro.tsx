import React from "react";
import { S } from "./welcome.styles";
import { useNavigate } from "react-router-dom";

const WelcomeIntro = () => {
  const navigate = useNavigate();
  return (
    <>
      <S.SignButtonContainer>
        <S.SignButton
          backGroundColor="white"
          color="black"
          border="1px #0086D0 solid"
          onClick={() => navigate("/login")}
        >
          로그인
        </S.SignButton>
        <S.SignButton
          backGroundColor="#0086D0"
          color="white"
          border="none"
          onClick={() => navigate("/register")}
        >
          회원가입
        </S.SignButton>
      </S.SignButtonContainer>
      <S.IntroContainer>
        <S.TitleContainer>
          <S.MainTitleBox>
            <S.MainTitle>당신의 파트너와 함께 파도를 헤치다</S.MainTitle>
          </S.MainTitleBox>
          <S.SubTitleBox>
            <S.MainDesc>
              더 나은 비즈니스 파트너를 찾거나, 탁월한 프로젝트를 시작하세요.
              <br />
              Work Wave에서는 클라이언트와 프리랜서가 원활한 커뮤니케이션을 통해
              서로의 목표를 달성하게 도와줘요. <br />
              지금 바로 파도를 헤쳐나가는 여정을 시작하세요.
            </S.MainDesc>
          </S.SubTitleBox>
        </S.TitleContainer>
      </S.IntroContainer>
    </>
  );
};

export default WelcomeIntro;
