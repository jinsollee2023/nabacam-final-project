import React from "react";
import { IUser } from "../../../Types";
import { S } from "./applicantResumeModalStyle";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../api/Portfolio";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

interface ApplicantResumeModalProps {
  user: IUser;
  onClose: () => void;
}

const ApplicantResumeModal = ({ user, onClose }: ApplicantResumeModalProps) => {
  const {
    data: portfolio,
    isLoading: portfolioIsLoading,
    isError: portfolioIsError,
  } = useQuery(["portfolio"], (id) => getPortfolio(user.userId));

  // console.log(portfolio);

  // 바깥 영역 클릭 시 모달 닫기
  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <S.ModalBox onClick={handleModalClick}>
      <S.ModalContainer>
        <S.CloseBtn onClick={onClose}>X</S.CloseBtn>
        <div>
          <S.Title>{user.title} 프로젝트에 지원</S.Title>
          <S.UserInfoBox>
            <S.ProfileImgBox>
              <S.ProfileImg alt="profileImg" src={user.photoURL}></S.ProfileImg>
            </S.ProfileImgBox>
            <S.UserBox>
              <p style={{ display: "flex" }}>{user.name}</p>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  color: "gray",
                  fontSize: "13px",
                }}
              >
                <S.UserWorkField>{user.workField?.workField}</S.UserWorkField>
                <p>{user.workExp}년차</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                <p>
                  <BsTelephoneFill color="black" /> {user.contact.phone}
                </p>
                <p>
                  <MdEmail color="black" /> {user.contact.email}
                </p>
              </div>
            </S.UserBox>
          </S.UserInfoBox>
          <div style={{ color: "gray", fontSize: "14px" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "100%" }}>
                <p>목표 기간</p>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    width: "90%",
                    height: "28px",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
              <div style={{ width: "100%" }}>
                <p>급여</p>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    width: "90%",
                    height: "28px",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </div>
            <p style={{ marginTop: "10px" }}>수정 이유</p>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                width: "100%",
                height: "40px",
                borderRadius: "10px",
              }}
            ></div>
          </div>
          <div>
            <S.ResumeContent>프로필</S.ResumeContent>
            <S.ProfileBox></S.ProfileBox>
            <S.ResumeContent>경력 사항</S.ResumeContent>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  width: "50%",
                  height: "100px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  width: "50%",
                  height: "100px",
                }}
              ></div>
            </div>
            <S.ResumeContent>포트폴리오</S.ResumeContent>
            <div style={{ display: "flex", gap: "10px" }}>
              {portfolio ? (
                portfolio.map((data) => (
                  <div>
                    <img
                      alt="portfolioImage"
                      style={{
                        borderRadius: "15px",
                        width: "100px",
                        height: "100px",
                      }}
                      src={data.thumbNailURL}
                    ></img>
                    {/* <a href={data.pdfFileURL} download="portfolio.pdf">
                        test
                      </a> */}
                    <p style={{ marginTop: "5px", fontSize: "14px" }}>
                      {data.title}
                    </p>
                  </div>
                ))
              ) : portfolioIsLoading ? (
                <div>Loading Portfolio...</div>
              ) : portfolioIsError ? (
                <div>포트폴리오 데이터를 불러오지 못했습니다.</div>
              ) : null}
            </div>
            <S.ResumeContent>기업 한줄 피드백 및 평점</S.ResumeContent>
          </div>
          <S.BtnBox>
            <S.Btn>제안하기</S.Btn>
            <S.Btn>보류하기</S.Btn>
          </S.BtnBox>
        </div>
      </S.ModalContainer>
    </S.ModalBox>
  );
};

export default ApplicantResumeModal;
