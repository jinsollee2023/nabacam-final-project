import React from "react";
import { styled } from "styled-components";
import { User } from "../../Types";

interface ApplicantResumeModalProps {
  user: User;
  onClose: () => void;
}

const ApplicantResumeModal = ({ user, onClose }: ApplicantResumeModalProps) => {
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
      <S.ModalContents>
        <button style={{ float: "right" }} onClick={onClose}>
          X
        </button>
        <div>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {user.name}님이
            <br /> 이번 'OOO 프로젝트'에 지원하셨습니다.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "30%",
                overflow: "hidden",
              }}
            >
              <img
                alt="이미지 준비중"
                src={user.photoURL}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p>{user.name}</p>
              <p style={{ fontSize: "14px", color: "gray" }}>
                {user.workField}
              </p>
            </div>
          </div>
          <div>
            <p style={{ margin: "10px 0" }}>프로필</p>
            <div
              style={{
                border: "1px solid gray",
                borderRadius: "10px",
                width: "100%",
                height: "50px",
              }}
            ></div>
            <p style={{ margin: "10px 0" }}>경력 사항</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "15px",
                  width: "210px",
                  height: "100px",
                }}
              ></div>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "15px",
                  width: "210px",
                  height: "100px",
                }}
              ></div>
            </div>
            <p style={{ margin: "10px 0" }}>포트폴리오</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "15px",
                    width: "100px",
                    height: "100px",
                  }}
                ></div>
                <p style={{ marginTop: "5px", fontSize: "14px" }}>
                  UXUI 리디자인
                </p>
              </div>
              <div>
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "15px",
                    width: "100px",
                    height: "100px",
                  }}
                ></div>
                <p style={{ marginTop: "5px", fontSize: "14px" }}>
                  개발 프로젝트
                </p>
              </div>
              <div>
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "15px",
                    width: "100px",
                    height: "100px",
                  }}
                ></div>
                <p style={{ marginTop: "5px", fontSize: "14px" }}>
                  앱 런칭 디자인
                </p>
              </div>
              <div>
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "15px",
                    width: "100px",
                    height: "100px",
                  }}
                ></div>
                <p style={{ marginTop: "5px", fontSize: "14px" }}>
                  실제 서비스 배포
                </p>
              </div>
            </div>
          </div>
          <div>
            <button style={{ marginRight: "10px" }}>협상하기</button>
            <button style={{ marginRight: "10px" }}>채용하기</button>
            <button>보류</button>
          </div>
        </div>
      </S.ModalContents>
    </S.ModalBox>
  );
};

export default ApplicantResumeModal;

const S = {
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ModalContents: styled.div`
    background-color: #fff;
    padding: 20px;
    width: 25%;
    height: 50%;
    border-radius: 12px;
    overflow: auto;
    // 스크롤바 숨기기
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  `,
};
