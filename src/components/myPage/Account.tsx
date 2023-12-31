import { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { getPhotoURL, updateUserImage, uploadUserImage } from "../../api/User";
import useClientsQueries from "../../hooks/queries/useClientsQueries";
import { queryClient } from "../../App";
import AccountEditForm from "./AccountEditForm";
import Modal from "../modal/Modal";
import { useProfileInfoStore } from "../../store/useProfileInfoStore";
import { S } from "./myProfile/myProfile.styles";
import { IoMdSettings } from "react-icons/io";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { resign } from "src/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";
import { CommonS } from "src/components/common/button/commonButton";

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

  const [newPhotoURL, setNewPhotoURL] = useState(user.photoURL);
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

  useEffect(() => {
    updateProfilePhotoURL();
  }, [newProfileInfo.photo]);

  const updateProfilePhotoURL = async () => {
    const file = newProfileInfo.photo;
    if (newProfileInfo.photo instanceof File) {
      const filePath = user.photoURL.includes("defaultProfileImage")
        ? await uploadUserImage(userId, file as File)
        : await updateUserImage(userId, file as File);
      const photoURL = await getPhotoURL(filePath);
      setNewPhotoURL(`${photoURL}?updated=${new Date().getTime()}`);
    } else {
      setNewPhotoURL(newProfileInfo.photo);
    }
  };

  const updateProfileInfo = async () => {
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
    if (user.photoURL !== newPhotoURL) {
      updateUserMutation.mutate({
        updatedData: {
          ...updatedDataExceptPhotoURL,
          photoURL: newPhotoURL,
        },
        setUser,
        userId,
      });
    } else {
      updateUserMutation.mutate({
        updatedData: {
          ...updatedDataExceptPhotoURL,
          photoURL: user.photoURL,
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
    signOutButtonHandler();
    toast.dismiss();
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  const showConfirmation = () => {
    toast.info(
      <CommonS.toastinfo>
        <CommonS.toastintoText>
          {
            "회원 탈퇴시 모든 정보가 삭제되며, 삭제된 정보는 복구가 불가능합니다. \n회원 탈퇴하시겠습니까?"
          }
        </CommonS.toastintoText>
        <CommonS.toastOkButton onClick={handleConfirm}>
          확인
        </CommonS.toastOkButton>
        <CommonS.toastNoButton onClick={handleCancel}>
          취소
        </CommonS.toastNoButton>
      </CommonS.toastinfo>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const availableClose =
    user.name === newProfileInfo.name &&
    user.workField?.workField === newProfileInfo.workField &&
    user.workField.workSmallField === newProfileInfo.workSmallField &&
    user.contact.phone === newProfileInfo.phone &&
    user.photoURL === newPhotoURL;

  return (
    <>
      <S.AccountContainer>
        <S.ProfileImageBox>
          <img src={user.photoURL} alt="profileImg" />
        </S.ProfileImageBox>
        {user.role === "freelancer" ? (
          // freelancer
          <S.ColumnBox marginLeft="50px">
            <S.FlexBox>
              <S.Title>{user && user?.name}</S.Title>
              <S.Detail marginLeft="7px">{user.role}</S.Detail>
            </S.FlexBox>
            <S.Detail>{user && user?.workField?.workField}</S.Detail>
            <S.Detail>{user && user?.workField?.workSmallField}</S.Detail>
          </S.ColumnBox>
        ) : (
          // client
          <S.ColumnBox marginLeft="50px">
            <S.Title>{user && user?.name}</S.Title>
            <S.Detail>{user.role}</S.Detail>
          </S.ColumnBox>
        )}
        <S.ColumnBox marginLeft="7%">
          <S.Title>연락망</S.Title>
          <S.Detail>
            <FiPhoneCall size={16} style={{ marginRight: "10px" }} />
            {user && user?.contact?.phone}
          </S.Detail>
          <S.Detail>
            <FiMail size={16} style={{ marginRight: "10px" }} />
            {user && user?.contact?.email}
          </S.Detail>
        </S.ColumnBox>
        <S.RightEndButtonBox>
          <S.SettingButton onClick={() => setIsModalOpen(true)}>
            <IoMdSettings size={25} color="dimgray" />
          </S.SettingButton>
        </S.RightEndButtonBox>

        {isModlaopen ? (
          <Modal
            setIsModalOpen={setIsModalOpen}
            availableClose={availableClose}
            buttons={
              <>
                <S.UnMemberButton width="50%" onClick={showConfirmation}>
                  탈퇴하기
                </S.UnMemberButton>
                <S.Button width="50%" onClick={updateProfileInfoButtonHandler}>
                  수정하기
                </S.Button>
              </>
            }
          >
            <AccountEditForm
              user={user}
              errors={errors}
              setErrors={setErrors}
            />
          </Modal>
        ) : null}
      </S.AccountContainer>
    </>
  );
};

export default Account;
