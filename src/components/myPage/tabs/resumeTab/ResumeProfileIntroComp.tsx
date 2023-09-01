import { styled } from "styled-components";
import React, { useState } from "react";
import { useUserStore } from "../../../../zustand/useUserStore";
import useResumeProfileIntroQueries from "../../../../hooks/useResumeProfileIntroQueries";
import { MdAddCircle } from "react-icons/md";
import Modal from "../../../../components/modal/Modal";
import AddResumeProfileIntroModal from "./AddResumeProfileIntroModal";
import { useResumeProfileIntroStore } from "../../../../zustand/useResumeProfileIntroStore";
import { S } from "./Resume.styles";
import { IoMdSettings } from "react-icons/io";

const ResumeProfileIntroComp = () => {
  const { user } = useUserStore();
  const userId = user.userId;
  const {
    addProfileIntroMutation,
    resumeProfileIntroObject,
    updateProfileIntroMutation,
  } = useResumeProfileIntroQueries(userId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { newProfileIntroInput } = useResumeProfileIntroStore();

  // add
  const addProfileIntroHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    addProfileIntroMutation.mutate({
      newProfileIntroInput,
      userId,
    });

    setIsAddModalOpen(false);
  };

  // update
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
      {/* FIX */}
      <S.ProfileContainer>
        <S.JustifyBox>
          <S.ProfileTitle>프로필</S.ProfileTitle>
          {resumeProfileIntroObject &&
          resumeProfileIntroObject !== null &&
          resumeProfileIntroObject.resumeProfileIntro !== null &&
          resumeProfileIntroObject.resumeProfileIntro.length > 0 ? (
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
          <div>
            {resumeProfileIntroObject
              ? resumeProfileIntroObject.resumeProfileIntro ||
                "등록된 소개가 없습니다."
              : "등록된 소개가 없습니다."}
          </div>
        </S.ProfileInputBox>
      </S.ProfileContainer>

      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              {newProfileIntroInput.length > 0 ? (
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
          <AddResumeProfileIntroModal
            profileIntro={
              resumeProfileIntroObject &&
              resumeProfileIntroObject.resumeProfileIntro
            }
          />
        </Modal>
      )}
    </>
  );
};

export default ResumeProfileIntroComp;
