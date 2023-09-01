import { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/useUserStore";
import {
  getPhotoURL,
  updateUserImage,
  uploadUserImage,
} from "../../../api/User";
import useClientsQueries from "../../../hooks/useClientsQueries";
import { queryClient } from "../../../App";
import EditForm from "./EditForm";
import Modal from "../../../components/modal/Modal";
import { useProfileInfoStore } from "../../../zustand/useProfileInfoStore";
import React from "react";
import { S } from "./myProfile.styles";
import { IoMdSettings } from "react-icons/io";

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
      <S.AccountContainer>
        <S.Img className="profileImg" src={user.photoURL} alt="img" />
        {/*  */}
        <S.ColumnBox marginLeft="5%">
          <S.FlexBox>
            <S.Title>{user && user?.name}</S.Title>
            <S.Detail marginLeft="7px">{user.role}</S.Detail>
          </S.FlexBox>

          {user.role === "freelancer" ? (
            <>
              <S.Detail>{user && user?.workField?.workField}</S.Detail>
              <S.Detail>{user && user?.workField?.workSmallField}</S.Detail>
              {/* <S.Detail>data here 진행중</S.Detail> */}
            </>
          ) : (
            <S.Detail>client</S.Detail>
          )}
        </S.ColumnBox>
        {/*  */}
        <S.ColumnBox marginLeft="20%">
          <S.Title>연락망</S.Title>
          <S.Detail>전화번호: {user && user?.contact?.phone}</S.Detail>
          <S.Detail>이메일: {user && user?.contact?.email}</S.Detail>
        </S.ColumnBox>
        {/*  */}
        <S.RightEndBtnBox>
          <S.SettingBtn onClick={() => setIsModalOpen(true)}>
            <IoMdSettings />
          </S.SettingBtn>
        </S.RightEndBtnBox>

        {/* ------------------------------------- */}
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
      </S.AccountContainer>
    </>
  );
};

export default Account;
