import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import {
  getPhotoURL,
  updateUserImage,
  uploadUserImage,
} from "../../../api/User";
import useClientsQueries from "../../../hooks/useClientsQueries";
import { queryClient } from "../../../App";
import EditForm from "./EditForm";
import Modal from "../../../components/modal/Modal";
import { useProfileInfoStore } from "../../../store/useProfileInfoStore";
import React from "react";
import { S } from "./myProfile.styles";
import { IoMdSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { resign } from "src/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";
import WorkFieldCategory from "src/components/home/freelancerMarket/workFieldCategory/WorkFieldCategory";

export interface Errors {
  name: null | string;
  workField: null | string;
  workSmallField: null | string;
  phone: null | string;
}

const Account = () => {
  const { userId, user, setUser } = useUserStore();
  const { updateUserMutation } = useClientsQueries({ userId });
  const [isModlaopen, setIsModalOpen] = useState(false);
  const { newProfileInfo } = useProfileInfoStore();
  const initialErrors: Errors = {
    name: null,
    workField: null,
    workSmallField: null,
    phone: null,
  };
  const [errors, setErrors] = useState(initialErrors);
  const [updateSubmitButtonClicked, setUpdateSubmitButtonClicked] =
    useState(false);
  const { validateName, validateSelect, validateInput, validatePhone } =
    useValidation();

  const navigate = useNavigate();

  useEffect(() => {
    queryClient.invalidateQueries([user]);
  }, [user, setUser]);

  useEffect(() => {
    if (
      user.role === "client" &&
      updateSubmitButtonClicked &&
      errors.name === "" &&
      errors.phone === ""
    ) {
      updateProfileInfo();
      setUpdateSubmitButtonClicked(false);
    } else if (
      user.role === "freelancer" &&
      updateSubmitButtonClicked &&
      errors.name === "" &&
      errors.workField === "" &&
      errors.workSmallField === "" &&
      errors.phone === ""
    ) {
      updateProfileInfo();
      toast.success("프로필이 수정되었습니다.");
      setUpdateSubmitButtonClicked(false);
    } else setUpdateSubmitButtonClicked(false);
  }, [errors, updateSubmitButtonClicked]);

  const updateProfileInfo = async () => {
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

  const updateProfileInfoButtonHandler = async () => {
    setUpdateSubmitButtonClicked(true);
    const nameError = validateName(newProfileInfo.name);
    const workFieldError = validateSelect(
      "직무 분야",
      newProfileInfo.workField
    );
    const workSmallFieldError = validateInput(
      "세부 분야",
      newProfileInfo.workSmallField
    );
    const phoneError = validatePhone(newProfileInfo.phone);
    setErrors({
      name: nameError,
      workField: workFieldError,
      workSmallField: workSmallFieldError,
      phone: phoneError,
    });
  };

  const signOutButtonHandler = () => {
    resign(userId, navigate);
  };

  const handleConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    // 여기에서 실제로 할 일을 수행하세요.
    signOutButtonHandler();
    // Toastify를 닫습니다.
    toast.dismiss();

    // 추가로 다른 작업을 수행할 수 있습니다.
  };

  const handleCancel = () => {
    console.log("취소 버튼이 클릭되었습니다.");

    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <div>
        <p>
          {
            "회원 탈퇴시 모든 정보가 삭제되며, 삭제된 정보는 복구가 불가능합니다. \n회원 탈퇴하시겠습니까?"
          }
        </p>
        <button onClick={handleConfirm}>확인</button>
        <button onClick={handleCancel}>취소</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      <S.AccountContainer>
        <S.Img className="profileImg" src={user.photoURL} alt="img" />
        {/* ------------------------------------------------------------ */}
        {user.role === "freelancer" ? (
          // freelancer
          <S.ColumnBox marginLeft="50px">
            <S.FlexBox>
              <S.Title>{user && user?.name}</S.Title>
              <S.Detail marginLeft="7px">{user.role}</S.Detail>
            </S.FlexBox>
            <S.Detail>{user && user?.workField?.workField}</S.Detail>
            <S.Detail>{user && user?.workField?.workSmallField}</S.Detail>
            {/* <S.Detail>data here 진행중</S.Detail> */}
          </S.ColumnBox>
        ) : (
          // client
          <S.ColumnBox marginLeft="50px">
            <S.Title>{user && user?.name}</S.Title>
            <S.Detail marginLeft="7px">{user.role}</S.Detail>
          </S.ColumnBox>
        )}
        {/* ------------------------------------------------------------ */}
        <S.ColumnBox marginLeft="200px">
          <S.Title>연락망</S.Title>
          <S.Detail>전화번호: {user && user?.contact?.phone}</S.Detail>
          <S.Detail>이메일: {user && user?.contact?.email}</S.Detail>
        </S.ColumnBox>
        {/*  */}
        <S.RightEndBtnBox>
          <S.SettingBtn onClick={() => setIsModalOpen(true)}>
            <IoMdSettings />
          </S.SettingBtn>
          <S.SettingBtn onClick={showConfirmation}>
            <FaSignOutAlt />
            <S.SettingSpan>탈퇴하기</S.SettingSpan>
          </S.SettingBtn>
        </S.RightEndBtnBox>

        {isModlaopen ? (
          <Modal
            setIsModalOpen={setIsModalOpen}
            buttons={
              <S.Btn width="100%" onClick={updateProfileInfoButtonHandler}>
                수정하기
              </S.Btn>
            }
          >
            <EditForm user={user} errors={errors} setErrors={setErrors} />
          </Modal>
        ) : null}
      </S.AccountContainer>
    </>
  );
};

export default Account;
