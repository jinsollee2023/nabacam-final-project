import { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { getPhotoURL, updateUserImage, uploadUserImage } from "src/api/User";
import useClientsQueries from "src/hooks/useClientsQueries";
import { queryClient } from "src/App";
import EditForm from "./EditForm";
import { styled } from "styled-components";
import Modal from "src/components/modal/Modal";
import { useProfileInfoStore } from "src/zustand/useProfileInfoStore";

const Account = () => {
  const { userId, user, setUser } = useUserStore();
  const { updateUserMutation } = useClientsQueries({ userId });
  const [isModlaopen, setIsModalOpen] = useState(false);
  const { newProfileInfo } = useProfileInfoStore();

  useEffect(() => {
    queryClient.invalidateQueries([user]);
  }, [user, setUser]);

  const updateProfileInfoButtonHandler = async (e: any) => {
    const file = newProfileInfo.photo;

    const updatedDataExceptPhotoURL = {
      name: newProfileInfo.name,
      workField: {
        workField: newProfileInfo.workField,
        workSmallField: newProfileInfo.workSmallField,
      },
      contact: {
        email: user.contact.email,
        phone: newProfileInfo.phone,
      },
    };

    if (newProfileInfo.photo instanceof File) {
      const filePath = await (user.photoURL.includes("defaultProfileImage")
        ? uploadUserImage(userId, file as File)
        : updateUserImage(userId, file as File));
      const photoURL = await getPhotoURL(filePath);

      updateUserMutation.mutate({
        updatedData: {
          ...updatedDataExceptPhotoURL,
          photoURL: `${photoURL}?updated=${new Date().getTime()}`,
        },
        setUser,
        userId,
      });
    } else {
      updateUserMutation.mutate({
        updatedData: {
          ...updatedDataExceptPhotoURL,
          photoURL: newProfileInfo.photo,
        },
        setUser,
        userId,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        style={{
          display: "flex",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#f8f5ed",
        }}
      >
        <img
          className="profileImg"
          src={user.photoURL}
          alt="img"
          width="60px"
          height="60px"
          style={{ marginLeft: "10px" }}
        />
        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>{user && user?.name}님</h1>
          {user.role === "freelancer" ? (
            <>
              <S.Info>직무분야: {user && user?.workField?.workField}</S.Info>
              <S.Info>
                세부분야: {user && user?.workField?.workSmallField}
              </S.Info>
            </>
          ) : (
            <S.Info>client</S.Info>
          )}
        </div>
        <div
          style={{
            marginLeft: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>연락망</h1>
          <S.Info>전화번호: {user && user?.contact?.phone}</S.Info>
          <S.Info>이메일: {user && user?.contact?.email}</S.Info>
        </div>
        <S.Btn onClick={() => setIsModalOpen(true)}>프로필 수정하기</S.Btn>
        {isModlaopen ? (
          <Modal
            setIsModalOpen={setIsModalOpen}
            buttons={
              <button onClick={updateProfileInfoButtonHandler}>수정하기</button>
            }
          >
            <EditForm user={user} />
          </Modal>
        ) : null}
      </section>
    </>
  );
};

export default Account;

const S = {
  Info: styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.583);
    margin-top: 5px;
  `,
  Btn: styled.button`
    background-color: #1fc17d;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #168c68;
    }
    margin-left: 60px;
  `,
};
