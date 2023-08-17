import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApplicantFreelancers } from "../../api/ApplicantFreelancerLists";
import { User } from "../../Types";
import ApplicantResumeModal from "./ApplicantResumeModal";

const ApplicantFreelancerLists: React.FC = () => {
  const [showData, setShowData] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>(["users"], getApplicantFreelancers, {
    refetchOnWindowFocus: false,
  });

  const handleShowData = () => {
    setShowData(true);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <button
        style={{ cursor: "pointer", background: "transparent", border: "none" }}
        onClick={handleShowData}
      >
        지원한 프리랜서 보기
      </button>
      {showData && (
        <div>
          {users ? (
            users.map((user: User) => (
              <div
                style={{
                  border: "1px solid gray",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
                key={user.userId}
              >
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt="이미지 준비중"
                    src={user.photoURL}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  ></img>
                </div>
                {/* <div>{user.role}</div> */}
                <div>{user.name}</div>
                <div>{user.projectId}</div>
                <div>{user.workField}</div>
                <div>{user.workExp}</div>
                <div>Email: {user.contact.email}</div>
                <div>Phone: {user.contact.phone}</div>
                <div>
                  <button onClick={() => handleSelectUser(user)}>확인하기</button>
                </div>
              </div>
            ))
          ) : isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>데이터를 불러오지 못했습니다.</div>
          ) : null}
          {selectedUser && <ApplicantResumeModal user={selectedUser} onClose={handleCloseModal} />}
        </div>
      )}
    </>
  );
};

export default ApplicantFreelancerLists;
