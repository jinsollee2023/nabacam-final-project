import { styled } from "styled-components";
import React, { useState } from "react";
import { useUserStore } from "../../../../../zustand/useUserStore";
import useResumeProfileIntroQueries from "../../../../../hooks/useResumeProfileIntroQueries";
import { MdAddCircle } from "react-icons/md";
import Modal from "../../../../../components/modal/Modal";
import AddResumeProfileIntroModal from "./AddResumeProfileIntroModal";
import { useResumeProfileIntroStore } from "../../../../../zustand/useResumeProfileIntroStore";
import { S } from "../Resume.styles";
import { IoMdSettings } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumeProfileIntroComp = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const {
    addProfileIntroMutation,
    resumeProfileIntroObject,
    updateProfileIntroMutation,
  } = useResumeProfileIntroQueries(userId);
  const intro = resumeProfileIntroObject?.resumeProfileIntro;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { newProfileIntroInput } = useResumeProfileIntroStore();

  const addProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!newProfileIntroInput) {
      toast.error("프로필 소개를 입력해주세요.");
      return;
    }

    try {
      await addProfileIntroMutation.mutateAsync({
        newProfileIntroInput,
        userId,
      });
      toast.success("프로필 소개가 성공적으로 등록되었습니다.");
    } catch (error) {
      toast.error("오류가 발생했습니다.");
    }

    setIsAddModalOpen(false);
  };

  const updateProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    updateProfileIntroMutation.mutate({
      newProfileIntroInput,
      userId,
    });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <S.ProfileContainer>
        <S.JustifyBox>
          <S.ProfileTitle>프로필</S.ProfileTitle>
          {intro?.length > 0 ? (
            <S.ProfileBtn onClick={() => setIsAddModalOpen(true)}>
              <IoMdSettings style={{ marginRight: "2px" }} />
              수정하기
            </S.ProfileBtn>
          ) : (
            <S.ProfileBtn
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <MdAddCircle size="10" />
              추가
            </S.ProfileBtn>
          )}
        </S.JustifyBox>

        <S.ProfileInputBox>
          <div>{intro?.length > 0 ? intro : "등록된 소개가 없습니다."}</div>
        </S.ProfileInputBox>
      </S.ProfileContainer>

      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {intro?.length > 0 ? (
                <S.Btn width="100%" onClick={updateProfileIntroHandler}>
                  수정하기
                </S.Btn>
              ) : (
                <S.Btn width="100%" onClick={addProfileIntroHandler}>
                  등록하기
                </S.Btn>
              )}
            </>
          }
        >
          <AddResumeProfileIntroModal profileIntro={intro} />
        </Modal>
      )}
    </>
  );
};

export default ResumeProfileIntroComp;
