import React from "react";
import { styled } from "styled-components";
import { User } from "../../Types";

interface ApplicantResumeModalProps {
  user: User;
  onClose: () => void;
}

const ApplicantResumeModal: React.FC<ApplicantResumeModalProps> = ({ user, onClose }) => {
  return (
    <StModalBox onClick={onClose}>
      <StModalContents>
        <button style={{ float: "right" }} onClick={onClose}>
          X
        </button>
        <div>
          <p>
            {user.name}님이
            <br /> 이번 'OOO 프로젝트'에 지원하셨습니다.
          </p>
          <div style={{ display: "flex", gap: "10px", textAlign: "center", alignItems: "center" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p>{user.name}</p>
              <p style={{ fontSize: "14px", color: "gray" }}>{user.workField}</p>
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
            <p style={{ margin: "10px 0" }}>포트폴리오</p>
          </div>
          <div>
            <button style={{ marginRight: "10px" }}>협상하기</button>
            <button style={{ marginRight: "10px" }}>채용하기</button>
            <button>보류</button>
          </div>
        </div>
      </StModalContents>
    </StModalBox>
  );
};

export default ApplicantResumeModal;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 30%;
  height: 30%;
  overflow: auto;
  border-radius: 12px;
`;
